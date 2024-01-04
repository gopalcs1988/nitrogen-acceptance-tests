class RegisterPage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.createAccountLink = "//a[normalize-space()='Create Account']"
        this.signUpPage = "//h3[contains(text(),'Sign up •')]"
        this.userName = 'your_username'
        this.firstName = 'Your First Name'
        this.lastName = 'Your Last Name'
        this.email = "//input[@id='email']"
        this.password = "//input[@id='password']"
        this.submitButton = "//input[@value='Create Account']"
    }

    async createAccount(userName, firstName, lastName, email, password) {
        await this.page.locator(this.createAccountLink).click()
        await this.page.getByPlaceholder(this.userName).fill(userName)
        await this.page.getByPlaceholder(this.firstName).fill(firstName)
        await this.page.getByPlaceholder(this.lastName).fill(lastName)
        await this.page.locator(this.email).fill(email)
        await this.page.locator(this.password).fill(password)
        await this.page.locator(this.submitButton).click()
        await this.expect(this.page.getByPlaceholder(this.userName)).toBeVisible()
    }
}
module.exports = RegisterPage;