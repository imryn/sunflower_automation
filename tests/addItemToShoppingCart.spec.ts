import { test } from '../fixture';

test.describe('add item to shopping cart', () => {
    test('add item to shopping cart for a new user', async ({ factory }) => {
        await factory.homePage.clickRegistration();
        await factory.registrationPage.fillPersonalDetails();
        await factory.registrationPage.fillPassword();
        await factory.registrationPage.clickRegister();
        await factory.registrationPage.checkingRegisterCompletedPage();
        await factory.registrationPage.clickContinue();
        await factory.homePage.verifyRegisteredUser(factory.registrationPage.userDetails);
        await factory.homePage.moveToDigitalDownloads();
        const item = await factory.digitalDownloadsPage.addRandomItemToCart();
        await factory.digitalDownloadsPage.waitForItemToBeAddedToShoppingCart();
        await factory.shoppingCartPage.verifyProductIsInTheCart(item);
    });
})