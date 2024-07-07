import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
    username : {
        type : String,
        required : [true,"please provide a user name"],
        unique : [true,"user name should be unique"]
    }
})