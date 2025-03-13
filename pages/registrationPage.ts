import { Page } from '@playwright/test';
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

    private genderLocator(genderValue: string) {
        return  `input[id="gender-${genderValue}"]`;
    }

    private firstNameLocator = "input[id='FirstName']";
    private lastNameLocator = "input[id='LastName']";
    private emailLocator = "input[id='Email']";
    private passwordLocator = "input[id='Password']";
    private confirmationPasswordLocator = "input[id='ConfirmPassword']";
    private registerButtonLocator = "input[id='register-button']";
    private registeredUserEmailLocator = "a[href='link:///customer/info']";
    private continueLocator = "Continue";

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
        const gender = this.genderLocator(this.userDetails.gender);
        await this.findElementAndClick(gender);
        for (const key of Object.keys(this.userDetails).slice(1) as Array<keyof UserDetails>) {
            const locator = this[`${key}Locator` as keyof this];
            await this.fillInput(locator as string,this.userDetails[key]);
        };

    }

     /**
     * Fills in the password and confirmation password fields on the registration form.
     * A random password is generated and entered into both fields.
     */
    async fillPassword() {
        const password = getPassword();
        await this.fillInput(this.passwordLocator, password);
        await this.fillInput(this.confirmationPasswordLocator, password);
    }

    /**
     * Clicks the "Register" button to submit the registration form.
     */
    async clickRegister() {
        await this.findElementAndClick(this.registerButtonLocator);
    }

    /**
     * Verifies that the registration process has been completed successfully.
     * This method checks if the current URL corresponds to the registration completion page
     * and verifies that the success message and registered user's email are visible.
     */
    async checkingRegisterCompletedPage() {
        await this.checkingNewUrl(RegistrationMessages.REGISTRATION_COMPLETED_PATH);
        await this.findElementByText(RegistrationMessages.REGISTRATION_COMPLETED)
        await this.findElementByText(this.userDetails.email);
    }

     /**
     * Clicks the "Continue" button after registration is completed.
     * This typically redirects the user to the next step after registration.
     */
    async clickContinue() {
        await this.findElementByText(this.continueLocator ,'click')
    }
}
