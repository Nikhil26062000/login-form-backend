

const mongoose = require('mongoose');

// this schema is used to store data in db . basically it defines how we store our data in db which is coming from frontend
const userRegisterSchema = new mongoose.Schema({
    firstname:{
        type: 'string',
        required: true
    },
    lastname:{
        type: 'string',
        required: true
    },
    age:{
        type: 'Number',
        required: true,
        min:10,
    },
    email:{
        type: 'string',
        required: true,
        unique:true
    },
    password:{
        type: 'string',
        required: true,
    },
    phone:{
        type: 'string',
        required: true,
    },
    gender:{
        type: 'string',
        required: true
    },
})

const Register = new mongoose.model("Register",userRegisterSchema);
module.exports = Register;