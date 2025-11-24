/* eslint-disable @typescript-eslint/no-unused-vars */
import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import dotenv from "dotenv";

// Load .env variables
dotenv.config();

export const createTransporter = () => {
  const options: SMTPTransport.Options = {
    host: process.env.SMTP_HOST!,
    port: Number(process.env.SMTP_PORT || 587),
    secure: false, // IMPORTANT → must be false for port 587
    auth: {
      user: process.env.SMTP_USER!,
      pass: process.env.SMTP_PASS!,
    },
    tls: {
      rejectUnauthorized: false, // IMPORTANT → Gmail STARTTLS
    },
    connectionTimeout: 20000,
    greetingTimeout: 20000,
    socketTimeout: 20000,
  };

  const transporter = nodemailer.createTransport(options);

  // Test the SMTP connection
  transporter.verify((error, success) => {
    if (error) {
      console.error("❌ SMTP connection test failed:", error);
    } else {
      console.log("✅ SMTP connection test successful");
    }
  });

  console.log("Created transporter with host:", process.env.SMTP_HOST);
  console.log("Using port:", process.env.SMTP_PORT);

  return transporter;
};
