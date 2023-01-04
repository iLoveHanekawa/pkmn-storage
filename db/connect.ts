import mongoose from 'mongoose'

export const connectDb = async(uri: string) => {
    try {
        mongoose.set('strictQuery', true)
        await mongoose.connect(uri)
        console.log("Connected to database")
    } catch (error) {
        console.log(error);
    }
}