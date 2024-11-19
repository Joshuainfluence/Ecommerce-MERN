import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {
    const { search, setSearch, showSearch, setShowSearch } = useContext(ShopContext);
    const [visible, setVisible] = useState(false)
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection')) {
            setVisible(true)
        } else {
            setVisible(false)
        }
    }, [location])
    return showSearch && visible ? (
        <div className='border-t border-b bg-gray-50 text-center'>
            <div className='inline-flex item-center justify-center border border-gray-400 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2 '>
                <input className='flex-1 outline-none bg-inherit text-sm' value={search} onChange={(e) => setSearch(e.target.value)} type="text" name="" placeholder='Search' id="" />
                <img src={assets.search_icon} className='w-5' alt="" />
            </div>
            <img onClick={() => setShowSearch(false)} src={assets.close2} className='inline w-5 cursor-pointer' alt="" />
        </div>
    ) : null
}

export default SearchBar