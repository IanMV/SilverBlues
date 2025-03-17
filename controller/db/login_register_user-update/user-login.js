import express from "express";
import pool from "../../dbpool.js";
import bcrypt from "bcrypt";

const router = express.Router();

router.post("/user-login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const [rows] = await pool
      .promise()
      .query("SELECT name, email, password FROM users WHERE email = ?", [
        email,
      ]);

    if (rows.length === 0) {
      res.status(200).json({
        success: true,
        message: "Unsuccessful login.",
        login: false,
        name: undefined,
        email: undefined,
      });
    }

    const user = rows[0];
    if (
      (await bcrypt.compare(password, user.password))) {
      res.status(200).json({
        success: true,
        message: "Successful login.",
        login: true,
        name: user.name,
        email: user.email,
      });
    } else {
      res.status(200).json({
        success: true,
        message: "Unsuccessful login.",
        login: false,
        name: undefined,
        email: undefined,
      });
    }
  } catch (error) {
    console.error("Internal server error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      login: false,
      name: undefined,
      email: undefined,
    });
  }
});

export default router;
