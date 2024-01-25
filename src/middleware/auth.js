const jwt = require("jsonwebtoken");
const Register = require("../models/register");

const auth = async(req,res,next) => {
  try {
    const token = req.cookies.jwt;
    const result = jwt.verify(token, process.env.SECRET_KEY);
    //console.log(result);
    const user = await Register.findOne({_id:result._id})
    console.log({"username is ":user.firstname});
    next();
  } catch (error) {
    console.log(error);
    res.status(500).send({ error});
  }
};

module.exports = auth;
