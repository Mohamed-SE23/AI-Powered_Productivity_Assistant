export default {
    service: "Gmail",
    host: 'mx.mailslurp.com',
    port: '2525',
    secure: false,
    auth: {
      user: process.env.EMAIL_USER, // Add your email in .env
      pass: process.env.EMAIL_PASS, // Add your email password in .env
    },
  };
  