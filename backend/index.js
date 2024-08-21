const express = require('express');
const cors = require('cors');
const app = express();
const port = 5000;

// Enable CORS for all routes and origins
app.use(cors({
  origin: 'https://cms-fyp-front-end.vercel.app', // Allow requests from this origin
  methods: ['GET', 'POST'], // Specify allowed methods
  credentials: true, // Enable setting cookies
  allowedHeaders: ['Content-Type'], // Specify allowed headers
}));

// Middleware to parse JSON bodies
app.use(express.json());

app.get("/",(req , res)=>{
    res.json("Hello");
})
// Define the POST route
app.post('/create_build', (req, res) => {
  const { totalFloors, roomsPerFloor } = req.body;
   res.json({ totalFloors, roomsPerFloor });
  console.log('Total Floors:', totalFloors);
  console.log('Rooms Per Floor:', roomsPerFloor);

  const message = `Building data received successfully! Total Floors: ${totalFloors}, Rooms Per Floor: ${JSON.stringify(roomsPerFloor)}`;

  // Send the response
  res.status(200).send({ message });
});


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
