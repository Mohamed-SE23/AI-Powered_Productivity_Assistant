import OtpModel from "../models/OtpModel.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "./emailService.js";
import { getOtpTemplate } from "./emails/templateService.js"; // Import the helper function

export const sendOtp = async (email) => { // FOR TESTING
  const otp = generateOtp();

  // Optionally, save OTP to the database:
  const newOtp = new OtpModel({ email, otp });
  await newOtp.save();

  // Define the email subject
  const subject = "Password Reset OTP";

  // Get the HTML template from the EmailTemplates folder with the OTP inserted.
  const html = await getOtpTemplate(otp);

  // Send the OTP email using the HTML template
  await sendEmail(email, subject, html);

  return otp;
};

export const verifyOtp = async (email, providedOtp) => {
  const otpRecord = await OtpModel.findOne({ email }).sort({ createdAt: -1 });

  if (!otpRecord) throw new Error("OTP not found. Please request again.");
  if (otpRecord.otp !== providedOtp) throw new Error("Invalid OTP.");

  return true;
};
