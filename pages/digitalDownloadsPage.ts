import { Page } from '@playwright/test';
import { BasePage } from './basePage';
import { ShoppingCartMessages } from '../utils/constants/constants';

/**
 * Represents the Digital Downloads page of the application.
 * This class provides methods to interact with elements specific to the Digital Downloads page.
 */
export class DigitalDownloadsPage extends BasePage{

    private productTitleLocator = "h2.product-title a";
    private productAddToCartLocator = "input[value='Add to cart']";
    private productImgLocator = "div.product-item .picture img";
    private shoppingCartLinkLocator = "p.content a[href='/cart']";

    /**
    * @param {Page} page - The Playwright Page object representing the current browser page.
    */
    constructor(page: Page) {
        super(page);
    }

     /**
     * Adds a random item from the Digital Downloads page to the shopping cart.
     * This method selects a random product from the list, clicks the "Add to Cart" button,
     * and returns the name and image of the item added.
     */
    async addRandomItemToCart() {
        const itemNames = this.page.locator(this.productTitleLocator);  // Adjust the selector as needed
        const itemImages = this.page.locator(this.productImgLocator);
        const addToCartButtons = this.page.locator(this.productAddToCartLocator); // Adjust the selector for the button
    
        // Get the total number of items
        const itemCount = await itemNames.count();
        if (itemCount === 0) {
            throw new Error("No items found on the page.");
        }
    
        // Generate a random index to select an item
        const randomIndex = Math.floor(Math.random() * itemCount);
    
        // Get the name of the selected item
        const itemName = await itemNames.nth(randomIndex).innerText();
        const itemPicture = await itemImages.nth(randomIndex).getAttribute('src');

        if (!itemPicture) {
            throw new Error(`Image not found for item at index ${randomIndex}`);
        }

        // Click the "Add to Cart" button of the randomly selected item
        await addToCartButtons.nth(randomIndex).click();
    
        // Return the item that was added to the cart
        return {
            itemName,
            itemPicture
        };
    }

      /**
     * Waits for an item to be added to the shopping cart and navigates to the cart page.
     * This method checks for the "Product added" message and clicks the shopping cart link to navigate to the cart page.
     */
    async waitForItemToBeAddedToShoppingCart() {
        await this.findElementByText(ShoppingCartMessages.PRODUCT_ADDED_MESSAGE);
        await this.findElementAndClick(this.shoppingCartLinkLocator);
    }
}