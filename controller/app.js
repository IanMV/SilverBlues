import express from "express";
import sendEmailVerificationCode from "./services/email_verification_code/send-email-verification-code.js";
import codeExistenceCheck from "./services/email_verification_code/code-existence-check.js";
import emailVerification from "./services/email_verification_code/email-verification.js";
import resendEmailVerificationCode from "./services/email_verification_code/resend-email-verification-code.js";
import userRegister from "./db/login_register_user-update/user-register.js";
import userLogin from "./db/login_register_user-update/user-login.js";
import getProducts from "../controller/db/products/get-products.js";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/email", sendEmailVerificationCode);
app.use("/email", codeExistenceCheck);
app.use("/email", emailVerification);
app.use("/email", resendEmailVerificationCode);
app.use("/user", userRegister);
app.use("/user", userLogin);
app.use("/products", getProducts)

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running in port: ${PORT}`);
});
