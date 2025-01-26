export default {
    service: "Gmail",
    auth: {
      user: process.env.EMAIL_USER, // Add your email in .env
      pass: process.env.EMAIL_PASS, // Add your email password in .env
    },
  };
  