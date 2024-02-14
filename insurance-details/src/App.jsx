import React from "react";
import ReactDOM from "react-dom";

import "./index.css";
import InsuranceDetailsForm from "./components/InsuranceDetailsForm";

const App = () => (
  <div className="container">
    <InsuranceDetailsForm/>
  </div>
);
ReactDOM.render(<App />, document.getElementById("app"));
