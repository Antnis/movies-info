//External Module
const express = require('express');

//Core Module
const path = require('path');

//Local Module
// const {clientRouter} = require("./routers/clientRouter");
const {hostRouter} = require("./routers/hostRouter");
const {movieReqRouter} = require("./routers/hostRouter");

const rootDir = require("./utils/pathUtils");
const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');
app.set('views','views');

// app.use(clientRouter);

app.use(hostRouter);
app.use(movieReqRouter);
app.use((req,res,next)=>{
 res.render('mainpage');
})


const Port = process.env.PORT || 3010;
app.listen(Port,()=>{
  console.log(`server address http://localhost:${Port}`);
})
