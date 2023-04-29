const express = require("express");
const env = require("./config/envConfig")
const app = express();
const port = env.PORT || 3000 ;
const connect = require('./config/db');
const cors = require("cors");
 


// add middleware 
app.use(express.json());



app.use(cors());

// start routes


const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes );



const studentRoutes = require('./routes/students');
app.use('/student', studentRoutes );



const absenceRoutes = require('./routes/absence');
app.use('/absence', absenceRoutes );







connect();

 app.listen(port , ()=>{
    console.log(`Your serverw is runing at port number : ${port}`);
 });