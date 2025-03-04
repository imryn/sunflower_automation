import { Page } from '@playwright/test';
import { registrationPageLocator } from '../locators/registrationPageLocator'
import { 
         checkingNewUrl, 
         fillInput, 
         findElementAndClick,
         findElementByText
        } from '../utils/helper';
import { getPassword, getRandomPersonalDetails } from '../utils/base'
import { RegistrationMessages } from '../utils/constants/constants';
import { BasePage } from './basePage';
import { UserDetails } from '../utils/types/userDetails';

/**
 * Represents the Registration page of the application.
 * This class provides methods to interact with the registration page.
 */
export class RegistrationPage extends BasePage{
    /**
     * The user details to be used in the registration process.
     * This includes the gender, first name, last name, and email.
     */
    userDetails: UserDetails;

    /**
    * @param {Page} page - The Playwright Page object representing the current browser page.
    */
    constructor(page: Page) {
        super(page);
        this.userDetails = getRandomPersonalDetails();
    }

    /**
     * Fills in the user's personal details on the registration form.
     */
    async fillPersonalDetails() {
        const gender = registrationPageLocator.getGender(this.userDetails.gender);
        await findElementAndClick(this.page, gender);
        for (const key of Object.keys(this.userDetails).slice(1)) {
            await fillInput(this.page, registrationPageLocator[key], this.userDetails[key]);
        };

    }

     /**
     * Fills in the password and confirmation password fields on the registration form.
     * A random password is generated and entered into both fields.
     */
    async fillPassword() {
        const password = getPassword();
        await fillInput(this.page, registrationPageLocator.password, password);
        await fillInput(this.page, registrationPageLocator.confirmationPassword, password);
    }

    /**
     * Clicks the "Register" button to submit the registration form.
     */
    async clickRegister() {
        await findElementAndClick(this.page, registrationPageLocator.registerButton);
    }

    /**
     * Verifies that the registration process has been completed successfully.
     * This method checks if the current URL corresponds to the registration completion page
     * and verifies that the success message and registered user's email are visible.
     */
    async checkingRegisterCompletedPage() {
        await checkingNewUrl(this.page, RegistrationMessages.REGISTRATION_COMPLETED_PATH);
        await findElementByText(this.page, RegistrationMessages.REGISTRATION_COMPLETED)
        await findElementByText(this.page, this.userDetails.email);
    }

     /**
     * Clicks the "Continue" button after registration is completed.
     * This typically redirects the user to the next step after registration.
     */
    async clickContinue() {
        await findElementByText(this.page, registrationPageLocator.continue, 'click')
    }
}
