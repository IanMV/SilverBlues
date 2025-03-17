import { wait } from "../../wait.js";

import { sendEmailVerificationCode } from "./sendEmailVerificationCode";

import { emailValue } from "../../../view/store/EmailValue";
const email = emailValue();

import { messageRequireValue } from "../../../view/store/MessageRequireValue";
const messageRequire = messageRequireValue();

export async function resendEmailVerificationCode() {
  let reqMade = false;
  for (let reqAttempts = 0; reqAttempts < 3 && !reqMade; reqAttempts++) {
    try {
      let resMade = false;
      for (let resAttempts = 0; resAttempts < 5 && !resMade; resAttempts++) {
        const response = await fetch(
          "http://localhost:3000/email/resend-email-verification-code",
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
            messageRequire.messageRequire.appear = true;
            messageRequire.messageRequire.message =
              "*A code was sent less than a minute ago. Please wait until you request another one.";
            return;
          }
        }
      }
      if (!resMade) {
        messageRequire.messageRequire.appear = true;
        messageRequire.messageRequire.message = "*An error occurred.";
      }
    } catch (error) {
      console.error("Error:", error);
    }

    await wait(3000);
  }
  if (!reqMade) {
    messageRequire.messageRequire.appear = true;
    messageRequire.messageRequire.message = "*An error occurred.";
  }
}
