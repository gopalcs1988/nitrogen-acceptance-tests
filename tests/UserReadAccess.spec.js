
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage')
const RegisterPage = require('../pages/RegisterPage')
const HomePage = require('../pages/HomePage')

test('Login with demo user', async ({ page }) => {
  const login = new LoginPage(page, expect)
  await login.gotoLoginPage()
  await login.login('liquid_demo','liquid_demo')
  await login.checkHomePage('Hello, Liquid')
  await login.logout()
  await login.checkLoginPage()
});

test('Create a normal access user', async ({ page }) => {
  const login = new LoginPage(page, expect)
  const register = new RegisterPage(page, expect)
  await login.gotoLoginPage()
  await register.createAccount('rajagopal', 'Raja', 'test', 'test@gmail.com', 'password')
  await page.waitForTimeout(3000)
  await login.login('rajagopal','password')
  await login.checkHomePage('Hello, Raja')
  await login.logout()
  await login.checkLoginPage()
})

test('Edit the user and provide the admin:profile:read access', async ({ page }) => {
  const login = new LoginPage(page, expect)
  const homePage = new HomePage(page, expect)
  await login.gotoLoginPage()
  await login.login('liquid_demo','liquid_demo')
  await login.checkHomePage('Hello, Liquid')
  await homePage.checkUserIsPresent('rajagopal')
  await homePage.editUser('rajagopal', 'admin:profile:read')
  await login.logout()
  await login.checkLoginPage()
  await page.waitForTimeout(1000)
  await login.login('rajagopal','password')
  await login.checkHomePage('Hello, Raja')
  await homePage.checkUserIsPresent('rajagopal')
  await homePage.checkUserIsPresent('liquid_demo')
})

