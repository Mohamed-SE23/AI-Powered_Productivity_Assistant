import dotenv from 'dotenv';

dotenv.config();

console.log("Email user:", process.env.EMAIL_USER);
console.log("Email pass:", process.env.EMAIL_PASS);

export default {
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER, // Add your email in .env
      pass: process.env.EMAIL_PASS, // Add your email password in .env
    },
  };
  