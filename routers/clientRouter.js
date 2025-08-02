//External Module
const express = require('express');

//Core Module
// const path = require('path');
const clientRouter = express.Router();

//Local Module
clientRouter.get('/submit',(req,res,next) => {
 console.log("Submit successfully To Host");
 res.send('success')
 }
)
exports.clientRouter = clientRouter;