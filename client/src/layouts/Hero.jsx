import React from 'react';
import { useNavigate } from 'react-router-dom';
import hero from '../assets/hero.jpg';

const Hero = () => {
  const navigate = useNavigate();

  const handleGetStart = () => {
    navigate('/signup');
  }

  return (
    <div className="relative h-[100vh] w-full flex flex-col">
      {/* Background Image */}
      <img
        src={hero}
        alt="Hero Background"
        className="absolute object-cover h-full w-full"
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full items-center justify-center space-y-8 text-center">
        {/* Headline */}
        <div className="space-y-6 max-w-2xl">
          <h2 className="text-white sm:text-2xl text-4xl font-extrabold leading-tight">
            Boost Your Productivity with AI-Powered Insights
          </h2>
          <p className="text-[#f1f1f1] sm:text-lg text-xl leading-relaxed px-6">
            Simplify your workflow, stay organized, and achieve more in less time 
            with our cutting-edge assistant.
          </p>
        </div>

        {/* Button */}
        <button
          onClick={handleGetStart}
          className="px-4 py-1.5 text-lg font-semibold text-white bg-[#2596DD] rounded-full shadow-lg 
                     transition-transform transform hover:scale-105 hover:bg-[#1DD4CB] hover:shadow-xl"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default Hero;
