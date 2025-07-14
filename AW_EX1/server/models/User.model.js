import mongoose from "mongoose";

const useSchema = new mongoose.Schema({
    name:{
        type: String,
        required : true
    },
    email:{
        type: String,
        required : true
    },
    role:{
        type: String,
        enum:["admin","user"],
        default:"user"
    },
    password:{
        type: String,
        required: true
    }
})

export const User = mongoose.model('Ex1User',useSchema)
// export default User;