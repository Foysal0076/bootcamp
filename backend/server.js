import express from 'express'
import colors from 'colors'
import dotenv from 'dotenv'
import conenctDB from './config/db.js'
import bootcampRoutes from './routes/bootcampRoutes.js'
import errorHandler from './middleware/ErrorHandler.js'

const app = express()
dotenv.config()
conenctDB()

//Middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/api/v1/bootcamps', bootcampRoutes)

//Error Handling
app.use(errorHandler)

app.listen(process.env.PORT, (req, res) => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`.yellow.bold))