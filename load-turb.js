import { lazy } from "react";

const df = async (scope, module) => {
  const container = window[scope]; // or get the container somewhere else
  await container.init(__webpack_share_scopes__.default); // eslint-disable-line
  return container.get(module).then((factory) => {
    const Module = factory();
    return Module;
  });
};

const ls = async (url) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = url;
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      script.parentElement.removeChild(script);
      resolve(true);
    };

    script.onerror = () => {
      resolve(false);
    };

    document.head.appendChild(script);
  });
};

const loadRemoteScripts = (url, name) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement("script");

    script.src = url;
    script.type = "text/javascript";
    script.async = true;

    script.onload = () => {
      script.parentElement.removeChild(script);
      resolve({ loaded: true, componentName: name });
    };

    script.onerror = () => {
      console.log(`${url} not loaded!!!!!`)
      resolve(false);
    };

    document.head.appendChild(script);
  });
}
const lsp = async (configs, appRoutesInitial) => {

  const updateWithModuleName = {};

  const allMFEs = configs.map(config => loadRemoteScripts(`${config.url}remoteEntry.js`, config.name))

  const componentNames = []
  await Promise.allSettled(allMFEs).then(results => {
    results.forEach(res => {
      if (res.value.loaded) {
        componentNames.push(res.value.componentName)
      }
    })
  })

  const loadAllRoutes = componentNames.map(name => getComponent(name, "./appRoutes"))
  const loadAllComponents = componentNames.map(name => getComponentManifest(name, "./manifest"))


  const appLoadedRoutes = []

  await Promise.allSettled([...loadAllRoutes, ...loadAllComponents]).then(results => {
    results.forEach(res => {
      if (res.value) {
        if (Array.isArray(res.value)) {
          appLoadedRoutes.push(...res.value)
        } else {
          const { exposedComponents } = res.value.val
          if (exposedComponents){
            Object.keys(exposedComponents).map((component) => {
              if (component !== "./appRoutes")
                updateWithModuleName[component] = res.value.name;
            });
          }
        }
      }
    })
  })


  appRoutesInitial = [...appRoutesInitial, ...appLoadedRoutes];

  return {
    appRoutesInitial,
    updateWithModuleName
  }
};

const getComponentManifest = async (module, componentName) => {
  const moduleRoutes = await df(module, componentName);
  return moduleRoutes.exposedComponents ? { val: moduleRoutes, name: module } : { val: [], name: module }
  // return !moduleRoutes?.default ? { val: [], name: module } : { val: moduleRoutes.default, name: module };
};

const getComponent = async (module, componentName) => {
  const moduleRoutes = await df(module, componentName);
  return !moduleRoutes?.default ? [] : moduleRoutes.default;
};

const loadLazy = (moduleName, componentName) =>
  lazy(() => df(moduleName, componentName));

const setupInitialApp = async (configs, appRoutes) => {
  const sap = new Promise((resolve, reject) => {
      resolve(lsp(configs, appRoutes))
  });

  return await sap;
};


export
{
  setupInitialApp,
  loadLazy,
  ls,
  df
}
