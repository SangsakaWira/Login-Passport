const passport = require("passport")
const User = require("../models/user")
const LocalStrategy = require('passport-local').Strategy
const bcrypt = require("bcryptjs")

exports.loginUser = (req,res)=>{
    res.send({
        message:"Login"
    })
}

exports.registerUser = (req,res)=>{
    
}