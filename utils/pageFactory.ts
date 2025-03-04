import { Page } from '@playwright/test';
import { HomePage } from '../pages/homePage';
import { RegistrationPage } from '../pages/registrationPage';
import { DigitalDownloadsPage } from '../pages/digitalDownloadsPage';
import { ShoppingCartPage } from '../pages/shoppingCartPage';
import { BasePage } from '../pages/basePage';

/**
 * Factory class to manage page objects.
 * This ensures that each page object is created only once and reused throughout the test.
 */
export class PageFactory extends BasePage{
    private homePageInstance?: HomePage;
    private registrationPageInstance?: RegistrationPage;
    private digitalDownloadsPageInstance?: DigitalDownloadsPage;
    private shoppingCartPageInstance?: ShoppingCartPage;

    constructor(page: Page) {
        super(page);
    }

    /**
     * Lazy-loaded getter for the HomePage object.
     * This ensures the HomePage is only instantiated when it is needed for the first time.
     *
     * @returns The HomePage instance.
     */
    get homePage(): HomePage {
        // If the HomePage is not created yet, instantiate it and return
        return this.homePageInstance ??= new HomePage(this.page);
    }

    /**
     * Lazy-loaded getter for the RegistrationPage object.
     * This ensures the RegistrationPage is only instantiated when it is needed for the first time.
     *
     * @returns The RegistrationPage instance.
     */
    get registrationPage(): RegistrationPage {
        // If the RegistrationPage is not created yet, instantiate it and return
        return this.registrationPageInstance ??= new RegistrationPage(this.page);
    }

    /**
     * Lazy-loaded getter for the DigitalDownloadsPage object.
     * This ensures the DigitalDownloadsPage is only instantiated when it is needed for the first time.
     *
     * @returns The DigitalDownloadsPage instance.
     */
    get digitalDownloadsPage(): DigitalDownloadsPage {
        // If the DigitalDownloadsPage is not created yet, instantiate it and return
        return this.digitalDownloadsPageInstance ??= new DigitalDownloadsPage(this.page);
    }

    /**
     * Lazy-loaded getter for the ShoppingCartPage object.
     * This ensures the ShoppingCartPage is only instantiated when it is needed for the first time.
     *
     * @returns The ShoppingCartPage instance.
     */
    get shoppingCartPage(): ShoppingCartPage {
        // If the ShoppingCartPage is not created yet, instantiate it and return
        return this.shoppingCartPageInstance ??= new ShoppingCartPage(this.page);
    }
}