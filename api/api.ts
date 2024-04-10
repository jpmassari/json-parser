import { serialize } from '../main/serialize'

const express = require('express');
const bodyParser = require('body-parser')
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello, this is your API!');
});

app.post('/', (req, res) => {
  // Access the data sent in the POST request body
  const postData = req.body;

  // Do something with the data (e.g., log it)
  console.log('Received POST request with data:', postData);

  // Send a response
  res.json({ message: 'POST request received successfully'});
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});