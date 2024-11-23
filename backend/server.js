import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'

// App config

const app = express()
const port = process.env.PORT || 4000
connectDB()

// MIDDDLEWARES

app.use(express.json())
app.use(cors())

// API ENDPOINTS

app.get('/', (req, res) => {
    res.send("API working")
    // WHENEVER THE PORT 4000 IS OPENED IT SHOULD DISPLAY API WORKING
})

// START THE ExPRESS SERVER
app.listen(port, ()=> console.log('Server Started on PORT : ' + port))