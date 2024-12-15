import React from 'react';
import { landingPage } from '../data/data';

const Features = () => {
    const features = landingPage.Features;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Section Title */}
            <h1 className="text-4xl text-center font-bold mb-14 text-gray-900">
                Features
            </h1>

            {/* Cards Container */}
            <div className="grid grid-cols-4 sm:grid-cols-1 lg:grid-cols-2 gap-8">
                {features.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="flex flex-col items-center text-center bg-white shadow-lg rounded-lg p-6 hover:shadow-2xl transition-shadow duration-300"
                        >
                            {/* Image */}
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-[80px] w-auto mb-4"
                            />
                            {/* Title */}
                            <h1
                                className="text-[#333333] mb-2 text-xl font-semibold lg:text-lg"
                            >
                                {item.title}
                            </h1>
                            {/* Description */}
                            <p className="text-[#575757] md:text-sm leading-relaxed">
                                {item.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Features;
