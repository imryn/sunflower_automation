import { Page } from '@playwright/test';
import { BasePage } from "./basePage";
import { assertText, checkElementContain, checkingNewUrl } from '../utils/helper';
import { ShoppingCartLinks } from '../utils/constants/constants';
import { extractAString } from '../utils/base'

/**
 * Represents the Shopping cart page of the application.
 * This class provides methods to interact with the shopping cart page.
 */
export class ShoppingCartPage extends BasePage{

    private cartItemNameLocator = "td.product a.product-name";
    private cartItemImgLocator = ".cart-item-row .product-picture img";
     /**
    * @param {Page} page - The Playwright Page object representing the current browser page.
    */
    constructor(page: Page) {
        super(page);
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
    async verifyProductIsInTheCart(expectedItem: { itemName: string, itemPicture: string | null}) {
        await checkingNewUrl(this.page, ShoppingCartLinks.SHOPPING_CART_PATH);
        const cartItemName = this.page.locator(this.cartItemNameLocator);
        const cartItemImg = this.page.locator(this.cartItemImgLocator);
        const extractedItemPicture = extractAString(expectedItem.itemPicture ?? '')
        const extractedCartItemImg = extractAString(await cartItemImg.getAttribute('src') ?? '');
        await assertText(expectedItem.itemName, await cartItemName.innerText());
        await checkElementContain(extractedItemPicture, extractedCartItemImg);
    }
}