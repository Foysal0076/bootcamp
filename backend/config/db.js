import mongoose from 'mongoose'
import colors from 'colors'
const conenctDB = async () => {
    try {
        const dbConnection = await mongoose.connect(process.env.MONGO_URI, {
            useCreateIndex: true,
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log(`MongoDB connected ${dbConnection.connection.host}`.cyan.underline)
    } catch (error) {
        console.log(`Error: ${error.message}`.red.underline.bold)
    }
}

export default conenctDB