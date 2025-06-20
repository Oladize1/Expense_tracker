import mongoose from 'mongoose'

export const connectDB = async (uri: string) => {
    try {
        await mongoose.connect(uri)
        console.log('database connect successfully');
    } catch (error) {
        console.log(error)
        throw new Error("error connecting database");
        
    }
}