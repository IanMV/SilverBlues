import express from "express";
import pool from "../../dbpool.js";
import { UserRegisterConstruct } from "../../../model/login_register_user-update/registerUserConstructor.js";

const router = express.Router();

router.post("/user-register", async (req, res) => {
  const { email, name, password } = req.body;

  try {
    const user = new UserRegisterConstruct(name, email, password);
    await pool
      .promise()
      .query("INSERT INTO users (name, email, password) VALUES ( ?, ?, ?)", [
        user.name,
        user.email,
        user.password,
      ]);

    res
      .status(200)
      .json({ success: true, message: "User registered in database." });
  } catch (error) {
    console.error("Internal server error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal server error." });
  }
});

export default router;
