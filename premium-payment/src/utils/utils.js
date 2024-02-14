// utility.js or any other file where you want to use the web worker

let worker;

export function initializeWorker() {
  if (typeof Worker !== 'undefined') {
    worker = new Worker('../webworker/worker.js');
    worker.onmessage = function (event) {
      console.log('Received result from web worker:', event.data);
      // Handle the result as needed
    };
  } else {
    console.error('Web workers are not supported in this environment.');
  }
}

export function performTaskInBackground(data) {
  if (worker) {
    // Send data to the web worker for processing
    worker.postMessage(data);
  } else {
    console.error('Web worker is not initialized.');
  }
}

export function terminateWorker() {
  if (worker) {
    // Terminate the web worker when no longer needed
    worker.terminate();
  }
}
