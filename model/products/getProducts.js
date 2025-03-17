import { wait } from "../wait";

import { messageRequireValue } from "../../view/store/MessageRequireValue";
const messageRequire = messageRequireValue();

export async function getProducts(category) {
  let reqMade = false;
  for (let reqAttempts = 0; reqAttempts < 3 && !reqMade; reqAttempts++) {
    try {
      let resMade = false;
      for (let resAttempts = 0; resAttempts < 5 && !resMade; resAttempts++) {
        const response = await fetch(
          "http://localhost:3000/products/get-products",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              category: category,
            }),
          }
        );

        const data = await response.json();

        if (data.success) {
          reqMade = true;
          resMade = true;
          return data.products;
        }
      }
      if (!resMade) {
        messageRequire.messageRequire.appear = true;
        messageRequire.messageRequire.message = "*An error occurred.";
        return;
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
