import { Page } from '@playwright/test';
import { HomePageLinks } from '../utils/constants/constants';
import { BasePage, step } from './basePage';
import { UserDetails } from '../utils/types/userDetails';


/**
 * Represents the Home page of the application.
 * This class provides methods to interact with elements specific to the Home page.
*/
export class HomePage extends BasePage{

    readonly registerLocator: string
    readonly digitalDownloadsLocator: string

    /**
    * @param {Page} page - The Playwright Page object representing the current browser page.
    */
    constructor(page: Page) {
        super(page);
        this.registerLocator = "a[href='/register']";
        this.digitalDownloadsLocator = "ul.top-menu li a[href='/digital-downloads']";
    }

     /**
     * Clicks on the "Register" link in the homepage and verifies the URL changes to the registration page.
     */
    @step('Click Registration link')
    async clickRegistration() {
        await this.findElementAndClick(this.registerLocator)
        await this.checkingNewUrl(HomePageLinks.HOMEPAGE_REGISTER_PATH)
    }

     /**
     * Verifies if the registered user's email is visible on the homepage.
     * This method checks for the presence of the registered user's email in the homepage.
     * 
     * @param {object} userDetails
     */
    @step('Verify user was registered')
    async verifyRegisteredUser(userDetails: UserDetails) {
        await this.findElementByText(userDetails.email);
    }

    /**
     * Navigates to the Digital Downloads page from the homepage.
     * This method clicks on the Digital Downloads link and verifies the URL changes accordingly.
     */
    @step('Move to digital downloads page')
    async moveToDigitalDownloads() {
        await this.findElementAndClick(this.digitalDownloadsLocator)
        await this.checkingNewUrl(HomePageLinks.DIGITAL_DOWNLOADS_PATH)
    }
}



