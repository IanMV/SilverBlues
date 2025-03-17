import { wait } from "../../wait.js";

import { sendEmailVerificationCode } from "./sendEmailVerificationCode.js";

import { emailValue } from "../../../view/store/EmailValue.js";
const email = emailValue();

import { messageRequireValue } from "../../../view/store/MessageRequireValue.js";
const messageRequire = messageRequireValue();

export async function codeExistenceCheck() {
  let reqMade = false;
  for (let reqAttempts = 0; reqAttempts < 3 && !reqMade; reqAttempts++) {
    try {
      let resMade = false;
      for (let resAttempts = 0; resAttempts < 5 && !resMade; resAttempts++) {
        const response = await fetch(
          "http://localhost:3000/email/code-existence-check",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email: email.email }),
          }
        );

        const data = await response.json();

        if (data.success) {
          reqMade = true;
          resMade = true;
          if (data.email) {
           return await sendEmailVerificationCode();
            
          } else {
            messageRequire.messageRequire.message =
              "*This email has already received an email verification code.";
            messageRequire.messageRequire.appear = true;

            return true;
          }
        }
      }
      if (!resMade) {
        messageRequire.messageRequire.message = "*An error occurred.";
        messageRequire.messageRequire.appear = true;
      }
    } catch (error) {
      console.error("Error:", error);
    }

    await wait(3000);
  }
  if (!reqMade) {
    messageRequire.messageRequire.message = "*An error occurred.";
    messageRequire.messageRequire.appear = true;
  }
}
