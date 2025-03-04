import { test } from '../fixture';
import { DigitalDownloadsPage } from '../pages/digitalDownloadsPage';
import { RegistrationPage } from '../pages/registrationPage';
import { ShoppingCartPage } from '../pages/shoppingCartPage';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('add item to shopping cart', () => {
    test('add item to shopping cart for a new user', async ({ page, homePage }) => {
        const registrationPage = new RegistrationPage(page);
        const digitalDownloadsPage = new DigitalDownloadsPage(page);
        const shoppingCartPage = new ShoppingCartPage(page);
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