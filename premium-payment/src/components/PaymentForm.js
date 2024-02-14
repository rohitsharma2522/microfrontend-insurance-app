import React, { useState, useEffect } from 'react';
import './PaymentForm.scss'
import InsuranceTable from './InsuranceTable'

const PaymentForm = () => {
 const [policyHolderDetails, setPolicyHolderDetails] = useState({});
  const [premiumAmount, setPremiumAmount] = useState('');
  const [name, setName] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [dob, setDOB] = useState("");
  const [coverageType, setCoverageType] = useState("");
  const [paymentBtn, setPaymentBtn] = useState(false);  



  const handleSubmit = () => {
    const customEvent = new CustomEvent('worker', {detail: {'loading':true}})
    window.dispatchEvent(customEvent);
    const existingData = localStorage.getItem('policyDetails');
    const obj = {
        name,
        dob,
        coverageType,
        premiumAmount,
        policyNumber
    };
    let mergedRecords;
    if(existingData) {
        mergedRecords = JSON.parse(existingData);
        console.log("Existing record", mergedRecords);
        mergedRecords.push(obj);
    } else {
        mergedRecords = [obj];
    }
    console.log("merged ", mergedRecords);
    setPolicyHolderDetails(mergedRecords);
    const mergedDataJSON = JSON.stringify(mergedRecords);
    localStorage.setItem('policyDetails', mergedDataJSON);


  }
  useEffect(() => {
    window.addEventListener('POLICY_DETAILS', (customEvent) => {
        const {detail} = customEvent || {}
        console.log('data from custom event', detail)
        setName(detail.name)
        setPolicyNumber(detail.policyNumber)
        setDOB(detail.dob)
        setPaymentBtn(true);
    })
  }, []);

  useEffect(() => {
    const savedData = localStorage.getItem('policyDetails');
    if (savedData) {
        const parsedData = JSON.parse(savedData);
        console.log("parse", parsedData);
        setPolicyHolderDetails(parsedData);
    }
  }, []); 
  const handleSelectChange = (event) => {
    const selectedOption = event.target.value;
    setCoverageType(selectedOption);

    let newValue = '';
    if (selectedOption === 'health') {
      newValue = '10000';
    } else if (selectedOption === 'life') {
      newValue = '20000';
    }else if (selectedOption === 'auto') {
      newValue = '30000';
    }
    setPremiumAmount(newValue);
  }
  
  const executeWorker = () => {
    const worker = new Worker('./webworker/worker.js')
     worker.onmessage = function (event) {
         worker.terminate();
       };
    
       if (worker) {
         worker.postMessage(5); 
       }
       return () => {
        worker.terminate();
       };
   }
  return (
    <>
    <div className="payment-form">
        <span className='mb-3'>
            <h5>Payment Details</h5>
        </span>
        <div className="input-container">
            <input
            type="text"
            value={policyNumber}
            disabled
            placeholder="Policy Number"
            />
        </div>
        <div className="input-container">
            <input
            type="text"
            value={dob}
            disabled
            placeholder="Date of Birth"
            />
        </div>
       
        <div className='mb-3'>
            <select className="form-select" aria-label="Default select example"
            value={coverageType} 
            onChange={handleSelectChange} 
            required
            >
            <option value="">Select Coverage Type</option>
            <option value="health">Health</option>
            <option value="life">Life</option>
            <option value="auto">Auto</option>
            </select>
        </div>
      
        <div className="input-container">
            <input
            type="text" 
            value={premiumAmount}
            placeholder="Enter amount"
            />
        </div>
        <div>
           {paymentBtn && <button className='btn btn-primary' onClick={handleSubmit}>Pay</button>}
          
        </div>

       
    </div>
    <div className='row'>
        <InsuranceTable jsonData={policyHolderDetails} />
    </div>
    
    </>
  );
}

export default PaymentForm;
