import { Page } from '@playwright/test';
import { homePageLocator } from '../locators/homePageLocators'
import {findElementAndClick, checkingNewUrl, findElementByText} from '../utils/helper';
import { HomePageLinks } from '../utils/constants/constants';
import { BasePage } from './basePage';
import { UserDetails } from '../utils/types/userDetails';

/**
 * Represents the Home page of the application.
 * This class provides methods to interact with elements specific to the Home page.
*/
export class HomePage extends BasePage{

    /**
    * @param {Page} page - The Playwright Page object representing the current browser page.
    */
    constructor(page: Page) {
        super(page);
    }

     /**
     * Clicks on the "Register" link in the homepage and verifies the URL changes to the registration page.
     */
    async clickRegistration() {
        await findElementAndClick(this.page, homePageLocator.register)
        await checkingNewUrl(this.page, HomePageLinks.HOMEPAGE_REGISTER_PATH)
    }

     /**
     * Verifies if the registered user's email is visible on the homepage.
     * This method checks for the presence of the registered user's email in the homepage.
     * 
     * @param {object} userDetails
     */
    async verifyRegisteredUser(userDetails: UserDetails) {
        await findElementByText(this.page, userDetails.email);
    }

    /**
     * Navigates to the Digital Downloads page from the homepage.
     * This method clicks on the Digital Downloads link and verifies the URL changes accordingly.
     */
    async moveToDigitalDownloads() {
        await findElementAndClick(this.page, homePageLocator.digitalDownloads)
        await checkingNewUrl(this.page, HomePageLinks.DIGITAL_DOWNLOADS_PATH)
    }
}