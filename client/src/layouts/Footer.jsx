import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1DD4CB] to-[#2596DD] text-white py-8">
      <div className="container max-w-lg mx-auto px-4">
        {/* Top Section */}
        <div className="flex md:flex-col justify-between items-start md:items-center gap-8">
          {/* Quick Links */}
          <div className="flex flex-col md:text-center text-left">
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="hover:text-gray-200 transition">
                  Home
                </a>
              </li>
              <li>
                <a href="#features" className="hover:text-gray-200 transition">
                  Features
                </a>
              </li>
              <li>
                <a href="#pricing" className="hover:text-gray-200 transition">
                  Pricing
                </a>
              </li>
              <li>
                <a href="#blog" className="hover:text-gray-200 transition">
                  Blog
                </a>
              </li>
              <li>
                <a href="#contact" className="hover:text-gray-200 transition">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div className="text-center">
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex md:justify-center justify-start gap-6 text-2xl">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition"
              >
                <FaTwitter />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition"
              >
                <FaLinkedinIn />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-gray-200 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-8 text-center border-t border-white pt-4">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} AI-Powered Productivity Assistant. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
