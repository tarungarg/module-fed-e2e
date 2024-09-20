import React, { useEffect, useState } from 'react';

import {setupInitialApp} from 'shared/components';
import { StartApp } from './StartApp';

export default () => {

  const [routes, setRoutes] = useState([]);
  const [modules, setModules] = useState([]);

  const myWorker = new Worker(
    new URL('./my_task.js', import.meta.url));


  myWorker.onmessage = (event) => {
    console.log(`Worker said : ${event.data}`);
  };

  myWorker.postMessage("ali");

  useEffect(() => {
    const configSetup = async() => {
      const configs = [
        {
          name: "app1",
          url: "http://localhost:3001/",
        },
      ];
      const routesa = [
        {
          path: "/",
          element: <div>Home!!!!!!!!!!!!</div>,
        }
      ]

      const {appRoutesInitial, updateWithModuleName} = await setupInitialApp(configs, routesa)
      setRoutes(appRoutesInitial)
      setModules(updateWithModuleName)
    }

    configSetup()
  }, [])




 return (
 <div style={{margin: '20px'}}>
    <React.Suspense fallback='Loading header...'>
        { routes.length > 0 && <StartApp routes={routes} modules={modules} />}
    </React.Suspense>
  </div>
 )
}

