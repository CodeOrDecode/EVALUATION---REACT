import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Components/Home";
import Edit from "../Components/Edit";
import Singletask from "../Components/Singletask";
import Create from "../Components/Create";

const Allroutes = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/edit/:id" element={<Edit />} />
        <Route path="/task/:id" element={<Singletask />} />
      </Routes>
    </div>
  );
};

export default Allroutes;
