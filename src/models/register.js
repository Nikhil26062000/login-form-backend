

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

userRegisterSchema.pre("save", async function(next){
   
    if(this.isModified("password")){
        console.log(`Password before hashing is ${this.password}`)
        const passwordHashed = await bcrypt.hash(this.password,10);
        this.password = passwordHashed;
        console.log(`Password hash is ${this.password}`);
    }
    next();
})

const Register = new mongoose.model("Register",userRegisterSchema);
module.exports = Register;