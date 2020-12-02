import loadable from "@loadable/component";
import { Extension, getLogger, SpaceExtension } from "@metablock/core";
import React from "react";
import { ExtensionInput } from "./interfaces";

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
  output: any;

  constructor(extension: ExtensionType, output: any) {
    super(extension);
    this.output = output;
  }
}

interface RenderExtensionsProps {
  Component: any;
  extensions?: ExtensionType[];
  [x: string]: any;
}

class ExtensionApp {
  extensions: Record<string, any>;
  inputs: ExtensionInput;
  loaded: ExtensionLoaded[];
  private rendered = false;

  constructor(inputs: ExtensionInput, extensions?: Record<string, any>) {
    this.inputs = inputs;
    this.extensions = {};
    this.loaded = [];
    const ext = extensions || {};
    Object.keys(ext).forEach((name: string) => {
      this.register(name, ext[name]);
    });
  }

  get baseUrl() {
    return this.inputs.baseUrl;
  }

  get navigation() {
    return this.inputs.navigation;
  }

  register(name: string, extension: any) {
    this.extensions[name] = extension;
  }

  load(modules: ExtensionModule[]) {
    modules
      .map((loaded: any) => {
        const { extension, error, mod } = loaded;
        if (error) return loaded;
        try {
          const output = mod(this.inputs);
          return new ExtensionLoaded(extension, output);
        } catch (e) {
          logger.error(e);
          return new ExtensionFailure(
            extension,
            `Failure while configuring extension ${extension.name}: ${e}`
          );
        }
      })
      .forEach((ext: any) => this.loaded.push(ext));
  }

  render(props: RenderExtensionsProps) {
    const { extensions = [], Component, ...opts } = props;
    const Render = () => {
      const libs = React.useRef<ExtensionModule[]>([]);
      const [ignored, render] = React.useState<any>();
      const components = extensions.reduce(
        (o: Record<string, any>, extension: ExtensionType) => {
          if (extension.script)
            o[extension.name] = {
              extension,
              ExtComponent: loadable.lib(
                () =>
                  import(/* webpackIgnore: true */ extension.script as string)
              ),
            };
          else if (this.extensions[extension.name])
            o[extension.name] = {
              extension,
              ExtComponent: this.extensions[extension.name],
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
                <ExtComponent
                  key={index}
                  ref={(r: any) => setRef(extension, r)}
                />
              );
            })}
          </>
        );
      else {
        this.load(libs.current);
        return <Component {...opts} app={this} />;
      }
    };
    if (this.rendered) return <Component {...opts} app={this} />;
    else {
      this.rendered = true;
      return <Render />;
    }
  }
}

export {
  ExtensionModule,
  ExtensionLoaded,
  ExtensionFailure,
  ExtensionType,
  ExtensionApp,
};
