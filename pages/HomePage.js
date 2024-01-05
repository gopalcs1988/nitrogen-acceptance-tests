class HomePage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.managePermission = "//button[normalize-space()='Manage Permissions']"
        this.permissionsList = "//h2[normalize-space()='Managing permissions for raja test']"
        this.permissionSearchTextPlaceHolder = "//input[@placeholder='Start typing to search']"
        this.saveChanges = "//button[normalize-space()='Save changes']"
    }

    async checkUserIsPresent(userName) {
        await this.expect(this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]`)).toBeVisible()
    }

    async editUser(userName, scope) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(this.managePermission)).toBeVisible()
        await this.page.locator(this.managePermission).click()
        await this.expect(this.page.locator(this.permissionsList)).toBeVisible()
        await this.page.locator(this.permissionSearchTextPlaceHolder).click()
        await this.page.locator(this.permissionSearchTextPlaceHolder).fill(scope)
        await this.page.locator(`//div[text()='${scope}']/../preceding-sibling::button`).click()
        await this.page.locator(this.saveChanges).click()
        await this.page.keyboard.press('Escape');
    }

}
module.exports = HomePage;