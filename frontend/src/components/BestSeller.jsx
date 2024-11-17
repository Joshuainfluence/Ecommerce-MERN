import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';
import ProductItem from './ProductItem';

const BestSeller = () => {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]);

    // now we have to find the best seller products and store them  
    useEffect(() => {
        const bestProduct = products.filter((item) => (item.bestseller));
        setBestSeller(bestProduct.slice(0, 5))
    }, [])
    return (
        <div className='my-10'>
            <div className='text-center text-3xl py-8'>
                <Title text1={'BEST'} text2={'SELLERS'} />
                <p className='w-3/4 m-auto text-xs sm:text-base text-gray-600'>
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem ea officia nulla tenetur eos odio adipisci, delectus suscipit neque doloremque, distinctio quisquam velit? Neque sit, a vel quae impedit quisquam.
                </p>
            </div>

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6 '>
                {
                    bestSeller.map((item, index)=>(
                        <ProductItem key={index} id={item._id} image={item.img} name={item.name} price={item.price}  />
                    ))
                }
            </div>

        </div>
    )
}

export default BestSeller