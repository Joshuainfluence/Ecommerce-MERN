import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'

// App config

const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

// MIDDDLEWARES

app.use(express.json())
app.use(cors())

// API ENDPOINTS

app.use('/api/user',userRouter)
app.use('/api/product', productRouter)

app.get('/', (req, res) => {
    res.send("API working")
    // WHENEVER THE PORT 4000 IS OPENED IT SHOULD DISPLAY API WORKING
})

// START THE ExPRESS SERVER
app.listen(port, ()=> console.log('Server Started on PORT : ' + port))