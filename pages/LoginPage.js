class LoginPage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.username = 'your_username'
        this.password = "//input[@id='password']"
        this.loginButton = "//input[@value='Login']"
        this.homePage = "//h4[normalize-space()='Hello, Liquid']"
    }

    async gotoLoginPage() {
        await this.page.goto("http://localhost:2001/")
    }

    async login(username, passsword) {
        await this.page.getByPlaceholder(this.username).fill(username)
        await this.page.locator(this.password).fill(passsword)
        await this.page.locator(this.loginButton).click()
    }

    async checkHomePage() {
        await this.expect(this.page.locator(this.homePage)).toBeVisible()

    }
}
module.exports = LoginPage;