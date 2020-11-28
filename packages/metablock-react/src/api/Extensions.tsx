import loadable from "@loadable/component";
import {
  Extension,
  ExtensionInput,
  ExtensionOutput,
  getLogger,
  SpaceExtension,
} from "@metablock/core";
import React from "react";

const logger = getLogger({ name: "extensions.load" });

type ExtensionType = Extension | SpaceExtension;

class ExtensionModuleBase {
  extension: ExtensionType;

  constructor(extension: ExtensionType) {
    this.extension = extension;
  }
}

class ExtensionFailure extends ExtensionModuleBase {
  message: string;

  constructor(extension: ExtensionType, message: string) {
    super(extension);
    this.message = message;
  }

  get error() {
    return true;
  }
}

class ExtensionModule extends ExtensionModuleBase {
  mod: any;

  constructor(extension: ExtensionType, mod: any) {
    super(extension);
    this.mod = mod;
  }
}

class ExtensionLoaded extends ExtensionModuleBase {
  output: ExtensionOutput;

  constructor(extension: ExtensionType, output: ExtensionOutput) {
    super(extension);
    this.output = output;
  }
}

class MetablockExtensions {
  extensions: Record<string, any>;

  constructor(extensions?: Record<string, any>) {
    this.extensions = {};
    const ext = extensions || {};
    Object.keys(ext).forEach((name: string) => {
      this.register(name, ext[name]);
    });
  }

  register(name: string, extension: any) {
    this.extensions[name] = extension;
  }

  load(modules: ExtensionModule[], input: ExtensionInput) {
    const result = modules.map((loaded: any) => {
      const { extension, error, mod } = loaded;
      if (error) return loaded;
      try {
        const output = mod(input);
        return new ExtensionLoaded(extension, output);
      } catch (e) {
        logger.error(e);
        return new ExtensionFailure(
          extension,
          `Failure while configuring extension ${extension.name}: ${e}`
        );
      }
    });
    return result;
  }
}

interface LoadExtensionsProps extends ExtensionInput {
  extensions: ExtensionType[];
  loader: MetablockExtensions;
  Component: any;
}

const LoadExtensions = (props: LoadExtensionsProps) => {
  const { extensions, loader, Component, ...opts } = props;
  const libs = React.useRef<ExtensionModule[]>([]);
  const [ignored, render] = React.useState<any>();
  const components = extensions.reduce(
    (o: Record<string, any>, extension: ExtensionType) => {
      if (extension.script)
        o[extension.name] = {
          extension,
          ExtComponent: loadable.lib(
            () => import(/* webpackIgnore: true */ extension.script as string)
          ),
        };
      else if (loader.extensions[extension.name])
        o[extension.name] = {
          extension,
          ExtComponent: loader.extensions[extension.name],
        };
      return o;
    },
    {}
  );

  // load the extension
  const setRef = (extension: ExtensionType, lib: any) => {
    libs.current.push(new ExtensionModule(extension, lib.default));
    render({});
  };

  const names = Object.keys(components);
  if (libs.current.length != names.length)
    return (
      <>
        {names.map((name: string, index: number) => {
          const { extension, ExtComponent } = components[name];
          return (
            <ExtComponent key={index} ref={(r: any) => setRef(extension, r)} />
          );
        })}
      </>
    );
  else
    return <Component {...opts} extensions={loader.load(libs.current, opts)} />;
};

export {
  ExtensionModule,
  ExtensionLoaded,
  ExtensionFailure,
  ExtensionType,
  MetablockExtensions,
  LoadExtensions,
};
