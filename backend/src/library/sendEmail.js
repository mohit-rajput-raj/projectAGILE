import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const client = new MailtrapClient({ token: TOKEN });

export const sendEmail = async ({ to, subject, text }) => {
  try {
    const sender = {
      email: "rajputmohit19101169@demomailtrap.com",
      name: "AgilePRO Support",
    };

    const recipients = Array.isArray(to) 
      ? to.map(email => ({ email }))
      : [{ email: to }];

    const response = await client.send({
      from: sender,
      to: recipients,
      subject,
      text,
      category: "Integration Test",
    });

    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:', error);
    throw error;
  }
};

export const sendOTPEmail = async (email, otp) => {
  const emailContent = `
Your password reset OTP is: ${otp}

This OTP will expire in 10 minutes.
Please do not share this OTP with anyone.

If you didn't request this password reset, please ignore this email.

Best regards,
AgilePRO Team
`;

  return sendEmail({
    to: email,
    subject: "Password Reset OTP - AgilePRO",
    text: emailContent
  });
};