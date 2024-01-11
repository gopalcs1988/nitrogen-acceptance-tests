const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
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

test("Login user with medium access to edit the corresponding fields", async ({ page }) => {
    const login = new LoginPage(page, expect);
    const homePage = new HomePage(page, expect);
    await login.gotoLoginPage();
    await login.login("liquid_demo", "liquid_demo");
    await login.checkHomePage("Hello, Liquid");
    await homePage.checkUserIsPresent("rajagopal");
    await homePage.editUser("rajagopal", "admin:profile:sensitive:medium:write");
    await login.logout();
    await login.checkLoginPage();
    await login.login("rajagopal", "password");
    await login.checkHomePage("Hello, Rajatest");
    await homePage.checkUserIsPresent("rajagopal");
    await homePage.editProfile("rajagopal", "Email", "rajagopal1988@gmail.com");
    await homePage.checkProfile("Email", "rajagopal1988@gmail.com");
    await login.logout();
    await login.checkLoginPage();
});

test("Login user with high access to edit the corresponding fields", async ({ page }) => {
    const login = new LoginPage(page, expect);
    const homePage = new HomePage(page, expect);
    await login.gotoLoginPage();
    await login.login("liquid_demo", "liquid_demo");
    await login.checkHomePage("Hello, Liquid");
    await homePage.checkUserIsPresent("rajagopal");
    await homePage.editUser("rajagopal", "admin:profile:sensitive:high:write");
    await login.logout();
    await login.checkLoginPage();
    await login.login("rajagopal", "password");
    await login.checkHomePage("Hello, Rajatest");
    await homePage.checkUserIsPresent("rajagopal");
    await homePage.checkUserEditPasswordFieldIsEmpty("rajagopal", "Password")
    await homePage.editProfile("rajagopal", "Username", "rajagopal1");
    await homePage.editProfile("rajagopal1", "Password", "course1#");
    await homePage.editProfile("rajagopal1", "Country", "IN", true);
    await homePage.checkProfile("Username", "rajagopal1");
    await login.logout();
    await login.checkLoginPage();
    await login.login("rajagopal1", "course1#");
    await login.checkHomePage("Hello, Rajatest");
    await login.logout();
    await login.checkLoginPage();
});


test("Multiple browser login", async ({ browser }) => {
    const reporterContext = await browser.newContext();
    const editorContext = await browser.newContext();
    try {
      const reporterPage = await reporterContext.newPage();
      const editorPage = await editorContext.newPage();

      const adminLogin = new LoginPage(reporterPage, expect);
      const adminHomePage = new HomePage(reporterPage, expect);
      const userLogin = new LoginPage(editorPage, expect);
      const userHomePage = new HomePage(editorPage, expect);

      await adminLogin.gotoLoginPage();
      await adminLogin.login("liquid_demo", "liquid_demo");
      await adminLogin.checkHomePage("Hello, Liquid");
      await userLogin.gotoLoginPage();
      await userLogin.login("rajagopal1", "password");
      await userLogin.checkHomePage("Hello, Rajatest");
      await adminHomePage.checkUserIsPresent("rajagopal1");
      await userHomePage.checkUserIsPresent("rajagopal1");
      await adminHomePage.editUser("rajagopal1", "admin:profile:sensitive:high:write");
      await userHomePage.checkUserEditPageError("rajagopal1")
      await userHomePage.reload()
      await userLogin.checkLoginPage();
      await adminLogin.logout();
      await adminLogin.checkLoginPage();
    } 
    finally {
      await reporterContext.close();
      await editorContext.close();
    }
});
