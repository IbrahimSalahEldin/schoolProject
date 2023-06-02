
const jwt = require ('jsonwebtoken');
const { model } = require('mongoose');
const TOKEN_KEY = "ITI"

exports.authAdmin = function (req,res,next){

     const token = req.headers["x-token"]; 
    console.log(token);
     if(!token) 
     {
        return res.status(403).send("A token is required for authentication");
     }
     try{
   
          jwt.verify(token,TOKEN_KEY,(err,decoded)=>
         {
          if (decoded.user.role != true) 
          return res.status(401).json({ message: "Not authorized" })

            req.user = decoded;  
            return next();


         }) ;
       
      

                     

      }
     catch(err)
     {
         return res.status(401).send("invalid Token");   
     }
     //return next();  
}



exports.authTeacher = function (req,res,next){

    const token = req.headers["x-token"]; 
    if(!token) 
    {
       return res.status(403).send("A token is required for authentication");
    }
    try{
         jwt.verify(token,TOKEN_KEY,(err,decoded)=>
        {
         if (decoded.user.role != true) 
         return res.status(401).json({ message: "Not authorized" })
 
           req.user = decoded;  
           return next();
 
        }) ;                     
     }
    catch(err)
    {
        return res.status(401).send("invalid Token");   
    }
    //return next();  
 }