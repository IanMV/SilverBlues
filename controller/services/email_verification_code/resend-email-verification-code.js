import express from "express";
import pool from "../../dbpool.js";

const router = express.Router();

router.post("/resend-email-verification-code", async (req, res) => {
  const { email } = req.body;

  try {
    const [rows] = await pool
      .promise()
      .query("SELECT * FROM email_verifications WHERE email = ?", [email]);

    if (rows.length === 0) {
      res.status(200).json({
        success: true,
        message:
          "Email verification code not found in database. Sending email.",
        email: true,
      });
      return;
    }

    const { created_at } = rows[0];
    console.log(created_at);
    const expireTime = 1 * 60 * 1000;

    if (new Date() - new Date(created_at) < expireTime) {
      res.status(200).json({
        success: true,
        message: "The code was created 1 minute ago, the request must wait.",
        email: false,
      });
      return;
    } else {
      await pool
        .promise()
        .query("DELETE FROM email_verifications WHERE email = ?", [email]);

      res.status(200).json({
        success: true,
        message:
          "The old code was created more than a minute ago and will be deleted. A new email will be sent.",
        email: true,
      });
    }
  } catch (error) {
    if (typeof error === "string") return;

    console.error("Internal server error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error.",
      email: false,
    });
  }
});

export default router;
