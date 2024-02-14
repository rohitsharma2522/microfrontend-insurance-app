onmessage = function (event) {
  const { data } = event;
  // Perform some task
  return ((18/ 100) * data).toFixed(2)
  // Send the result back to the main thread
  postMessage(result);
};
