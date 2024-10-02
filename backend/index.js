const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');
const app = express();
const port = 5000;

const db = mysql.createPool({
  connectionLimit : 10,
  host: "2541-39-40-60-201.ngrok-free.app", 
  user: "root",
  password: '',
  database: "fyp-project", 
});

app.use(cors({
  origin: 'https://cms-fyp-front-end.vercel.app/', 
  methods: ['GET', 'POST'], 
  credentials: true,  
  allowedHeaders: ['Content-Type'], 
}));


app.use(express.json());

app.get("/", (req, res) => {
  res.json("Hello");
});
//for inserting the data into the database
// for the building table
app.post('/create_build', (req, res) => {
  console.log('Received data:', req.body);

  db.getConnection((err, connection) => {
    if (err) throw err;

    const params = {
      building_name: req.body.buildingName,  
      no_floors: req.body.totalFloors,
      no_rooms: JSON.stringify(req.body.roomsPerFloor), 
      no_functions: req.body.noFunctions
    };

    connection.query('INSERT INTO building SET ?', params, (err, rows) => {
      connection.release(); 
      if (!err) {
        res.send('Building record has been added successfully.');
      } else {
        console.log('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save building data' });
      }

      console.log('The data inserted into the building table: \n', rows);
    });
  });
});

//for the function table
app.post('/function', (req, res) => {
  console.log('Received data:', req.body);

  db.getConnection((err, connection) => {
    if (err) throw err;

    const params = {
      function_name: req.body.functionName,  
      person_name: req.body.personName,
      no_jobs: req.body.noOfJobs,
      building_id: req.body.buildingId,          
    };

    connection.query('INSERT INTO function SET ?', params, (err, rows) => {
      connection.release(); 
      if (!err) {
        res.send('function record has been added successfully.');
      } else {
        console.log('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save function data' });
      }

      console.log('The data inserted into the function table: \n', rows);
    });
  });
});

//for the job table
app.post('/job_assignment', (req, res) => {
  console.log('Received data:', req.body);

  db.getConnection((err, connection) => {
    if (err) throw err;

    const params = {
      job_name: req.body.jobName,  
      job_desc: req.body.jobDescription,
      function_id: req.body.functionId,  
    };

    connection.query('INSERT INTO job SET ?', params, (err, rows) => {
      connection.release(); 
      if (!err) {
        res.send('Job record has been added successfully.');
      } else {
        console.log('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save job data' });
      }

      console.log('The data inserted into the job table: \n', rows);
    });
  });
});
//for inserting into the process table
app.post('/createProcess', (req, res) => {
  console.log('Received data:', req.body);

  db.getConnection((err, connection) => {
    if (err) throw err;

    const params = {
      process_name: req.body.processName,  
      building_id: req.body.buildingID,  
    };

    connection.query('INSERT INTO process SET ?', params, (err, rows) => {
      connection.release(); 
      if (!err) {
        res.send('process record has been added successfully.');
      } else {
        console.log('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save process data' });
      }

      console.log('The data inserted into the process table: \n', rows);
    });
  });
});


//for inserting into the process table
app.post('/task', (req, res) => {
  console.log('Received data:', req.body);

  db.getConnection((err, connection) => {
    if (err) throw err;

    const params = {
      task_name: req.body.taskName,  
      task_order: req.body.taskOrder,  
      job_id: req.body.jobId,
      process_id: req.body.processId
    };

    connection.query('INSERT INTO task SET ?', params, (err, rows) => {
      connection.release(); 
      if (!err) {
        res.send('task record has been added successfully.');
      } else {
        console.log('Error saving data:', err);
        res.status(500).json({ error: 'Failed to save task data' });
      }

      console.log('The data inserted into the task table: \n', rows);
    });
  });
});


//for reading the data from the database
// get function to fetch the data from the database
app.get('/buildingPage', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    connection.query('SELECT * FROM building', (err, rows) => {
      connection.release(); 

      if (!err) {
        res.json(rows); 
      } else {
        console.log('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch building data' });
      }

      console.log('The data fetched from building table: \n', rows);
    });
  });
});


app.get('/functionPage', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    connection.query('SELECT * FROM building', (err, rows) => {
      connection.release(); 

      if (!err) {
        res.json(rows); 
      } else {
        console.log('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch building data' });
      }

      console.log('The data fetched from building table: \n', rows);
    });
  });
});


app.get('/jobPage', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    connection.query('SELECT * FROM function', (err, rows) => {
      connection.release(); 

      if (!err) {
        res.json(rows); 
      } else {
        console.log('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch building data' });
      }

      console.log('The data fetched from function table: \n', rows);
    });
  });
});


app.get('/processPage', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    connection.query('SELECT * FROM process', (err, rows) => {
      connection.release(); 

      if (!err) {
        res.json(rows); 
      } else {
        console.log('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch process data' });
      }

      console.log('The data fetched from process table: \n', rows);
    });
  });
});

//For the job associated with each task
app.get('/process', (req, res) => {
  db.getConnection((err, connection) => {
    if (err) throw err;

    connection.query('SELECT * FROM job', (err, rows) => {
      connection.release(); 

      if (!err) {
        res.json(rows); 
      } else {
        console.log('Error fetching data:', err);
        res.status(500).json({ error: 'Failed to fetch job data' });
      }

      console.log('The data fetched from job table: \n', rows);
    });
  });
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
