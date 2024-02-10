class HomePage {

    constructor(page, expect) {
        this.page = page
        this.expect = expect
        this.authenticationErrorMessage = "//div[text()='Authentication Error']"
        this.managePermission = "//button[normalize-space()='Manage Permissions']"
        this.permissionsList = "//h2[contains(text(),'Managing permissions for')]"
        this.permissionSearchTextPlaceHolder = "//input[@placeholder='Start typing to search']"
        this.permissionUpdated = `//ol[@class="toaster group"]//div[text()='Permissions updated']`
        this.updateComplete = `//ol[@class="toaster group"]//div[text()='Update complete']`
        this.Suspended = `//ol[@class="toaster group"]//div[text()='User suspended']`
        this.Verified = `//ol[@class="toaster group"]//div[text()='User verified']`
        this.verifiedIcon = `//a[contains(text(),'shrihari')]/*[@stroke-linecap='round']`
        this.userUnVerified = `//ol[@class="toaster group"]//div[text()='User un-verified']`
        this.userRestored = `//ol[@class="toaster group"]//div[text()='User restored']`
        this.saveChanges = "//button[normalize-space()='Save changes']"
        this.saveBasicInfo = "//button[text()='Save Basic Info']"
        this.searchBar = "Search users..."
        this.editErrorLoadingMessage = "//div[.='Error loading user']"
    }

    async checkAuthenticationErrorMessage() {
        await this.expect(this.page.locator(this.authenticationErrorMessage)).toBeVisible()
    }

    async checkEditFieldIsDisabled(userName, field) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(`//label[text()='${field}']/following-sibling::input`)).toBeDisabled()
        await this.page.keyboard.press('Escape');
    }

    async checkEditFieldIsEnabled(userName, field) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(`//label[text()='${field}']/following-sibling::input`)).toBeEditable()
        await this.page.keyboard.press('Escape');
    }

    async checkManagePermissionsIsPresent(userName) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(this.managePermission)).toBeVisible()
        await this.page.keyboard.press('Escape');
    }

    async checkProfile(field, value) {
        if(!(field === 'Username')) {
            await this.expect(this.page.locator(`//th[text()='${field}']/../../following-sibling::tbody//div[text()='${value}']`)).toBeVisible()
        }
        else {
            await this.expect(this.page.locator(`//th[text()='${field}']/../../following-sibling::tbody//a[text()='${value}']`)).toBeVisible()
        }
    }
    
    async checkSearchBarIsNotPresent() {
        await this.expect(this.page.getByPlaceholder(this.searchBar)).toBeHidden()
    }

    async checkUserIsPresent(userName) {
        await this.expect(this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]`)).toBeVisible()
    }

    async checkUserIsNotPresent(userName) {
        await this.expect(this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]`)).toBeHidden()
    }

    async checkUserEditPageError(userName) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(this.editErrorLoadingMessage)).toBeVisible()
    }

    async checkUserEditPasswordFieldIsEmpty(userName, field) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(`//label[text()='${field}']/following-sibling::input`)).toBeEmpty()
        await this.page.keyboard.press('Escape');
    }

    async editProfile(userName, field, value, dropDown=false) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(this.managePermission)).toBeVisible()
        if(!dropDown) {
            await this.page.locator(`//label[text()='${field}']/following-sibling::input`).fill(value)
        }
        else {
            await this.page.locator(`//label[text()='${field}']/following-sibling::select`).selectOption(value)
        }
        await this.page.locator(this.saveBasicInfo).click()
        await this.page.waitForTimeout(4000)
        await this.expect(this.page.locator(this.updateComplete)).toBeVisible()
        await this.page.keyboard.press('Escape');
    }

    async enableAdminControls(userName, field) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(`//div/label[text()='${field}']`)).toBeVisible()
        await this.page.locator(`//div/label[text()='${field}']/../following-sibling::button[@data-state="unchecked"]`).click()
        await this.expect(this.page.locator(`//div/label[text()='${field}']/../following-sibling::button[@data-state="checked"]`)).toBeVisible()
        await this.page.waitForTimeout(1000)
        let value = field.toLowerCase()
        await this.expect(this.page.locator(`//ol[@class="toaster group"]//div[text()='User ${value}']`)).toBeVisible()
        await this.page.keyboard.press('Escape');
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
        await this.page.waitForTimeout(2000)
        await this.expect(this.page.locator(this.permissionUpdated)).toBeVisible()
        await this.page.keyboard.press('Escape');
        await this.page.waitForTimeout(1000)
        await this.page.keyboard.press('Escape');
    }

    async reload() {
        await this.page.reload()
    }

    async revertAdminControls(userName, field) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(`//div/label[text()='${field}']`)).toBeVisible()
        await this.page.locator(`//div/label[text()='${field}']/../following-sibling::button[@data-state="checked"]`).click()
        await this.expect(this.page.locator(`//div/label[text()='${field}']/../following-sibling::button[@data-state="unchecked"]`)).toBeVisible()
        await this.page.waitForTimeout(1000)
        await this.expect(this.page.locator(this.userRestored)).toBeVisible()
        await this.page.keyboard.press('Escape');
    }

    async searchUser(keyword) {
        await this.expect(this.page.getByPlaceholder(this.searchBar)).toBeVisible()
        await this.page.getByPlaceholder(this.searchBar).fill(keyword)
        await this.page.keyboard.press('Enter');
    }

    async checkVerifiedIcon() {
        await this.expect(this.page.locator(this.verifiedIcon)).toBeVisible()
    }

    async unVerifyAccount(userName, field) {
        await this.page.locator(`//tbody/tr//a[contains(text(),'${userName}')]/../..//button`).click()
        await this.expect(this.page.locator(`//div/label[text()='${field}']`)).toBeVisible()
        await this.page.locator(`//div/label[text()='${field}']/../following-sibling::button[@data-state="checked"]`).click()
        await this.expect(this.page.locator(`//div/label[text()='${field}']/../following-sibling::button[@data-state="unchecked"]`)).toBeVisible()
        await this.page.waitForTimeout(1000)
        let value = field.toLowerCase()
        await this.expect(this.page.locator(this.userUnVerified)).toBeVisible()
        await this.page.keyboard.press('Escape');
        await this.expect(this.page.locator(this.verifiedIcon)).toBeHidden()
    }
}
module.exports = HomePage;