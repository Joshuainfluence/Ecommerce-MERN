import express from 'express'

import {placeOrderFlutterwave, verifyFlutterwave, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus, verifyStripe } from '../controllers/orderController.js'
import adminAuth from '../middleware/adminAuth.js'
import authUser from '../middleware/auth.js'

const orderRouter = express.Router()


// admin features
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateStatus)

// payment features

orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/flutterwave', authUser, placeOrderFlutterwave)

orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

// user feature
orderRouter.post('/userorders', authUser, userOrders)


// verify payment
orderRouter.post('/verifystripe', authUser, verifyStripe)

orderRouter.post('/verifyflutterwave', authUser, verifyFlutterwave)




export default orderRouter





