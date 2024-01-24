

const express = require('express');
const app = express();
const Register = require("./models/register");
require("./db/connection");
const bcrypt = require('bcryptjs');
const path = require('path');
const PORT = process.env.PORT || 3000;
const hbs = require('hbs');
const templatePath = path.join(__dirname,"../templates/views")
const partialsPath = path.join(__dirname,"../templates/partials")
//const staticPath = path.join(__dirname, '../public');


app.use(express.json());
app.use(express.urlencoded({ extended:false }));

// app.use(express.static(staticPath))
app.set("view engine","hbs");
app.set("views",templatePath);
hbs.registerPartials(partialsPath)


app.get('/', (req, res) => {
    res.render("index");
})

app.get('/login', (req, res) => {
    res.render("login");
})

app.get('/register', (req, res) => {
    res.render("register");
})


app.post('/login', async(req, res) => {
   try {
        const email = req.body.email;
        const password = req.body.password;

        const result = await Register.findOne({email});
        console.log(result);

        const isPassMatched = await bcrypt.compare(password,result.password)
        if(isPassMatched){
            res.status(200).send({"Login Successful":result.password})
        }else{
            res.status(404).send({"Login failed":result.password});
        }
        // if(password ===result.password){
        //     res.status(200).send({"Login successful":result.password});
        // }else{
           
        // }
   } catch (error) {
        console.log(error);
   }
})

app.post('/register', async(req, res) => {
    try {
        
        const result = await Register.create({
            firstname : req.body.firstName, //! firstname is of of mongodb schema , firstName is from registration form name
            lastname : req.body.lastName,  //! lastname is of of mongodb schema , lastName is from registration form name
            age : req.body.age,
            email : req.body.email,
            password : req.body.password,
            phone : req.body.phone,
            gender : req.body.gender

        });
        if(!result){
            console.log("Error");
            res.send("Data not added successfully");
        }else{
            console.log(result);
            res.send("Data added successfully");
        }
       
    } catch (error) {
        console.log(error);
    }
})

app.listen(PORT,()=>{
    console.log("Server is running on Port " + PORT);
})