import mongoose from "mongoose";

const trainerSchema = new mongoose.Schema({
    name: { type: String, required: true },
    badges: { type: Number, default: 0 },
})

export default mongoose.model('trainer', trainerSchema)
