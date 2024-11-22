import React from 'react'
import Title from '../components/Title'

const PlaceOrder = () => {
  return (
    <div className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t '>
      {/* -------- left side--------- */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>
        <div className='text-xl sm:text-2xl my-3 '>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" placeholder='First name' />
          <input className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last name' />

        </div>
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email address' />
        <input className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />

        </div>
        <div className='flex gap-3'>
          <input className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />

        </div>
        <input className='border border-gray-300 outline-none rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />


      </div>

      {/* -----right side */}
      
    </div>
  )
}

export default PlaceOrder