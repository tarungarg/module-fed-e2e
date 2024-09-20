postMessage("I'm working before postMessage('ali').");

onmessage = (event) => {
  postMessage(`Hi, ${event.data}`);
};
