import express from "express";
import pool from "../../dbpool.js";

const router = express.Router();

router.post("/code-existence-check", async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await pool
      .promise()
      .query("SELECT email FROM email_verifications WHERE email = ?", [email]);

    if (rows.length === 0) {
      res.status(200).json({
        success: true,
        message:
          "Email verification code not found in database, email will be sent.",
        email: true,
      });
    } else {
      res.status(200).json({
        success: true,
        message:
          "Email verification code was found in database, email will not be sent.",
        email: false,
      });
    }
  } catch (error) {
    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      email: false,
    });
  }
});

export default router;
