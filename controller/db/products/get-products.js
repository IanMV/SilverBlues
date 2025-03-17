import pool from "../../dbpool.js";
import express from "express";

const router = express.Router();

router.post("/get-products", async (req, res) => {
  try {
    const [rows] = await pool.promise().query("SELECT * FROM products;");
    res.status(200).json({
      success: true,
      message: "Products found.",
      products: rows,
    });
  } catch (error) {
    console.error("Internal server error: ", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error.",
      products: undefined,
    });
  }
});

export default router;
