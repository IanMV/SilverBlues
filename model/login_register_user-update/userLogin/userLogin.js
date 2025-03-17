import { emailValue } from "../../../view/store/EmailValue";
const email = emailValue();

import { passwordValue } from "../../../view/store/PasswordValue";
const password = passwordValue();

import { wait } from "../../wait";

import { messageRequireValue } from "../../../view/store/MessageRequireValue";
const messageRequire = messageRequireValue();

import { userInformationValue } from "../../../view/store/UserInformationValue";
const userInformation = userInformationValue();

import { isLoggedValue } from "../../../view/store/LoginBooleanValue";
const isLogged = isLoggedValue();

export async function userLogin() {
  let reqMade = false;
  for (let reqAttempts = 0; reqAttempts < 3 && !reqMade; reqAttempts++) {
    try {
      let resMade = false;
      for (let resAttempts = 0; resAttempts < 5 && !resMade; resAttempts++) {
        const response = await fetch("http://localhost:3000/user/user-login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: email.email,
            password: password.password,
          }),
        });

        const data = await response.json();

        if (data.success) {
          if (data.login) {
            resMade = true;
            reqMade = true;
            messageRequire.messageRequire.appear = false;
            userInformation.name = data.name;
            userInformation.email = data.email;
            isLogged.isLogged = true;
            return true;
          } else {
            messageRequire.messageRequire.message =
              "*Email our password invalid.";
            messageRequire.messageRequire.appear = true;
            return;
          }
        }
      }
      if (!resMade) {
        messageRequire.messageRequire.appear = true;
        messageRequire.messageRequire.message = "*An error occurred.";
      }
    } catch (error) {
      console.error("An error occurred.:", error);
    }

    await wait(3000);
  }
  if (!reqMade) {
    messageRequire.messageRequire.appear = true;
    messageRequire.messageRequire.message = "*An error occurred.";
  }
}
