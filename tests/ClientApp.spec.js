import {test, expect } from "@playwright/test";

test("Print Multiple Elements Text Test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/client");

    const username = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const signIn = page.locator("input#login");
    const cardTitles = page.locator("div.card-body > h5 > b");

    await username.type("anshika@gmail.com");
    await password.type("Iamking@000");
    await signIn.click();

    //DISCOURAGED --- This would wait until all the apis have loaded. 
    //await page.waitForLoadState('networkidle');  
    await page.waitForSelector("div.card-body > h5 > b");

    console.log(await cardTitles.allTextContents());

    await page.close();

});