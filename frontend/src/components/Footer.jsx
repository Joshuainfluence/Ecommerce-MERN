import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <div>
        <div className='flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'>
            <div>
                <img src={assets.logo_icon} className='mb-5 w-32 ' alt="" />
                <p className='w-full md:w-2/3 text-gray-600 '>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Assumenda voluptatum vero placeat numquam harum laudantium aperiam voluptatibus, vitae architecto ea eius. Officiis molestiae, tempora ipsa aliquid animi ad fugit sint!</p>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>COMPANY </p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>Home</li>
                    <li>About us</li>
                    <li>Delivery</li>
                    <li>Privacy policy</li>

                </ul>
            </div>
            <div>
                <p className='text-xl font-medium mb-5'>GET IN TOUCH </p>
                <ul className='flex flex-col gap-1 text-gray-600'>
                    <li>+249221991922</li>
                    <li>contact@veecla.com</li>
                    

                </ul>
            </div>
        </div>
        <hr />
        <p className='py-5 text-sm text-center'>Copyright 2024 @veecla.com - All Right Reserved</p>
    </div>
  )
}

export default Footer