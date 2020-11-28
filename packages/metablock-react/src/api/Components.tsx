import Alert from "@material-ui/lab/Alert";
import { ExtensionOutput } from "@metablock/core";
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import { Route, Switch } from "react-router-dom";
import { useStores } from "../store";
import { NotFound, Page } from "../views";
import { ExtensionFailure, ExtensionLoaded, ExtensionType } from "./Extensions";
import list from "./List";
import table from "./Table";

type ExtensionOrFailure = ExtensionLoaded | ExtensionFailure;
type RenderType = (props: any) => any;

const Components: Record<string, any> = {
  list,
  table,
};

interface ExtensionProps extends ExtensionOutput {
  extension: ExtensionType;
  render?: RenderType;
}

interface ExtensionsProps {
  extensions: ExtensionOrFailure[];
  render?: RenderType;
}

const ErrorFallback = (props: any) => {
  const { error } = props;
  return (
    <Alert severity="error">
      Something went wrong <pre>{error.message}</pre>
    </Alert>
  );
};

const ExtensionsComponent = (props: ExtensionsProps) => {
  const { extensions, render } = props;
  const { messageStore } = useStores();
  const [loaded, setLoaded] = React.useState<any[]>([]);

  React.useEffect(() => {
    setLoaded(
      extensions
        .map((e: ExtensionOrFailure) => {
          const failure = e as ExtensionFailure;
          if (failure.error) messageStore.error(failure.message);
          else return e as ExtensionLoaded;
        })
        .filter((e: any) => e)
    );
  }, [extensions, messageStore]);

  return (
    <Switch>
      {loaded.map((e: ExtensionLoaded) => {
        const { output, extension } = e;
        return (
          <Route
            path={output.url}
            key={extension.id}
            render={() => (
              <ExtensionComponent
                {...output}
                extension={extension}
                render={render}
              />
            )}
          />
        );
      })}
      <Route component={NotFound} />
    </Switch>
  );
};

const ExtensionComponent = (props: ExtensionProps) => {
  const { title } = props;
  return (
    <Page title={title}>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Render {...props} />
      </ErrorBoundary>
    </Page>
  );
};

const Render = (props: ExtensionProps) => {
  const { extension, type, component, render, ...extra } = props;
  const { url } = extra;
  const Component: any = type ? Components[type] : component;
  if (!Component)
    throw new ExtensionFailure(
      extension,
      `Component not available, either specify a valid type or a component`
    );
  return render ? (
    render({ Component, props: extra, url })
  ) : (
    <Component {...extra} />
  );
};

export default ExtensionsComponent;
