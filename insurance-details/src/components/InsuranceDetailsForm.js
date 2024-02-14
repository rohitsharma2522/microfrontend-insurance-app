import React, { useEffect, useState } from 'react';
import './InsuranceDetailsForm.scss';

const InsuranceDetailsForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [policyNumber, setPolicyNumber] = useState('');
  const [dob, setDOB] = useState('');


    const handleSubmit = (e) => {
      e.preventDefault();
      const insuranceData = {
        name,
        policyNumber,
        dob,
      };
      const customEvent = new CustomEvent('POLICY_DETAILS', {
        detail: { policyNumber: policyNumber, dob: dob, name: name } })
        console.log("customEvent", customEvent);
        window.dispatchEvent(customEvent);
    };

  return (
    <div className="insurance-form">
       <span className='mb-3'>
       <h5>Enter Insurance Details</h5>
        </span>
      <div>
        <label>Name</label>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label>Policy Number</label>
        <input 
          type="text" 
          value={policyNumber} 
          onChange={(e) => setPolicyNumber(e.target.value)} 
          required 
        />
      </div>
      <div>
        <label htmlFor="dob">Date of Birth</label>
        <input
          type="date"
          id="dob"
          name="dob"
          value={dob}
          onChange={(e)=>{setDOB(e.target.value)}}
        />
        <button className='btn btn-primary' onClick={handleSubmit}>Submit</button>
      </div>
      
    </div>
  );
};

export default InsuranceDetailsForm;
