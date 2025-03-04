## Instructions for installing the project
1. Download the project to your computer.

2. Open the project and install all needed packages by typing in the terminal:
    `npm install`
(it should install playwright and typescript)

## Running the project
### Now you have two ways in order to run the tests:

#### First option (with ui of the browser)
1. After you open the project, type in the terminal: `npx playwright test --ui`
2. Pick the file `addItemToShoppingCart.spec.ts`, it will run all the tests exist in this file.

#### Second option (without ui)
After you open the project, type in the terminal: `npx playwright test`
The tests inside `addItemToShoppingCart.spec.ts` file will be run and you should get table result after it finish