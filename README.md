# nitrogen-acceptance-tests
# Proejct Structure:
- .github/worflow
    - playwright.yml (To execute the testcases on the github actions)
- liquid
    - quickstart (Deploy the application using the docker containers)
- pages
    - JS files will be present based on the application pages and corresponding the methods using the POM structure
- tests
    - test cases are located as *.spec.js under tests folder
- mailer.js
    - Used to send the report as a email
- template.html
    - Email's html template
- package.json
    - Depedencies listed out to install and execute
- playwright.config.js
    - test framework configurations(workers, html result path, timeout and browsers list)

# To initialize the project and to setup an environment, need to run the below command
npm init playwright@latest

# To run the test case on all the browsers execute the below command,
npx playwright test

# To view the report of the executed script,
npx playwright show-report

# To run the script on the headless mode on all the browsers,
npx playwright test --headed

# The { page } argument tells Playwright Test to setup the page fixture and provide it to your test function
# Expect --> helps to write the assertion

# Single Test:
npx playwright test HomePageTest.spec.js

# Single Browser:
npx playwright test HomePageTest.spec.js --project=chromium

# Single test, browser and headless mode:
npx playwright test HomePageTest.spec.js --headed --project=chromium

# Debug Mode:
npx playwright test HomePagetest.spec.js --headed --project=chromium --debug

# Multiple tests with sequential:
npx playwright test --workers=1 --project=chromium

# Locating Elements in Playwright:
-----------------------
property()
css
xpath

# link/Button:
-----------
await page.locator('locator').click()
(or)
await page.click('locator')

# inputBox:
----------
await page.locator('locator').fill('value')
await page.locator('locator').type('value')

await page.fill('locator', 'value')
await page.type('locator', 'value')

# Locate multiple web elements:
--------------------
const elements = await page.$$('locator')

# Wait for web element:
-------------------
await page.waitForSelector("//div[@id='tbodyid']//h4/a")

# Get Text content:
---------------
const links = await page.$$("//div[@id='tbodyid']//h4/a")
    
    for(const link of links) {
        const linkText = await link.textContent();
        console.log(linkText)
    }

# Record and Playwright:
-------------
npx playwright codegen - Will open the browser and editor to record and the web activities

# Assertions: 
----------
# Hard Assertions:
---------------
await page.goto("https://demo.nopcommerce.com/register")

await expect(page).toHaveURL('https://demo.nopcommerce.com/register') //URL value verification
// expect(page).not.toHaveURL() - Negative value of the verification

await expect(page).toHaveTitle("nopCommerce demo store. Register") //Title value verification

const logoElement = await page.locator(".header-logo")
await expect(logoElement).toBeVisible() //Element is visible or not

const enabled = await page.locator("#FirstName")
await expect(enabled).toBeEnabled() //Element is enabled or not

const radioButton = await page.locator("#gender-male")
await radioButton.click()
await expect(radioButton).toBeChecked() //Radio button is checked or not

const checkBox = await page.locator("#Newsletter")
await expect(checkBox).toBeChecked() //Checkbox is checked or not

const registerButton = await page.locator('#register-button')
await expect(registerButton).toHaveAttribute('type','submit') //Element has attribute
    
const toHaveText = await page.locator("//h1[normalize-space()='Register']")
await expect(toHaveText).toHaveText("Register") //Complete Text
    
await expect(toHaveText).toContainText("Regis") // Partial Text

const emailValue = await page.locator("#Email")
emailValue.fill('test@mail.com')

await expect(emailValue).toHaveValue('test@mail.com') // To verify the value on the input field

// List of element has given length
const dropDownList = await page.locator("select[name='DateOfBirthMonth'] option")
await expect(dropDownList).toHaveCount(13)

# Soft Assertions:
--------------
await expect.soft(page).toHaveURL('https://demo.nopcommerce.com/register123') //URL value verification with soft assertion will continue the execution even there is a failure

await expect.soft(page).toHaveTitle("nopCommerce demo store. Register") //Title value verification

# Single test case execution:
---------------
test.only("Only concept", async({page}) => {
    expect("Rajagopal").toContain("Rajagopal")
})

# To skip the test case:
-----------------
test.skip("Sample test", async ({page}) => {

    expect(12).toBe(12)
    expect(100).toBe(101)
})