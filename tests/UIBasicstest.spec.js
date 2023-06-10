import {test, expect } from "@playwright/test";


test("Browser Context Playwright Test", async ({browser}) => {
    
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


/* test.only("Run only this test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Get title of page
    const title = await page.title();
    console.log(title);

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy")

});
 */



test("Locators and Methods Playwright test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Get title of page
    const title = await page.title();
    console.log(title);

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const username = page.locator("input#username");
    await username.type("rahulshettyacademy");

    await page.locator("input#password").type("learning123");

    await page.locator("input#signInBtn").click();

    console.log(await page.locator("[style*='block']").textContent());

    await expect(page.locator("[style*='block']")).toContainText("Incorrect");

    await page.close();

});



test("Valid Input test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Get title of page
    const title = await page.title();
    console.log(title);

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const username = page.locator("input#username");
    await username.type("rahulshettyacademy");

    const password = page.locator("input#password");
    await password.type("learning");

    const signIn = page.locator("input#signInBtn");
    await signIn.click();

    await page.close();

});

test("Multiple Elements Test", async ({page}) => {

    //https://rahulshettyacademy.com/client/auth/login
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const signIn = page.locator("input#signInBtn");
    const cardTitles = page.locator("h4.card-title a");

    await username.type("rahulshettyacademy");
    await password.type("learning");
    await signIn.click();

    //console.log(await cardTitles.first().textContent());
    //console.log(await cardTitles.last().textContent());
    //console.log(await cardTitles.nth(0).textContent());

    await page.waitForSelector("h4.card-title a");
    console.log(await cardTitles.allTextContents());

    await page.close();

});

test.only("UI Controls Test", async ({page}) => {

    //https://rahulshettyacademy.com/client/auth/login
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const username = page.locator("input#username");
    const password = page.locator("input#password");
    const signIn = page.locator("input#signInBtn");
    const dropdown = page.locator("select.form-control");
    const documentLink = page.locator("a[target='_blank']");
    const cardTitles = page.locator("h4.card-title a");

    await username.type("rahulshettyacademy");
    await password.type("learning");
    await dropdown.selectOption("consult");

    await page.locator("input[value='user']#usertype").click();
    await page.locator("button#okayBtn").click();
    //await page.pause();
    //Assertions
    await expect(page.locator("input[value='user']#usertype")).toBeChecked();
    console.log(await page.locator("input[value='user']#usertype").isChecked())

    await page.locator("input[name='terms']#terms").click();

    //Assertions
    await expect(page.locator("input[name='terms']#terms")).toBeChecked();
    console.log(await page.locator("input[name='terms']#terms").isChecked())

    await expect(documentLink).toHaveAttribute("class", "blinkingText");

    await signIn.click();

    await page.close();

});

test("Child Window Test", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");

    //Assertions
    await expect(page).toHaveTitle("LoginPage Practise | Rahul Shetty Academy");

    const documentLink = page.locator("a[target='_blank']");
 
    //Assertions
    await expect(documentLink).toHaveAttribute("class", "blinkingText");
    
    const [newPage] = await Promise.all(
        [
            context.waitForEvent('page'),
            documentLink.click(),
        ]
    )
    const text = await newPage.locator(".red").textContent();
    console.log(text);

    await page.close();

});