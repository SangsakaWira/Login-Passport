const mongoose = require("mongoose")
const passportLocalMongoose = require("passport-local-mongoose")

const userSchema = new mongoose.Schema({
    username:String,
    email:String,
    password:String,
    package:{
        type:String,
        default:"Free"
    }
})

userSchema.plugin(passportLocalMongoose)

const user = mongoose.model("user",userSchema)

module.exports = user