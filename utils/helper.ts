import { expect, Page } from '@playwright/test';


export const findElement = async (page: Page, locator: string) => {
    return page.locator(locator);
}

export const findElementAndClick = async (page: Page, locator: string) => {
    const element = await findElement(page, locator);
    await waitElementIsVisible(element);
    await element.click();
}

export const checkingNewUrl = async (page: Page, path: string) => {
    page.waitForURL(path);
}

export const waitElementIsVisible = async (element: any) => {
    await expect(element).toBeVisible();
}

export const fillInput = async (page: Page, locator: string, text: string) => {
    const element = await findElement(page, locator);
    await waitElementIsVisible(element); 
    await element.fill(text);
};

export const findElementByText = async(page: Page, text: string, action: 'click' | 'none' = 'none') => {
    const element = page.getByText(text);
    await expect(element).toBeVisible();
    
    if (action === 'click') {
        await element.click();
    }
}

export const assertText = async(expectedText: string, actualText: string | null) => {
    expect(actualText).not.toBeNull();
    expect(expectedText).toBe(actualText);
}

export const checkElementContain = async(expectedText: string, actualText: string | null) => {
    expect(actualText).not.toBeNull();
    expect(expectedText).toContain(actualText);
}