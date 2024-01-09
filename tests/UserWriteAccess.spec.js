const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const RegisterPage = require("../pages/RegisterPage");
const HomePage = require("../pages/HomePage");

test("Check user have the access to edit the permission", async ({ page }) => {
  const login = new LoginPage(page, expect);
  const homePage = new HomePage(page, expect);
  await login.gotoLoginPage();
  await login.login("liquid_demo", "liquid_demo");
  await login.checkHomePage("Hello, Liquid");
  await homePage.checkUserIsPresent("rajagopal");
  await homePage.editUser("rajagopal", "admin:profile:access:write");
  await login.logout();
  await login.checkLoginPage();
  await login.login("rajagopal", "password");
  await login.checkHomePage("Hello, Raja");
  await homePage.checkUserIsPresent("rajagopal");
  await homePage.checkManagePermissionsIsPresent("rajagopal")
  await login.logout();
  await login.checkLoginPage();
});


test("Login with super admin user to provide the low access ", async ({ page }) => {
  const login = new LoginPage(page, expect);
  const homePage = new HomePage(page, expect);
  await login.gotoLoginPage();
  await login.login("liquid_demo", "liquid_demo");
  await login.checkHomePage("Hello, Liquid");
  await homePage.checkUserIsPresent("rajagopal");
  await homePage.editUser("rajagopal", "admin:profile:write");
  await homePage.editUser("rajagopal", "admin:configuration:read");
  await homePage.editUser("rajagopal", "admin:profile:sensitive:low:write");
  await login.logout();
  await login.checkLoginPage();
});

test("Login user with low access to edit the corresponding fields", async ({ page }) => {
  const login = new LoginPage(page, expect);
  const homePage = new HomePage(page, expect);
  await login.gotoLoginPage();
  await login.login("rajagopal", "password");
  await login.checkHomePage("Hello, Raja");
  await homePage.checkUserIsPresent("rajagopal");
  await homePage.editProfile("rajagopal", "First Name", "Rajatest");
  await homePage.editProfile("rajagopal", "Middle Name", "Gopal");
  await homePage.editProfile("rajagopal", "Last Name", "Arumugam");
  await homePage.checkProfile("First Name", "Rajatest");
  await homePage.checkProfile("Last Name", "Arumugam");
  await login.logout();
  await login.checkLoginPage();
});