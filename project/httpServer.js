const express = require('express');
const bodyParser = require('body-parser');

const database = require('./database/db');

const userRoutes = require('./endpoints/user/UserRoute');
const publicUserRoutes = require('./endpoints/publicUser/UserRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');

const userService = require('./endpoints/user/UserService');


const app = express();
app.use(bodyParser.json());

/*
Adding  Routes:
**/

app.use('/users', userRoutes);
app.use('/publicUsers', publicUserRoutes);
app.use('/authenticate', authenticationRoutes);

database.initDB((error, db) => {
  if (db) {
    console.log('Database succesfully binded');

  }
  else {
    console.log('Database binding not succesfull');
  }
  userService.createDefaultAdmin();
});

/* Error Handler: */
app.use((req, res, next) => {
  res.status(404).send('Can not find that! The url is not supported!');
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).send("Something broke!");
});

const port = 8080;

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})