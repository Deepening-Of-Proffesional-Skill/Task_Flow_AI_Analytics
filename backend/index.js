const express = require('express');
const dotenv = require('dotenv');

//configure environment variables
dotenv.config();

//create an Express app
const app = express();

//middleware to parse JSON requests
app.use(express.json());


app.get('/', (req, res) => {
  res.send('Welcome to the backend server!');
});


const PORT = process.env.PORT || 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});