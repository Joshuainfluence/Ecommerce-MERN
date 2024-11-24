

// FUNCTION FOR ADD PRODUCT

import { v2 as cloudinary } from "cloudinary"
import productModel from "../models/productModel.js"

const addProduct = async (req, res) => {
    // CREATE A MIDDLEWARE USING MULTER
    try {

        const { name, description, price, category, subCategory, sizes, bestseller } = req.body

        // -----I COMMENTED THE IMAGES BECAUSE FILES ONLY WORK ON THE PAID VERSION OF THUNDERCLIENT
        // -------BUT I UNCOMMENTED THEM NO LEVEL!

        const image1 = req.files.image1 && req.files.image1[0]
        const image2 = req.files.image2 && req.files.image2[0]

        const image3 = req.files.image3 && req.files.image3[0]
        const image4 = req.files.image4 && req.files.image4[0]


        const images = [image1, image2, image3, image4].filter((item) => item !== undefined)

        let imagesUrl = await Promise.all(
            images.map(async (item) => {
                let result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url
            })
        )

        const productData = {
            name,
            description,
            price: Number(price),
            image: imagesUrl,
            category,
            subCategory,
            bestseller: bestseller === "true" ? true : false,
            sizes: JSON.parse(sizes),
            date: Date.now()
        }

        console.log(productData);


        // console.log(name, description, price, category, subCategory, sizes, bestseller);
        // console.log(imagesUrl);

        const product = new productModel(productData)
        await product.save()
        res.json({ success: true, message: "Product added" })

        // res.json({})




    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })
    }
}

// FUNCTION FOR LIST PRODUCT

const listProducts = async (req, res) => {
    try {
        const products = await productModel.find({});
        res.json({ success: true, products })
    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })
    }
}

// FUNCTION FOR REMOVE PRODUCT

const removeProduct = async (req, res) => {
    try {

        await productModel.findByIdAndDelete(req.body.id)
        res.json({ success: true, message: "Product removed" })

    } catch (error) {
        console.log(error);

        res.json({ success: false, message: error.message })
    }
}

// FUNCTION FOR SINGLE PRODUCT INFO

const singleProduct = async (req, res) => {

}


export { addProduct, listProducts, removeProduct, singleProduct }