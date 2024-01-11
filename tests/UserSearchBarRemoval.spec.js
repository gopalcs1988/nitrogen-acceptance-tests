const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");

test("Check search bar is not present on the home page", async ({ page }) => {
  const login = new LoginPage(page, expect);
  const homePage = new HomePage(page, expect);
  await login.gotoLoginPage();
  await login.login("liquid_demo", "liquid_demo");
  await login.checkHomePage("Hello, Liquid");
  await homePage.checkUserIsPresent("rajagopal");
  await homePage.editUser("rajagopal", "delegated:profile:search");
  await login.logout();
  await login.checkLoginPage();
  await login.login("rajagopal", "password");
  await login.checkHomePage("Hello, Raja");
  await homePage.checkUserIsPresent("rajagopal");
  await homePage.checkSearchBarIsNotPresent();
});
