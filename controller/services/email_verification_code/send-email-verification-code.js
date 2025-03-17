import express from "express";
import nodemailer from "nodemailer";
import "dotenv/config";
import bcrypt from "bcrypt";
import pool from "../../dbpool.js";

const router = express.Router();

router.post("/send-email-verification-code", async (req, res) => {
  const { remittee } = req.body;

  const verificationCode = () => {
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  const code = verificationCode();

  try {
    const hashedCode = await bcrypt.hash(code, 10);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: remittee,
      subject: "Email verification.",
      text: `Your verification email code is: ${code}`,
    };

    const sent = await transporter.sendMail(mailOptions);

    if (sent) {
      res.status(200).json({
        success: true,
        message: "Email verification code has been sent.",
      });
      await pool
        .promise()
        .query("INSERT INTO email_verifications (email, code) VALUES (?, ?)", [
          remittee,
          hashedCode,
        ]);
    } else {
      res.status(400).json({
        success: false,
        message: "Email verification code was not sent.",
      });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({ success: false, error: "Internal server error." });
  }
});

export default router;
