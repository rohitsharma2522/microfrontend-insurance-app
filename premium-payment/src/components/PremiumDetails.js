import React, { useState, useEffect } from 'react';

function PremiumDetails() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // IndexedDB setup
    const indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
    const request = indexedDB.open('myDatabase', 1);
    let db;

    request.onupgradeneeded = function(event) {
      db = event.target.result;
      const objectStore = db.createObjectStore('data', { keyPath: 'id', autoIncrement: true });
      // You can define your object store structure here
    };

    request.onsuccess = function(event) {
      db = event.target.result;
    };

    request.onerror = function(event) {
      console.log('Error opening IndexedDB');
    };
  }, []);

  const addDataToIndexedDB = (newData) => {
    const transaction = db.transaction(['data'], 'readwrite');
    const objectStore = transaction.objectStore('data');
    const request = objectStore.add(newData);

    request.onsuccess = function(event) {
      console.log('Data added to IndexedDB');
    };

    request.onerror = function(event) {
      console.log('Error adding data to IndexedDB');
    };
  };

  const fetchDataFromIndexedDB = () => {
    const transaction = db.transaction(['data'], 'readonly');
    const objectStore = transaction.objectStore('data');
    const request = objectStore.getAll();

    request.onsuccess = function(event) {
      setData(event.target.result);
    };

    request.onerror = function(event) {
      console.log('Error fetching data from IndexedDB');
    };
  };

  useEffect(() => {
    fetchDataFromIndexedDB();
  }, []);

  return (
    <div>
      <button onClick={() => addDataToIndexedDB({ /* your data object */ })}>Add Data</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            {/* Add other table headers */}
          </tr>
        </thead>
        <tbody>
          {data.map(item => (
            <tr key={item.id}>
              <td>{item.id}</td>
              {/* Render other table data */}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PremiumDetails;
