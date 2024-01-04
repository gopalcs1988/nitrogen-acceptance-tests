
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage')
const RegisterPage = require('../pages/RegisterPage')

test('Login with demo user', async ({ page }) => {
  const login = new LoginPage(page, expect)
  await login.gotoLoginPage()
  await login.login('liquid_demo','liquid_demo')
  await login.checkHomePage()
  await login.logout()
  await login.checkLoginPage()
});

test('Create a normal accessuser', async ({ page }) => {
  const login = new LoginPage(page, expect)
  const register = new RegisterPage(page, expect)
  await login.gotoLoginPage()
  await register.createAccount('rajagopal', 'raja', 'test', 'test@gmail.com', 'password')
})

