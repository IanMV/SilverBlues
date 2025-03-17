import { emailValue } from "../../../view/store/EmailValue";
const email = emailValue();

import { passwordValue } from "../../../view/store/PasswordValue";
const password = passwordValue();

import { wait } from "../../wait.js"

import { messageRequireValue } from "../../../view/store/MessageRequireValue";
const messageRequire = messageRequireValue();

import { nameValue } from "../../../view/store/NameValue";
const name = nameValue();

export async function userRegister() {
  let reqMade = false;
  for (let reqAttempts = 0; reqAttempts < 3 && !reqMade; reqAttempts++) {
    try {
      let resMade = false;
      for (let resAttempts = 0; resAttempts < 5 && !resMade; resAttempts++) {
        const response = await fetch(
          "http://localhost:3000/user/user-register",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: email.email,
              password: password.password,
              name: name.name,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          password.password = "";
          email.email = "";
          name.name = "";
          messageRequire.messageRequire.appear = false;

          return true;
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
