import {test, expect } from "@playwright/test";

test("Print Multiple Elements Text Test", async ({page}) => {
    
    await page.goto("https://rahulshettyacademy.com/client");

    const username = page.locator("input#userEmail");
    const password = page.locator("input#userPassword");
    const signIn = page.locator("input#login");
    const cardTitles = page.locator("div.card-body > h5 > b");
    const products = page.locator("div.card-body");
    const productName = "zara coat 3";

    await username.type("anshika@gmail.com");
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
    
    
    //await page.close();

});