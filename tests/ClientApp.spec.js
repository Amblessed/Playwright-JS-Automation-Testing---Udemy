import {test, expect } from "@playwright/test";

test("Print Multiple Elements Text Test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/client");

    const username = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const signIn = page.locator("input#login");
    const email = "anshika@gmail.com";

    const products = page.locator("div.card-body");
    const productName = "zara coat 3";

    await username.type(email);
    await password.type("Iamking@000");
    await signIn.click();

    //DISCOURAGED --- This would wait until all the apis have loaded. 
    //await page.waitForLoadState('networkidle');  
    await page.waitForSelector("div.card-body > h5 > b");

    //console.log(await cardTitles.allTextContents());
    const count = await products.count();
    for(let i = 0; i < count; i++)
    {
        if(await products.nth(i).locator("b").textContent() === productName)
        {
            await products.nth(i).locator("text= Add To Cart").click();
            break;
        }
    }

    await page.locator("button[routerlink='/dashboard/cart']").click();

    await page.locator("div[class='cart'] ul").waitFor();

    const cartProducts = page.locator("div[class='cartSection'] h3");
    const countCart = await cartProducts.count();
    for(let i = 0; i < countCart; i++)
    {
        if(await cartProducts.nth(i).textContent() === productName)
        {
            console.log("Test Passed");
            expect(true).toBeTruthy();
            break;
        }
    }

    await page.locator("ul [type='button'][class='btn btn-primary']").click();

    await page.locator("div[class='field small'] input[class='input txt']").type("475");
    await page.locator("div[class='field'] input[class='input txt']").type("John");
    await page.locator("[placeholder='Select Country']").type("ger", {delay:100});
    const dropdown = page.locator("[class*='ta-results']")
    await dropdown.waitFor();
    const dropdownCount = await dropdown.locator("button").count();

    for(let i = 0; i < dropdownCount; i++)
    {
        const text = await dropdown.locator("button").nth(i).textContent();
        if(text === " Germany")
        {
            await dropdown.locator("button").nth(i).click();
            break;
        }
    }

    const emailEntered = await page.locator("[class*='user__name'] label[type='text']").textContent();
    expect(emailEntered).toEqual(email);
    

    await page.locator("[class*='action__submit']").click();

    await expect(page.locator("[class*='hero-primary']")).toHaveText(" Thankyou for the order. ");

    var orderId = await page.locator("[class='em-spacer-1'] [class='ng-star-inserted']").textContent();
    orderId = orderId.replaceAll("|", "").trim()

    await page.locator("td [routerlink='/dashboard/myorders']").click();

    //Get all the orderId of the table displayed
    await page.waitForSelector("tr")
    const orders = page.locator("tr");
    const ordersCount = await orders.count();
    //const orders = await page.$$("tr");

    for(let i = 0; i < ordersCount; i++)
    {
        const orderIDText = await orders.locator("th[scope='row']").nth(i).textContent();
        if(orderIDText === orderId){
            await orders.locator("button[class*='btn-primary']").nth(i).click();
            break;
        }
    }

    const orderIdSummaryPage = await page.locator("small[class='col-title'] + div").textContent();
    expect(orderId).toEqual(orderIdSummaryPage);

});