import { expect, Page } from '@playwright/test';

/**
 * Finds an element on the page using the given locator.
 * @param page - The Playwright Page instance.
 * @param locator - The selector string to locate the element.
 * @returns A Locator instance for the found element.
 */
export const findElement = async (page: Page, locator: string) => {
    return page.locator(locator);
}

/**
 * Finds an element and clicks on it after ensuring it is visible.
 * @param page - The Playwright Page instance.
 * @param locator - The selector string to locate the element.
 */
export const findElementAndClick = async (page: Page, locator: string) => {
    const element = await findElement(page, locator);
    await waitElementIsVisible(element);
    await element.click();
}

/**
 * Waits for the page URL to match the given path.
 * @param page - The Playwright Page instance.
 * @param path - The expected URL path.
 */
export const checkingNewUrl = async (page: Page, path: string) => {
    page.waitForURL(path);
}

/**
 * Waits until the given element is visible.
 * @param element - The Locator instance of the element to check.
 */
export const waitElementIsVisible = async (element: any) => {
    await expect(element).toBeVisible();
}

/**
 * Fills an input field with the given text after ensuring it is visible.
 * @param page - The Playwright Page instance.
 * @param locator - The selector string to locate the input field.
 * @param text - The text to enter into the input field.
 */
export const fillInput = async (page: Page, locator: string, text: string) => {
    const element = await findElement(page, locator);
    await waitElementIsVisible(element); 
    await element.fill(text);
};

/**
 * Finds an element by its text content and optionally clicks on it.
 * @param page - The Playwright Page instance.
 * @param text - The text content of the element to find.
 * @param action - Optional action ('click' or 'none', default is 'none').
 */
export const findElementByText = async(page: Page, text: string, action: 'click' | 'none' = 'none') => {
    const element = page.getByText(text);
    await expect(element).toBeVisible();
    
    if (action === 'click') {
        await element.click();
    }
}

/**
 * Asserts that the actual text matches the expected text.
 * @param expectedText - The expected text value.
 * @param actualText - The actual text value retrieved from the page.
 */
export const assertText = async(expectedText: string, actualText: string | null) => {
    expect(actualText).not.toBeNull();
    expect(expectedText).toBe(actualText);
}

/**
 * Checks if the actual text contains the expected text.
 * @param expectedText - The expected text that should be contained within the actual text.
 * @param actualText - The actual text retrieved from the page.
 */
export const checkElementContain = async(expectedText: string, actualText: string | null) => {
    expect(actualText).not.toBeNull();
    expect(expectedText).toContain(actualText);
}