// import { currency } from "../../admin/src/App.jsx";
import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe'
import Flutterwave from 'flutterwave-node-v3'

// global variable
const currency = 'usd'
const deliveryCharge = 10



// gateway initialize
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const flw = new Flutterwave(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY)
console.log(process.env.FLUTTERWAVE_PUBLIC_KEY, process.env.FLUTTERWAVE_SECRET_KEY)


// placing orders using cash on delivery method
const placeOrder = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "COD",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// placing orders using stripe method
const placeOrderStripe = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body;
        const { origin } = req.headers
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item,) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name

                },
                unit_amount: item.price * 100

            },
            quantity: item.quantity

        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges'

                },
                unit_amount: deliveryCharge * 100

            },
            quantity: 1

        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',


        })

        res.json({ success: true, session_url: session.url })
        // await userModel.findByIdAndUpdate(userId, {cartData: {}})

        // res.json({success: true, message: "Order Placed"})




    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// verify stripe
const verifyStripe = async (req, res) => {
    const { orderId, success, userId } = req.body

    try {
        if (success === "true") {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true })
        } else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false })
        }
    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


const placeOrderFlutterwave = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body
        const { origin } = req.headers

        // create an order in the database
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Flutterwave',
            date: Date.now()
        };

        const newOrder = new orderModel(orderData)
        await newOrder.save()



        // calculate delivery charge
        const totalAmount = amount + deliveryCharge;

        // prepare flutterwave payment data
        const payload = {
            tx_ref: `tx-${Date.now()}-${newOrder._id}`, //unique transaction reference
            amount: req.body.amount,
            currency: currency.toUpperCase(),
            redirect_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            customer: {
                email: req.body.address.email,
                phonenumber: req.body.address.phone,
                name: `${req.body.address.firstName} ${req.body.address.lastName}`,
            },
            customizations: {
                title: 'Order payment',
                description: 'Payment for items in cart',
            }
        };
        // initialize payment using Flutterwave
        const response = await flw.PaymentLinks.create(payload);
        console.log("Response: ", response)

        // respond with payment link
        if (response.status === 'success') {
            res.json({ success: true, session_url: response.data.link });
        } else {
            res.status(400).json({ success: false, message: response.message });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}

const verifyFlutterwave = async (req, res) => {
    const { orderId, transaction_id } = req.body;

    try {
        // Verify the transaction
        const response = await flw.Transaction.verify({ id: transaction_id });

        if (response.data.status === "successful") {
            // Update order status to paid
            await orderModel.findByIdAndUpdate(orderId, { payment: true });
            await userModel.findByIdAndUpdate(response.data.userId, { cartData: {} });
            res.json({ success: true, message: "Payment successful!" });
        } else {
            // If payment fails, delete the order
            await orderModel.findByIdAndDelete(orderId);
            res.json({ success: false, message: "Payment failed!" });
        }
    } catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
};

// placing orders using razorpay method
const placeOrderRazorpay = async (req, res) => {

}

// All orders data for admin panel
const allOrders = async (req, res) => {
    try {
        const orders = await orderModel.find({})
        res.json({ success: true, orders })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}

// user order data for frontend
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}

// update order status from admin panel
const updateStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

export {placeOrderFlutterwave, verifyFlutterwave, verifyStripe, placeOrder, placeOrderStripe, placeOrderRazorpay, allOrders, userOrders, updateStatus }