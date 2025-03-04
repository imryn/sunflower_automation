import { test } from '../fixture';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('add item to shopping cart', () => {
    test('add item to shopping cart for a new user', async ({ homePage, registrationPage, 
        digitalDownloadsPage, shoppingCartPage }) => {
        await homePage.clickRegistration();
        await registrationPage.fillPersonalDetails();
        await registrationPage.fillPassword();
        await registrationPage.clickRegister();
        await registrationPage.checkingRegisterCompletedPage();
        await registrationPage.clickContinue();
        await homePage.verifyRegisteredUser(registrationPage.userDetails);
        await homePage.moveToDigitalDownloads();
        const item = await digitalDownloadsPage.addRandomItemToCart();
        await digitalDownloadsPage.waitForItemToBeAddedToShoppingCart();
        await shoppingCartPage.verifyProductIsInTheCart(item);
    });
})