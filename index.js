const express =require("express");
const cors =require("cors");
const bodyParser= require("body-parser");
const testRoutes = require('./routes/testRoute')

// Creatinga server
const app=express();


// Creating  a port
const PORT= 4000;


// Creating a middleware
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))



app.get('/',(req,res)=>{
    res.send("your partners")
})
app.get('/ourpartners',(req,res)=>{
    res.send("your partners")
})

//to mount a 
app.get('/test',testRoutes);

// Running on port
app.listen(PORT,()=>{
    console.log(`Server Running on ..................PORT${PORT}`)
})
