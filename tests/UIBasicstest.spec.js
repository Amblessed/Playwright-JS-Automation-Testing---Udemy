import {test } from "@playwright/test";


test.only("First Playwright Test", async ({browser}) => {
    
    //chrome --> plugins / cookies
    //open a fresh instance in private mode
    const context = await browser.newContext();

    //create a new page
    const page = await context.newPage(); 

    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});



test("Page Playwright Test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});