const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const fs = require('fs');

const database = require('./database/db');

const userRoutes = require('./endpoints/user/UserRoute');
const publicUserRoutes = require('./endpoints/publicUser/UserRoute');
const authenticationRoutes = require('./endpoints/authentication/AuthenticationRoute');
const forumThreadRoutes = require('./endpoints/forumThread/ForumThreadRoute');
const forumMessageRoute = require('./endpoints/forumMessage/ForumMessageRoute');

const userService = require('./endpoints/user/UserService');


const app = express();
app.use(bodyParser.json());

/*
Adding  Routes:
**/

app.use('/users', userRoutes);
app.use('/publicUsers', publicUserRoutes);
app.use('/authenticate', authenticationRoutes);
app.use('/forumThreads', forumThreadRoutes);
app.use('/forumMessages', forumMessageRoute);

database.initDB((error, db) => {
  if (db) {
    console.log('Database succesfully binded');

  }
  else {
    console.log('Database binding not succesfull');
  }
  userService.createDefaultAdmin((err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });
});

/* Error Handler: */
app.use((req, res, next) => {
  res.status(404).json({ Error: 'Can not find that! The url is not supported!' });
});

app.use((err, req, res, next) => {
  console.log(err.stack);
  res.status(500).json({ Error: "Something broke!" });
});

const port = 443;

https
  .createServer(
    {
      key: fs.readFileSync("./certificates/key.pem"),
      cert: fs.readFileSync("./certificates/cert.pem"),
    },
    app)
  .listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
  })