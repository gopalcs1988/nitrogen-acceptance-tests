
const { test, expect } = require('@playwright/test');
const LoginPage = require('../pages/LoginPage')

test('Login with demo user', async ({ page }) => {
  const login = new LoginPage(page, expect)
  await login.gotoLoginPage()
  await login.login('liquid_demo','liquid_demo')
  await login.checkHomePage()
});

