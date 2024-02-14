import React, { useState, useEffect } from 'react';

const InsuranceTable = ({jsonData}) => {
  console.log("json data is ", jsonData);

  //  Empty dependency array ensures the effect runs only once, on component mount
  // useEffect(() => {
  //   if(jsonData){
  //     const savedData = localStorage.getItem('policyDetails');
  //     if (savedData) {
  //         const newData = JSON.parse(savedData);
  //         setData(prev => ([...prev,  ...newData]));
  //     }
  //   }
  // }, jsonData); 
  const renderTableData = () => {
    if(jsonData && jsonData.length > 0) {
      return jsonData?.map((item, index) => {
        const { name, policyNumber, premiumAmount } = item; // Assuming each item in data is an object with 'id', 'name', and 'age' properties
        return (
          <tr key={index}>
            <td>{name}</td>
            <td>{policyNumber}</td>
            <td>{premiumAmount}</td>
            <td>Paid</td>
          </tr>
        );
      });
    }
    return (
      <tr>
        <td colSpan="4">No records found</td>
      </tr>
    );
  
  };

  return (
    <div className="container">
      <h5> Insurance Premium Records</h5>
      <table className="table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Policy Number</th>
            <th>Premium Amount</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {renderTableData()}
        </tbody>
      </table>
    </div>
  );
}

export default InsuranceTable;
