import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

const ProductItem = ({id,image,name,price}) => { 
    const { currency } = useContext(ShopContext);
    return (
        <Link className='text-gray-700 cursor-pointer' to={`/product/${id}`}>
            <div className='overflow-hidden'>
                <img src={image[0]} className='hover:scale-110 transition ease-in-out' alt="" />
            </div>
            <p className='pt-3 pb-1 text-sm'>{name}</p>
            <p className='text-sm font-medium'>{currency}{price}</p>
            {/* <button className='bg-black text-white py-2 px-3 w-full border rounded-full '>BUY THE GLOSS</button> */}
        </Link>
    )
}

export default ProductItem

 