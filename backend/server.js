import express from 'express'
import dotenv from 'dotenv'

const app = express()
dotenv.config()

app.listen(process.env.PORT, (req, res) => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${process.env.PORT}`))