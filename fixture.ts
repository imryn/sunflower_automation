import { test as base } from '@playwright/test';
import { PageFactory } from './utils/pageFactory';


export const test = base.extend<{ factory: PageFactory }>({
    factory: async ({ page }, use) => {
        await page.goto('/');
        const factory = new PageFactory(page);
        await use(factory);
    },
});

export { expect } from '@playwright/test';
