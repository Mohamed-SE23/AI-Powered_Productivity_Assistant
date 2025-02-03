import fs from 'fs/promises';
import path from 'path';

/**
 * Loads the OTP email template, replacing placeholders with actual values.
 * @param {string} otp - The OTP code to insert into the template.
 * @returns {Promise<string>} - The finalized HTML string.
 */
export const getOtpTemplate = async (otp) => {
  // Construct the full path to the template file.
  const filePath = path.join(process.cwd(), 'emailTemplates', 'otpVerification.html');
  
  // Read the file content.
  let template = await fs.readFile(filePath, 'utf8');

  // Replace placeholders with dynamic values.
  template = template.replace('{{otp}}', otp);
  template = template.replace('{{year}}', new Date().getFullYear());

  return template;
};
