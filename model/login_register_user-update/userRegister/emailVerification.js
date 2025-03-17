import { wait } from "../../wait.js";

import { codeValue } from "../../../view/store/CodeValue.js";
const code = codeValue();

import { emailValue } from "../../../view/store/EmailValue.js";
const email = emailValue();

import { messageRequireValue } from "../../../view/store/MessageRequireValue.js";
const messageRequire = messageRequireValue();

export async function emailVerification() {
  let reqMade = false;
  for (let reqAttempts = 0; reqAttempts < 3 && !reqMade; reqAttempts++) {
    try {
      let resMade = false;
      for (let resAttempts = 0; resAttempts < 5 && !resMade; resAttempts++) {
        const response = await fetch(
          "http://localhost:3000/email/email-verification",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              email: email.email,
              code: code.codeString,
            }),
          }
        );
        const data = await response.json();

        if (data.success) {
          resMade = true;
          reqMade = true;
          if (!data.found && !data.valid && !data.code) {
            messageRequire.messageRequire.message =
              "*The code does not exist, please send the email.";
            messageRequire.messageRequire.appear = true;

            return;
          }
          if (data.found && !data.valid && !data.code) {
            messageRequire.messageRequire.message =
              "*Expired code, please resend email.";
            messageRequire.messageRequire.appear = true;

            return;
          }
          if (data.found && data.valid && !data.code) {
            messageRequire.messageRequire.message = "*Invalid code.";
            messageRequire.messageRequire.appear = true;

            return;
          }
          if (data.found && data.valid && data.code) {
            messageRequire.messageRequire.appear = false;
            messageRequire.messageRequire.message = undefined;

            return true;
          }
        }
      }
      if (!resMade) {
        messageRequire.messageRequire.message = "*An error occurred.";
        messageRequire.messageRequire.appear = true;

        return;
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
