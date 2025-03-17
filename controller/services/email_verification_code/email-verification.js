import express from "express";
import bcrypt from "bcrypt";
import pool from "../../dbpool.js";

const router = express.Router();

router.post("/email-verification", async (req, res) => {
  const { email, code } = req.body;

  try {
    const [rows] = await pool
      .promise()
      .query(
        "SELECT code, created_at FROM email_verifications WHERE email = ?",
        [email]
      );

    if (rows.length === 0) {
      return res.status(200).json({
        success: true,
        message: "Email verification code not found in database.",
        found: false,
        valid: false,
        code: false,
      });
    }
    const { created_at } = rows[0];

    const expireTime = 3 * 60 * 1000;

    if (new Date() - new Date(created_at) > expireTime) {
      await pool
        .promise()
        .query("DELETE FROM email_verifications WHERE email = ?", [email]);
      return res.status(200).json({
        success: true,
        message: "The code has expired.",
        found: true,
        valid: false,
        code: false,
      });
    }

    const { code: hashedCode } = rows[0];

    const isValid = await bcrypt.compare(code, hashedCode);

    if (isValid) {
      await pool
        .promise()
        .query("DELETE FROM email_verifications WHERE email = ?", [email]);
      return res.status(200).json({
        success: true,
        message: "Email has been verified.",
        found: true,
        valid: true,
        code: true,
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Invalid code.",
        found: true,
        valid: true,
        code: false,
      });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      code: false,
      found: false,
      valid: false,
    });
  }
});

export default router;
