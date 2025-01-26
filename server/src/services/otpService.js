import OtpModel from "../models/OtpModel.js";
import { generateOtp } from "../utils/generateOtp.js";
import { sendEmail } from "./emailService.js";

export const sendOtp = async (email) => {
  const otp = generateOtp();

  // Save OTP in the database
  const newOtp = new OtpModel({ email, otp });
  await newOtp.save();

  // Send OTP via email
  const subject = "Password Reset OTP";
  const text = `Your OTP for password reset is: ${otp}. It will expire in 5 minutes.`;
  await sendEmail(email, subject, text);

  return otp;
};

export const verifyOtp = async (email, providedOtp) => {
  const otpRecord = await OtpModel.findOne({ email }).sort({ createdAt: -1 });

  if (!otpRecord) throw new Error("OTP not found. Please request again.");
  if (otpRecord.otp !== providedOtp) throw new Error("Invalid OTP.");

  return true;
};
