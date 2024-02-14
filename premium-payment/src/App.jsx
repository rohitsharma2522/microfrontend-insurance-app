import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import PaymentForm from "./components/PaymentForm";
import Table from "./components/InsuranceTable";

const App = () => (
  <div className="container">
    <PaymentForm/>
    {/* <Table/> */}
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
