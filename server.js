//import modules
//require() is the function, used to import the "modules"
const express = require("express");
const cors = require("cors");
const bodyparser = require("body-parser");
const mongodb = require("mongodb");


//create the rest object
const app = express();
//where "app" is the rest object
//where "app" object used to develop the "rest" services


//enable cors policy
app.use( cors() );


//set the MIME Type
app.use( bodyparser.json() );


//create the reference variable to connect to mongodb database
const ashokIT = mongodb.MongoClient;


//create the post request
app.post("/login",(req,res)=>{
    ashokIT.connect("mongodb+srv://admin:admin@miniprojectdb.nzphu.mongodb.net/angular9pm?retryWrites=true&w=majority",(err,connection)=>{
        if(err) throw err;
        else{
            const db = connection.db("angular9pm");
            db.collection("login_details")
              .find({"email":req.body.email,"password":req.body.password})
              .toArray((err,array)=>{
                if(err) throw err;
                else{
                    if(array.length>0){
                        res.send({"login":"success"});
                    }else{
                        res.send({"login":"fail"});
                    }
                }
            })
        }
    });
});


//assign the port number
app.listen(8080,()=>{
    console.log("server listening the port number 8080");
});
