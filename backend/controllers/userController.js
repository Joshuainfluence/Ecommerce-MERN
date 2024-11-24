import validator from "validator";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import userModel from "../models/userModel.js";

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// ROUTE FOR USER LOGIN
const loginUser = async (req, res) => {
    try {

        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            res.json({ success: false, message: "User does not exist" });
        }
        //  the user.password is the password saved in the database and the password is the user's input
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: "Invalid credentials" })
        }

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ROUTE FOR USER REGISTRATION

const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        // CHECKING USER ALREADY EXISTs OR NOT
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exists" })
        }

        // VALIDATING EMAIL FORMAT AND STRONG PASSWORD
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })

        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })

        }

        // HASHING USER PASSWORD

        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save()

        const token = createToken(user._id)
        res.json({ success: true, token })

    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

// ROUTE FOR ADMIN LOGIN

const adminLogin = async (req, res) => {

}



export { loginUser, registerUser, adminLogin }