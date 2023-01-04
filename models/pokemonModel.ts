import mongoose from "mongoose";

const pokemonSchema = new mongoose.Schema({
    typeId: { type: String, required: true },
    name: { type: String, required: true },
    trainerId: { type: String, requrired: true },
    level: { type: Number, default: 5 },
})

export default mongoose.model('pokemon', pokemonSchema)
