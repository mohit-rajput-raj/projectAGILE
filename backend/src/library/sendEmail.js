import { MailtrapClient } from "mailtrap";
import dotenv from 'dotenv';
import { OTPhtml} from './emailHtml.js';
dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const client = new MailtrapClient({ token: TOKEN });

export const sendEmail = async ({ sendTo, subject, html }) => {
  try {
    const sender = {
      email: "collabcl@demomailtrap.com",
      name: "MyCollab Support",
    };
    //  const recipients =[
    //   {
    //     email: sendTo,
    //   }
    // ];
    // const recipients =[
    //   {
    //     email: "",
    //   }
    // ];
    const recipients = Array.isArray(sendTo)
      ? sendTo.map(email => ({ email }))
      : [{ email: sendTo }];

    const response = await client.send({
      from: sender,
      to: recipients,
      subject,
      html,
      category: "Integration Test",
    });

    return { success: true, response };
  } catch (error) {
    console.error('Email sending failed:');
    console.log(error);
    
    // throw error;
  }
};

export const sendOTPEmail = async (email, otp, name) => {
  

  return sendEmail({
    sendTo: email,
    subject: "Password Reset OTP - MyCollab",
    html: OTPhtml.replace("{otp}", otp).replace("{name}", name).replace("{date}", new Date().toLocaleDateString()),
  });
};