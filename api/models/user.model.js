import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true, 
    }, 
    avatar:{
        type: String,
        default: "https://cdn.pixabay.com/photo/2018/04/28/13/18/man-3357275_1280.png",
    },
}, 
    {timestamps: true}
);
const User = mongoose.model('User', userSchema);
export default User;