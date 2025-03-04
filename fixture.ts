import { test as base } from '@playwright/test';
import { HomePage } from './pages/homePage'

export type TestOptions = {
    homePage: HomePage
}

export const test = base.extend<TestOptions>({
    homePage: async ({page}, use) => {
        const homePage = new HomePage(page);
        await use(homePage);
    },
})
