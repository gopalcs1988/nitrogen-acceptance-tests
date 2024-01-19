const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage')
const RegisterPage = require('../pages/RegisterPage')
const HomePage = require('../pages/HomePage')
const Docker = require("../pages/docker")
const updateEnv = require("../pages/updateEnv")

test('Create a new account and check the functionality of suspended', async ({page}) => {
  const login = new LoginPage(page, expect)
  const register = new RegisterPage(page, expect)
  const homePage = new HomePage(page, expect)
  await login.gotoLoginPage()
  await register.createAccount('shrihari', 'Shri', 'hari', 'shrihari@gmail.com', 'password')
  await page.waitForTimeout(3000)
  await login.login('shrihari','password')
  await login.checkHomePage('Hello, Shri')
  await login.logout()
  await login.checkLoginPage()
  await login.login('liquid_demo','liquid_demo')
  await login.checkHomePage('Hello, Liquid')
  await homePage.checkUserIsPresent('rajagopal1')
  await homePage.editUser('rajagopal1', 'admin:profile:ban:write')
  await login.logout()
  await login.checkLoginPage()
  await login.login('rajagopal1','course1#')
  await login.checkHomePage('Hello, Rajatest')
  await homePage.enableAdminControls('shrihari','Suspended')
  await login.logout()
  await login.checkLoginPage()
})

test('Check that authentication error message is displayed for the suspended user', async ({page}) => {
  const login = new LoginPage(page, expect)
  const homePage = new HomePage(page, expect)
  await login.gotoLoginPage()
  await login.login('shrihari','password')
  await homePage.checkAuthenticationErrorMessage()
})

test('Revert the suspended user', async ({page}) => {
  const login = new LoginPage(page, expect)
  const homePage = new HomePage(page, expect)
  await login.gotoLoginPage()
  await login.login('rajagopal1','course1#')
  await login.checkHomePage('Hello, Rajatest')
  await homePage.checkUserIsPresent('shrihari')
  await homePage.revertAdminControls('shrihari','Suspended')
  await login.logout()
  await login.checkLoginPage()
  await login.login('shrihari','password')
  await login.checkHomePage('Hello, Shri')
})