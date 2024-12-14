import React from 'react';
import hero from '../../../assets/hero.jpg';

const Hero = () => {
  return (
    <>
   
    <div className='relative h-[100vh] w-auto flex flex-col'>
      <img src={hero} alt="img/hero" className='absolute h-full w-auto' />
      <div className='absolute top-0 bottom-0 right-0 left-0 bg-black opacity-40'></div>
      <div className='flex flex-col h-screen items-center justify-center space-y-6 z-50'>
        <div className='flex-col space-y-4 w-3/5 text-center'>
            <h2 className='text-[#f1f1f1] text-3xl font-bold'>Boost Your Productivity with AI-Powered Insights</h2>
            <p className='text-[#f1f1f1] text-2xl px-16'>
                Simplify your workflow, stay organized, and achieve more
                in less time with our cutting-edge assistant.
            </p>
        </div>
        <button className='text-white font-semibold px-4 py-1 border-2 rounded-full'>
            Get Started
        </button>
      </div>
      </div>
    </>
  )
}

export default Hero
