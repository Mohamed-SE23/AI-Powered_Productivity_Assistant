import nodemailer from "nodemailer";
import emailConfig from "../config/emailConfig.js";

const transporter = nodemailer.createTransport(emailConfig);

export const sendEmail = async (to, subject, text) => {
  try {
    await transporter.sendMail({
      from: emailConfig.auth.user,
      to,
      subject,
      text,
    });
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
