import React,{useState} from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from '../src/Components/Login/Login';
import Avator from '../src/Components/Avatar/avatar';
import Business_Diagram from '../src/Components/Business_Diagram/business_diagram';
import Create_Build from '../src/Components/Create_Build/create_build';
import BuildingPg from '../src/Pages/buildingPg';
import BuildingPage from '../src/Components/Create_Build/buildingPage';
import Job_Assignent from '../src/Components/Job_Assignment/job_assignment';
import JobPage from '../src/Components/Job_Assignment/jobPage';
import JobPg from '../src/Pages/jobPg';
import ProcessPg from '../src/Pages/processPg';

import Process from '../src/Components/Process/process';
import ProcessPage from '../src/Components/Process/processPage';
import ViewProcess from '../src/Components/Process/viewProcess';
import CreateProcess from '../src/Components/Process/createProcess';
import Functions from '../src/Components/Function/function';
import FunctionsPage from '../src/Components/Function/functionPage';
import FunctionPg from '../src/Pages/functionPg';

import Report from '../src/Components/Report/report';
import Simulation from '../src/Components/Simulation/simulation';

import Home from './Home/Home';


function App() {
  
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/create_build" element={<Create_Build />} />
          <Route path="/buildingPage" element={<BuildingPage />} />
          <Route path="/buildingPg" element={<BuildingPg />} />
          <Route path="/process" element={<Process />} />
          <Route path="/processPg" element={<ProcessPg />} />
          <Route path="/processPage" element={<ProcessPage />} />
          <Route path="/viewProcess" element={<ViewProcess />} />
          <Route path="/create_process" element={<CreateProcess />} />
          <Route path="/function" element={<Functions />} />
          <Route path="/functionPage" element={<FunctionsPage />} />
          <Route path="/functionPg" element={<FunctionPg />} />
          <Route path="/avatar" element={<Avator />} />
          <Route path="/business_diagram" element={<Business_Diagram />} />
          <Route path="/job_assignment" element={<Job_Assignent />} />
          <Route path="/jobPg" element={<JobPg />} />
          <Route path="/jobPage" element={<JobPage />} />
          <Route path="/report" element={<Report />} />
          <Route path="/simulation" element={<Simulation />} />
        </Routes>
      </BrowserRouter>
      
    </>
  );
}
export default App;

