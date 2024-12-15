import React from 'react';
import founder from '../../assets/founder1.jpg'

const About = () => {
    const team = [
        {
            name: 'Mohamed Alamen Isaac',
            role: 'Founder & Developer',
            bio: 'Passionate about leveraging AI to create smarter productivity solutions.',
            image: founder
        }
    ];

    return (
        <div className="container page-container bg-[#f5f5f5] mx-auto px-6 py-12 space-y-16">
            {/* Section Heading */}
            <div className="text-center space-y-4">
                <h1 className="text-5xl font-extrabold text-gray-800">About Us</h1>
                <p className="text-xl text-gray-600">
                    Empowering productivity with cutting-edge AI technology.
                </p>
            </div>

            {/* Story / Background */}
            <div className="space-y-8 text-center">
                <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
                <p className="text-lg text-gray-600 leading-relaxed">
                    Our journey began with a mission to help people stay focused and achieve their goals effortlessly. 
                    We realized that modern productivity tools needed a smarter, more personalized approach—and that's 
                    how <span className="font-bold text-[#1DD4CB]">AI-PPA</span> was born.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                    By leveraging the power of AI, we've created a solution to address common productivity challenges, 
                    making work smarter, faster, and more effective.
                </p>
            </div>

            {/* Vision and Mission */}
            <div className="grid grid-cols-2 md:grid-cols-1 gap-8">
                <div className="p-8 bg-white rounded-lg shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-800">Our Vision</h3>
                    <p className="text-lg text-gray-600 mt-4">
                        To transform the way people work and collaborate, making productivity effortless and enjoyable.
                    </p>
                </div>
                <div className="p-8 bg-white rounded-lg shadow-xl">
                    <h3 className="text-2xl font-bold text-gray-800">Our Mission</h3>
                    <p className="text-lg text-gray-600 mt-4">
                        To provide an AI-powered solution that simplifies your daily tasks, optimizes your time, and empowers 
                        you to focus on what truly matters.
                    </p>
                </div>
            </div>

            {/* Team Section */}
            <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-gray-800 text-center">Meet the Team</h2>
                <div className="flex flex-col items-center">
                    {team.map((member, index) => (
                        <div key={index} className="p-8 bg-white rounded-lg shadow-xl text-center max-w-md">
                            <img
                                src={member.image}
                                alt={member.name}
                                className="w-40 h-40 rounded-full mx-auto mb-6 object-cover"
                            />
                            <h3 className="text-xl font-bold text-gray-800">{member.name}</h3>
                            <p className="text-sm text-gray-500">{member.role}</p>
                            <p className="mt-4 text-gray-600 leading-relaxed">{member.bio}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Achievements Section */}
            <div className="space-y-8 bg-[#1DD4CB] py-12 rounded-lg text-white">
                <h2 className="text-3xl font-semibold text-center">Our Achievements</h2>
                <p className="text-lg text-center">
                    Since starting this project, we've built a tool that improves productivity for countless users.
                </p>
                <ul className="grid md:grid-cols-1 grid-cols-3 gap-6 px-6">
                    <li className="text-center p-6 bg-white text-[#1DD4CB] rounded-lg shadow-xl">
                        <h3 className="text-2xl font-bold">10+</h3>
                        <p className="mt-2">Features Developed</p>
                    </li>
                    <li className="text-center p-6 bg-white text-[#1DD4CB] rounded-lg shadow-xl">
                        <h3 className="text-2xl font-bold">1</h3>
                        <p className="mt-2">Dedicated Developer</p>
                    </li>
                    <li className="text-center p-6 bg-white text-[#1DD4CB] rounded-lg shadow-xl">
                        <h3 className="text-2xl font-bold">100%</h3>
                        <p className="mt-2">Commitment to Excellence</p>
                    </li>
                </ul>
            </div>

            {/* Contact Section */}
            <div className="space-y-8">
                <h2 className="text-3xl font-semibold text-gray-800 text-center">Get In Touch</h2>
                <p className="text-lg text-gray-600 text-center max-w-2xl mx-auto">
                    Have questions or want to learn more? Reach out and let's connect.
                </p>
                <div className="flex justify-center">
                    <button className="px-6 py-3 bg-[#2596DD] text-white rounded-md hover:bg-[#1DD4CB]">
                        Contact Us
                    </button>
                </div>
            </div>
        </div>
    );
};

export default About;
