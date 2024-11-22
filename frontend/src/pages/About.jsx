import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import NewsLetter from '../components/NewsLetter'

const About = () => {
  return (
    <div>
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>
      <div className="my-6 flex flex-col md:flex-row gap-16">
        <img src={assets.about} className='w-full md:max-w-[450px] ' alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem temporibus ducimus ipsa qui ipsam obcaecati unde sunt eveniet nostrum laudantium eos, rerum ratione nam dolores repellat non iste quam culpa?
            Recusandae, dolorum aspernatur soluta magni at quisquam, ipsa aperiam dolor porro molestias perferendis blanditiis, repudiandae cumque molestiae sapiente incidunt nesciunt? Facilis repellat maxime perferendis, architecto necessitatibus consectetur quas rerum cumque!
          </p>
          <p> Dolorum tenetur molestiae obcaecati ullam, vitae odio non enim similique maiores quae consequuntur, nostrum soluta! Saepe porro rem sunt non corporis, recusandae eum neque ea dolorem delectus vel, nesciunt sapiente.</p>
          <b className="text-gray-800">
            Our Mission
          </b>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti, quis! Voluptatem delectus officiis, itaque consectetur accusamus minima dolorum nulla facilis sit? Aliquid reiciendis officiis nihil quo aperiam. Consectetur, ratione explicabo?</p>
        </div>
      </div>

      <div className="text-xl py-4 ">
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>
      <div className='flex flex-col md:flex-row text-sm mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Quality Assurance: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, esse! Aperiam explicabo doloremque dignissimos ullam sit optio dicta ratione? Magnam qui eaque cumque laudantium nostrum ipsa et accusantium, vitae doloribus.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Convenience: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, esse! Aperiam explicabo doloremque dignissimos ullam sit optio dicta ratione? Magnam qui eaque cumque laudantium nostrum ipsa et accusantium, vitae doloribus.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 '>
          <b>Essential: </b>
          <p className='text-gray-600'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Unde, esse! Aperiam explicabo doloremque dignissimos ullam sit optio dicta ratione? Magnam qui eaque cumque laudantium nostrum ipsa et accusantium, vitae doloribus.</p>
        </div>
      </div>

      <NewsLetter />
    </div>
  )
}

export default About