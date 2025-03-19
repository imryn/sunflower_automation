import { Page } from '@playwright/test';
import { BasePage, step } from "./basePage";
import { ShoppingCartLinks } from '../utils/constants/constants';
import { extractAString } from '../utils/base'

/**
 * Represents the Shopping cart page of the application.
 * This class provides methods to interact with the shopping cart page.
 */
export class ShoppingCartPage extends BasePage{

    readonly cartItemNameLocator: string
    readonly cartItemImgLocator: string
     /**
    * @param {Page} page - The Playwright Page object representing the current browser page.
    */
    constructor(page: Page) {
        super(page);
        this.cartItemNameLocator = "td.product a.product-name";
        this.cartItemImgLocator = ".cart-item-row .product-picture img";
    }

    /**
    * Verifies that the product added to the shopping cart matches the expected details.
    * It navigates to the shopping cart page, extracts the product's name and image URL from the cart,
    * and compares them with the expected values to confirm that the correct product is present
    * @param {Object} expectedItem - The expected product details to verify.
    * @param {string} expectedItem.itemName - The name of the product that should be in the cart.
    * @param {string | null} expectedItem.itemPicture - The URL of the expected product image.
    * The image URL could be `null` if not provided.
    */
    @step('Verify the correct item was added to the shopping cart')
    async verifyProductIsInTheCart(expectedItem: { itemName: string, itemPicture: string}) {
        await this.checkingNewUrl(ShoppingCartLinks.SHOPPING_CART_PATH);
        const cartItemName = this.page.locator(this.cartItemNameLocator);
        const cartItemImg = this.page.locator(this.cartItemImgLocator);
        const extractedCartItemImg = extractAString(await cartItemImg.getAttribute('src') ?? '');
        await this.assertText(expectedItem.itemName, await cartItemName.innerText());
        await this.checkElementContain(expectedItem.itemPicture, extractedCartItemImg);
    }
}