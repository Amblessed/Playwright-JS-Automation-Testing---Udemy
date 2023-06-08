import {test, expect } from "@playwright/test";


test("First Playwright Test", async ({browser}) => {
    
    //browser is a global fixture
    const context = await browser.newContext();    //Open new instance of the browser in private mode

    //create a new page
    const page = await context.newPage(); 


    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});


//If there is no need for configurations of cookies etc, then we can directly call page
test("Page Playwright Test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

});


test.only("Run only this test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Get title of page
    const title = await page.title();
    console.log(title);

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")
    


});