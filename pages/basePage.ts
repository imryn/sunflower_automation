import { Page } from '@playwright/test';

/**
 * Represents a base page that provides common functionality for interacting with pages in the application.
 * This class serves as the foundation for all page objects in the test automation framework.
 */

export class BasePage {
    protected page: Page;

    constructor(page: Page) {
        this.page = page;
    }
}