class LoginPage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.username = 'your_username'
        this.password = "//input[@id='password']"
        this.loginButton = "//input[@value='Login']"
        this.homePage = "//h4[normalize-space()='Hello, Liquid']"
        this.logoutIcon = "//div[@href='#']"
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

    async logout() {
        await this.page.locator(this.logoutIcon).click()
    }

    async checkLoginPage() {
        await this.expect(this.page.getByPlaceholder(this.username)).toBeVisible()
    }
}
module.exports = LoginPage;