import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './process.css';
import axios from 'axios';

const Process = () => {
  const location = useLocation();
  const { process } = location.state;
  const [numTasks, setNumTasks] = useState(0);
  const [tasks, setTasks] = useState([]);
  const [jobOptions, setJobOptions] = useState([]);
  const [completeTime, setCompleteTime] = useState('');
  const [insertedTask,setInsertedTask]=useState([]);

  axios.defaults.withCredentials = true;
  useEffect(() => {
    axios.get('http://localhost:5000/process')
      .then(response => {
        console.log('Fetched data:', response.data);
  
        const jobs = response.data.map(job => ({ id: job.job_id, name: job.job_name }));
        setJobOptions(jobs);

  
      })    
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);
  
  // Example jobs to be selected from the dropdown
  const handleNumTasksChange = (count) => {

    const taskCount = parseInt(count);
    setNumTasks(taskCount);
    
    // Initialize tasks with empty values
    const newTasks = Array.from({ length: taskCount }, () => ({ taskName: '', jobId:0 ,order:0 }));
    setTasks(newTasks);
  };

  const handleTaskChange = (index,field,value) => {
    
    const newTasks = [...tasks];
    newTasks[index]['order'] =parseInt(index+1);
    newTasks[index][field] = value;
    setTasks(newTasks);
  }
  const handleJobChange = (index,field,value) => {
    const newTasks = [...tasks];
    newTasks[index][field] = field === 'jobId' ? parseInt(value) : value; 
    setTasks(newTasks);
  }

  const handleSubmit = (event) => {
    event.preventDefault();
  
    // Loop through each task and send a request for each one
    tasks.forEach((task, index) => {
      const taskData = {
        taskName:task.taskName,
        taskOrder:parseInt(task.order),
        jobId:task.jobId,
        processId:process.process_id,
      };
      
      console.log(`Payload for task ${index + 1}:`, taskData);
    
      axios.post('http://localhost:5000/task', taskData)
        .then(response => {
          console.log(`Success for task ${index + 1}:`, response);
        })
        .catch(error => {
          console.error(`Error for task ${index + 1}:`, error);
        });  
    });
  };

  return (
    <form className="job-form" onSubmit={handleSubmit}>
      {!process.no_tasks?(
      <div className="form-group">
        <label className="form-label">
          Enter the number of tasks:
          <input
            type="number"
            className="form-input"
            value={numTasks}
            onChange={(e)=>handleNumTasksChange(e.target.value)}
            min="1"
          />
        </label>
      </div>

      ):( <button  className="assign-button"onClick={()=>handleNumTasksChange(process.no_tasks)}>Assign Tasks</button>)
        } 
      {!process.complete_time &&
      <div className="form-group">
        <label className="form-label">
          Enter the expected hours required to complete the process:
          <input
            type="number"
            className="form-input"
            value={completeTime}
            onChange={(e) => setCompleteTime(e.target.value)}
            min="1"
          />
        </label>
      </div>
      }
      {/* Task and Job Inputs on the same line */}
      {tasks.map((task,index)=>(
        <div key={index} className="form-group-row">
          <label className="form-label-inline">
            Task {index + 1} Name:
            <input
              type="text"
              className="form-input-text"
              value={task.taskName}
              onChange={(e) => handleTaskChange(index, 'taskName', e.target.value)}
            />
          </label>
          <label className="form-label-inline">
            Job {index + 1}:
            <select
              className="form-select"
              value={task.jobName}
              onChange={(e) => handleJobChange(index, 'jobId', e.target.value)}
            >
              <option value="">Select Job</option>
              {jobOptions.map((job, i) => (
                <option key={i} value={job.id}>{job.name}</option>
              ))}
            </select>
          </label>
        </div>
      ))}

      <button type="submit" className="submit-button">Assign</button>
    </form>
  );
};

export default Process;
