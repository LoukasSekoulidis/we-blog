const express = require('express');
const { MongoGridFSChunkError } = require('mongodb');
const router = express.Router();

const userModel = require('../user/UserModel')
const confirmationService = require('./ConfirmationService')

router.get('/:token', async(req, res) => {
  let token = req.url.split('/')[1];
  confirmationService.verifyUser(token, (err, user)=>{
    if (user) {
      // Problem hier!
      res.status(200).json({Succes: 'userMail confirmed succesufully'});
    }
    else {
      res.status(404).json({ Error: err });
    }
  })
})

module.exports = router;