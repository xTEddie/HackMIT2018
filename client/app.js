const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Set static folder
app.use(express.static(path.join(__dirname, 'dist')));

// Prints all requests to the server
app.use((req, res, next) => {
  console.log(new Date(), req.method, req.path);
  next();
});

app.listen(PORT, () => {
  console.log(`Listening on port ${ PORT }!`);
});
