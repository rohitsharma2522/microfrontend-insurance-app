import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";

import "./index.css";
import InsuranceDetailsForm from 'insurance_details/InsuranceDetailsForm';
import PaymentForm from 'premium_payment/PaymentForm';
import {RotatingLines}  from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [isLoading, setIsLoading] = useState(false);

  // const executeWorker = () => {
  //   const worker = new Worker(new URL('', import.meta.url))
  //    worker.onmessage = function (event) {
  //        worker.terminate();
  //      };
    
  //      if (worker) {
  //        worker.postMessage(5); 
  //      }
  //      return () => {
  //       worker.terminate();
  //      };
  //  }
   const notify = () => toast.success("Payment successful");

   const executeLoader = (loading) => {
    if(loading) {
      setIsLoading(loading);
    }
    setTimeout(() => {
      setIsLoading(false);
      notify();
    }, 2000);
   }
   useEffect(() => {
    window.addEventListener('worker', (customEvent) => {
      const {detail}= customEvent || false
      if(detail.loading) {
        executeLoader(detail.loading)
      }
    
    });
  }, []);
  
  return (
  <div className="container">
    <div className="loader-container">
       {isLoading && <RotatingLines  color="#00BFFF" height={80} width={80}/>}
    </div>
    <div className="row">
      <div className="col-md-6">
        <InsuranceDetailsForm/>
      </div>
      <div className="col-md-6">
        <PaymentForm/>
      </div>
      <ToastContainer/>
    </div>
  </div>
)};
ReactDOM.render(<App />, document.getElementById("app"));
