import { UserDetails } from "./types/userDetails";

/** Create random user details for a new user
*/
export const getRandomPersonalDetails = (): UserDetails => {
    const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    let random_string = "";
    for (let i = 0; i < chars.length/3; i++) {
        random_string += chars.charAt(Math.floor(Math.random() * chars.length));
    }      
      
    const emailPrefix = "testuser";
    const gender = getRandomGender();

    const emailValue = `${emailPrefix}${random_string}qa@gmail.com`
    const user_info = {"gender": gender, "firstName": emailPrefix, "lastName": random_string, "email": emailValue}
    return user_info
}

/** Create random password for a new user
* @returns {string} A random string
*/
export const getPassword = (): string => {
    const lowerChars = "abcdefghijklmnopqrstuvwxyz"
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    const charLength = 3

    let lowerRandomChars = getRandomChars(lowerChars, charLength)
    let upperRandomChars = getRandomChars(upperChars, charLength)
    let randomNumbers = Math.random() * 10
    return lowerRandomChars + upperRandomChars + randomNumbers + "!"
}

/**
 * Generates a random string of a specified length using the given characters.
 *
 * @param {string} chars - The set of characters to pick from.
 * @param {number} charLength - The length of the random string to generate.
 * @returns {string} A random string of the specified length.
 */

const getRandomChars = (chars: string, charLength: number): string => {
    let randomString = ""

    for (let i=0; i< charLength; i++) {
        randomString+= chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return randomString
}

/** return random gender value
* @returns {string} A random gender string
*/
const getRandomGender = (): string  => {
    return Math.random() < 0.5 ? 'male' : 'female';
}

/** extract
* @returns {string} extract
*/
export const extractAString = (url: string): string => {
    const match = url.match(/([^\/]+)_\d+\./); 
    return match ? match[1] : ''; 
};