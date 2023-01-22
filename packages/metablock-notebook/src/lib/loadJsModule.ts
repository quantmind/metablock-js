const LoadedModules: Record<string, Promise<void>> = {};

const loadJsModule = (src: string): Promise<any> => {
  if (!LoadedModules[src]) {
    LoadedModules[src] = import(/* webpackIgnore: true */ src);
  }
  return LoadedModules[src];
};

export default loadJsModule;
