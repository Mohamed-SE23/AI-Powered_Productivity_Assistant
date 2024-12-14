import React from 'react';
import { landingPage } from '../../../data/data';

const Benefits = () => {
    const benefits = landingPage.Benefits;

    return (
        <div className="container mx-auto px-4 py-8">
            {/* Section Title */}
            <h1 className="text-4xl text-center font-bold mb-14 text-gray-900">
                Why Choose Us
            </h1>

            {/* Cards Container */}
            <div className="flex flex-col items-center justify-center gap-8">
                {benefits.map((item, i) => {
                    return (
                        <div
                            key={i}
                            className="flex max-w-3xl md:flex-col flex-row md:items-center items-start bg-white shadow-md rounded-lg p-6 gap-6 hover:shadow-lg transition-shadow duration-300"
                        >
                            {/* Image */}
                            <img
                                src={item.img}
                                alt={item.title}
                                className="h-[120px] w-auto object-contain flex-shrink-0"
                            />
                            {/* Text Content */}
                            <div className="flex flex-col justify-center md:text-center text-left">
                                <h1
                                    className="text-[#333333] mb-2 text-xl font-semibold lg:text-lg"
                                >
                                    {item.title}
                                </h1>
                                <p className="text-[#575757] md:text-sm leading-relaxed">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Benefits;
