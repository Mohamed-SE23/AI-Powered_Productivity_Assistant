import nodemailer from "nodemailer";
import emailConfig from "../config/emailConfig.js";

const transporter = nodemailer.createTransport(emailConfig);

export const sendEmail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: emailConfig.auth.user, // This can be a friendly name or email address
      to,
      subject,
      html,  // Send the email as HTML
    });
    console.log(`Email sent to ${to}`);
    console.log("Message sent:", info.messageId);
    console.log("Accepted:", info.accepted);
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email.");
  }
};
