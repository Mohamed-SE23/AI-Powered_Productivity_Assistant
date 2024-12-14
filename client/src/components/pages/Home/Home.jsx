import React from 'react'
import Navbar from './Navbar'
import Hero from './Hero'
import Vision from './Vision'
import Features from './Features'
import Benefits from './Benefits'

const Home = () => {
  return (
    <div className='bg-[#f5f5f5]'>
      <Navbar />
      <Hero />
      <Vision />
      <Features />
      <Benefits />
    </div>
  )
}

export default Home;
