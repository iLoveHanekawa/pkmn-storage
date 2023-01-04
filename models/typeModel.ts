import mongoose from "mongoose";

const typeSchema = new mongoose.Schema({
    name: { type: String, required: true, enum: [  'Normal',
    'Fire',
    'Water',
    'Grass',
    'Electric',
    'Ice',
    'Fighting',
    'Poison',
    'Ground',
    'Flying',
    'Psychic',
    'Bug',
    'Rock',
    'Ghost',
    'Dragon',
    'Dark',
    'Steel',
    'Fairy'] }
})

export default mongoose.model('type', typeSchema)
