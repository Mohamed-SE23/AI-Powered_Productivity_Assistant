import React from 'react'
import Hero from '../../layouts/Hero'
import Benefits from '../../layouts/Benefits'
import Vision from '../../layouts/Vision'
import Features from '../../layouts/Features'
import Footer from '../../layouts/Footer'

const Home = () => {
  return (
    <div className='bg-[#f5f5f5]'>
      <Hero />
      <Vision />
      <Features />
      <Benefits />
      <Footer />
    </div>
  )
}

export default Home;
