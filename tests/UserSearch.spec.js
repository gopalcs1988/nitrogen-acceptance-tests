const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const Docker = require("../pages/docker")
const updateEnv = require("../pages/updateEnv")

test("Check can search for users by concatenating first and last name", async ({ page }) => {
  const login = new LoginPage(page, expect);
  const homePage = new HomePage(page, expect);
  const dockerUtils = new Docker(page, expect);
  const updateEnvironment = new updateEnv(page, expect);
  await dockerUtils.dockerStopContainer("liquid");
  await updateEnvironment.updateEnvVariable("ADMIN_API_USER_SEARCH_CAN_USE_FULLNAME","true")
  await dockerUtils.dockerStartContainer("liquid");
  await login.sleep(10)
  await login.gotoLoginPage();
  await login.login("rajagopal", "password");
  await login.checkHomePage("Hello, Raja");
  await homePage.searchUser("raja test")
  await homePage.checkUserIsPresent("rajagopal");
  await login.logout();
});

test("Check user can search only with the configured fields", async ({ page }) => {
  const login = new LoginPage(page, expect);
  const homePage = new HomePage(page, expect);
  const dockerUtils = new Docker(page, expect);
  const updateEnvironment = new updateEnv(page, expect);
  await dockerUtils.dockerStopContainer("liquid");
  await updateEnvironment.updateEnvVariable("ADMIN_API_USER_SEARCH_CAN_USE_FULLNAME","false")
  await updateEnvironment.updateEnvVariable("ADMIN_API_USER_SEARCH_SEARCH_FIELDS","firstName")
  await dockerUtils.dockerStartContainer("liquid");
  await login.sleep(10)
  await login.gotoLoginPage();
  await login.login("rajagopal", "password");
  await login.checkHomePage("Hello, Raja");
  await homePage.searchUser("Raja")
  await homePage.checkUserIsPresent("rajagopal");
  await homePage.searchUser("test")
  await homePage.checkUserIsNotPresent("rajagopal");
  await login.logout();
});

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
  await login.logout()
  await login.checkLoginPage()
});


