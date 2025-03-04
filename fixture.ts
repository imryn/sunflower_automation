import { test as base } from '@playwright/test';
import { HomePage } from './pages/homePage'
import { RegistrationPage } from './pages/registrationPage';
import { DigitalDownloadsPage } from './pages/digitalDownloadsPage';
import { ShoppingCartPage } from './pages/shoppingCartPage';

export type TestOptions = {
    homePage: HomePage
    registrationPage: RegistrationPage
    digitalDownloadsPage: DigitalDownloadsPage
    shoppingCartPage: ShoppingCartPage
}



export const test = base.extend<TestOptions>({
    /**
     * Provides an instance of HomePage for tests.
     * @param page - The Playwright page instance.
     * @param use - The function to execute with the provided fixture.
    */
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
    /**
     * Provides an instance of RegistrationPage for tests.
     * @param page - The Playwright page instance.
     * @param use - The function to execute with the provided fixture.
    */
    registrationPage: async ({page}, use) => {
        const registrationPage = new RegistrationPage(page);
        await use(registrationPage);
    },
    /**
     * Provides an instance of DigitalDownloadsPage for tests.
     * @param page - The Playwright page instance.
     * @param use - The function to execute with the provided fixture.
    */
    digitalDownloadsPage: async ({page}, use) => {
        const digitalDownloadsPage = new DigitalDownloadsPage(page);
        await use(digitalDownloadsPage);
    },
    /**
     * Provides an instance of ShoppingCartPage for tests.
     * @param page - The Playwright page instance.
     * @param use - The function to execute with the provided fixture.
    */
    shoppingCartPage: async ({page}, use) => {
        const shoppingCartPage = new ShoppingCartPage(page);
        await use(shoppingCartPage);
    },

})
