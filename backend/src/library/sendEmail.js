import { MailtrapClient } from "mailtrap";
import dotenv from "dotenv";
import { OTPhtml } from "./emailHtml.js";
import nodemailer from "nodemailer";

dotenv.config();

const TOKEN = process.env.MAILTRAP_TOKEN;
const client = new MailtrapClient({ token: TOKEN });

// export const sendEmail = async ({ sendTo, subject, html }) => {
//   try {
//     const sender = {
//       email: "collabcl@demomailtrap.com",
//       name: "MyCollab Support",
//     };
//     const recipients = Array.isArray(sendTo)
//       ? sendTo.map(email => ({ email }))
//       : [{ email: sendTo }];

//     const response = await client.send({
//       from: sender,
//       to: recipients,
//       subject,
//       html,
//       category: "Integration Test",
//     });

//     return { success: true, response };
//   } catch (error) {
//     console.error('Email sending failed:');
//     console.log(error);

//   }
// };

export const sendOTPEmail = async (email, otp, name) => {
  return sendEmailNode({
    sendTo: email,
    subject: "Password Reset OTP - MyCollab",
    html: OTPhtml.replace("{otp}", otp)
      .replace("{name}", name)
      .replace("{date}", new Date().toLocaleDateString()),
  });
};

export const sendEmailNode = async ({ sendTo, subject, html }) => {
  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      port: 465,
      secure: true,
      auth: {
        user: "13mohitrajput1692001.com@gmail.com",
        pass: "gpcu vnvm sfsa jadw",
      },
    });

    let mailOptions = {
      from: '"Maddison Foo Koch 👻" <13mohitrajput1692001.com@gmail.com>',
      to: sendTo,
      html: html,
      subject: subject,
    };

    let info = await transporter.sendMail(mailOptions);
    console.log("Email sent: " + info.response);
  } catch (error) {
    console.error("Error sending email:", error);
  }
};
