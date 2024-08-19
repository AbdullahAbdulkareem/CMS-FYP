import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../src/Components/Login/Login';
import Avator from '../src/Components/Avatar/avatar';
import Business_Diagram from '../src/Components/Business_Diagram/business_diagram';
import Create_Build from '../src/Components/Create_Build/create_build';
import Job_Assignent from '../src/Components/Job_Assignment/job_assignment';
import Process from '../src/Components/Process/process';
import Report from '../src/Components/Report/report';
import Simulation from '../src/Components/Simulation/simulation';


import Home from './Home/Home';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/home" element={<Home />} />
          <Route path="/avatar" element={<Avator />} />
          <Route path="/business_diagram" element={<Business_Diagram />} />
          <Route path="/create_build" element={<Create_Build />} />
          <Route path="/job_assignment" element={<Job_Assignent />} />
          <Route path="/process" element={<Process />} />
          <Route path="/report" element={<Report />} />
          <Route path="/simulation" element={<Simulation />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}
export default App;

