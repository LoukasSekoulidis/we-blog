const express = require('express');

const database = require('./database/db');

const testRoutes = require('./endpoints/test/testRoute');
const userRoutes = require('./endpoints/user/UserRoute');

const app = express();

/*
Adding  Routes:
**/
app.use('/', testRoutes);
app.use('/user', userRoutes);

database.initDB((error, db) => {
  if (db) {
    console.log('Database succesfully binded');
  }
  else {
    console.log('Database binding not succesfull');
  }
});

const port = 8080;

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})