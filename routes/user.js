const express = require("express")
const passport = require("passport")
const router = express.Router()

const userController = require("../controllers/user")

router.post("/login",userController.loginUser)
router.post("/register", passport.authenticate('local-signup', {
    successRedirect : '/dashboard', // redirect to the secure profile section
    failureRedirect : '/auth', // redirect back to the signup page if there is an error
    failureFlash : true // allow flash messages
}))

module.exports = router