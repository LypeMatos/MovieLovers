import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
    admin: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    }
})

const Admin = mongoose.model("admin", adminSchema);

export default Admin;