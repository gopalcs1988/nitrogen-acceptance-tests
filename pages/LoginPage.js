class LoginPage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.username = 'your_username'
        this.password = "//input[@id='password']"
        this.loginButton = "//input[@value='Login']"
        this.logoutIcon = "//div[@href='#']"
    }

    async checkHomePage(profileName) {
        await this.expect(this.page.locator(`//h4[normalize-space()='${profileName}']`)).toBeVisible()
    }

    async checkLoginPage() {
        await this.expect(this.page.getByPlaceholder(this.username)).toBeVisible()
    }

    async gotoLoginPage() {
        await this.page.goto("http://localhost:2001/")
    }

    async login(username, passsword) {
        await this.page.getByPlaceholder(this.username).fill(username)
        await this.page.locator(this.password).fill(passsword)
        await this.page.locator(this.loginButton).click()
    }

    async logout() {
        await this.page.locator(this.logoutIcon).click()
    }
    
    async sleep(timeout) {
        await this.page.waitForTimeout(timeout * 1000)
    }
}
module.exports = LoginPage;