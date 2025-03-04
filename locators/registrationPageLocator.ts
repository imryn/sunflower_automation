/**
 * Contains locators for elements on the registration page.
 */
export const registrationPageLocator = {

    getGender(genderValue) {
        return  `input[id="gender-${genderValue}"]`
    },

    firstName: "input[id='FirstName']",
    lastName: "input[id='LastName']",
    email: "input[id='Email']",
    password: "input[id='Password']",
    confirmationPassword: "input[id='ConfirmPassword']",
    registerButton: "input[id='register-button']",
    registeredUserEmail: "a[href='link:///customer/info']",
    continue: "Continue"
}