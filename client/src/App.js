import React from "react";
import { Switch, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import BootcampsPage from "./components/pages/BootcampsPage";

import "./App.css";

const App = () => {
  return (
    <>
      <Navbar />
      <Switch>
        <Route exact path="/" component={BootcampsPage} />
      </Switch>
    </>
  );
};

export default App;
