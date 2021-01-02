import React from "react";
// import { useMachine } from "@xstate/react";
// import { Machine } from "xstate";
import "./App.css";
import DataComponent from "./components/DataComponent";
function App() {
  return (
    <div className="app">
      <DataComponent key="custom" mod="custom" />
      <DataComponent key="emp" mod="emp" />
    </div>
  );
}

export default App;
