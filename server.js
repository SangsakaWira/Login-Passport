const express = require("express")
const mongoose = require("mongoose")
const passport = require("passport")
const flash    = require('connect-flash')
const LocalStrategy = require("passport-local")
const bodyParser = require("body-parser")
const session  = require('express-session')
const app = express()

const User = require("./models/user")

mongoose.connect("mongodb://localhost/codedirect-online",{
     useUnifiedTopology: true ,
     useNewUrlParser: true
})

app.use(session({
    secret:"yesman1223",
    resave:false,
    saveUninitialized:false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use(bodyParser.urlencoded({extended:true}))

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())

app.set("view engine","ejs")

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        return next()
    }
    res.redirect("/login")
}

app.get("/dashboard",isLoggedIn,(req,res)=>{
    User.findOne({username:req.user.username},(err,doc)=>{
        console.log(doc)
        res.render("dash",{user:doc})
    })
})

app.get("/login",(req,res)=>{
    res.render("auth")
})

app.post("/login",passport.authenticate("local",{
    failureRedirect:"/login",
    successRedirect:"/dashboard"
}))

app.post("/register",(req,res)=>{
    username = req.body.username
    password = req.body.password
    email = req.body.email
    console.log("Register Called")
    User.register(new User({username:username}),password,(err,user)=>{
        if(err){
            console.log(err)
            res.render("auth")
        }
        passport.authenticate("local")(req,res,()=>{
            res.redirect("/login")
        })
    })
})

app.get("/logout",(req,res)=>{
    req.logout()
    res.redirect("/login")
})


app.listen(3000,()=>{
    console.log("Server is running!")
})