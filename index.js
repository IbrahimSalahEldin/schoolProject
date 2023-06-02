const express = require("express");
const env = require("./config/envConfig")
const app = express();
const port = env.PORT || 3000 ;
const connect = require('./config/db');
const cors = require("cors");
const path = require("path");


var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({
    limit: '5mb',
    parameterLimit: 100000,
    extended: true 
}));

app.use(bodyParser.json({
    limit: '5mb'
}));
// app.use(bodyParser.json());

// Routes and other middleware...

// Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err);
//   res.status(500).json({ error: 'Internal server error' });
// });


// add middleware 
app.use(express.json());

app.use("/assets", express.static("assets/uploads"));
app.use(cors());


const userRoutes = require('./routes/userRoutes');
app.use('/user', userRoutes );

const studentRoutes = require('./routes/students');
app.use('/student', studentRoutes );

connect();

 app.listen(port , ()=>{
    console.log(`Your serverw is runing at port number : ${port}`);
 });