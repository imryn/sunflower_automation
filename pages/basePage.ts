import { Locator, Page, expect } from '@playwright/test';
import { test } from '@playwright/test';

/**
 * Represents a base page that provides common functionality for interacting with pages in the application.
 * This class serves as the foundation for all page objects in the test automation framework.
 */

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }

/**
 * Finds an element and clicks on it after ensuring it is visible.
 * @param page - The Playwright Page instance.
 * @param locator - The selector string to locate the element.
 */
    async findElementAndClick (locator: string) {
        const element = this.page.locator(locator);
        await this.waitElementIsVisible(element);
        await element.click();
    }

    /**
     * Waits for the page URL to match the given path.
     * @param page - The Playwright Page instance.
     * @param path - The expected URL path.
     */
    async checkingNewUrl (path: string) {
        await this.page.waitForURL(path);
    }

    /**
     * Waits until the given element is visible.
     * @param element - The Locator instance of the element to check.
     */
    async waitElementIsVisible (element: Locator) {
        await expect(element).toBeVisible({ timeout: 5000 })
              .catch(() => { throw new Error(`Error: ${element} not found!`) });
    }

    /**
     * Fills an input field with the given text after ensuring it is visible.
     * @param page - The Playwright Page instance.
     * @param locator - The selector string to locate the input field.
     * @param text - The text to enter into the input field.
     */
    async fillInput (locator: string, text: string) {
        const element = this.page.locator(locator);
        await this.waitElementIsVisible(element);
        await element.fill(text);
    };

    /**
     * Finds an element by its text content and optionally clicks on it.
     * @param page - The Playwright Page instance.
     * @param text - The text content of the element to find.
     * @param action - Optional action ('click' or 'none', default is 'none').
     */
    async findElementByText (text: string, action: 'click' | 'none' = 'none') {
        const element = this.page.getByText(text);
        await this.waitElementIsVisible(element);
        
        if (action === 'click') {
            await element.click();
        }
    }

    /**
     * Asserts that the actual text matches the expected text.
     * @param expectedText - The expected text value.
     * @param actualText - The actual text value retrieved from the page.
     */
    async assertText (expectedText: string, actualText: string | null) {
        expect(actualText).not.toBeNull();
        expect(expectedText).toBe(actualText);
    }

    /**
     * Checks if the actual text contains the expected text.
     * @param expectedText - The expected text that should be contained within the actual text.
     * @param actualText - The actual text retrieved from the page.
     */
    async checkElementContain (expectedText: string, actualText: string) {
        expect(actualText).not.toBeNull();
        expect(expectedText).toContain(actualText);
    }

}

export function step(stepName? : string) {
    return function decorator(target: Function, context: ClassMethodDecoratorContext) {
        return function replacementMethod(...args: any) {
         const name = stepName || `${this.constructorname}.${(context.name as string)}`
         return test.step(name, async () => {
             return await target.call(this, ...args)
         })
        }
     }
} 