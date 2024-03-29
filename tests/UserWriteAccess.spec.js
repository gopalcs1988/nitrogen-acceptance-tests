const { test, expect } = require("@playwright/test");
const LoginPage = require("../pages/LoginPage");
const HomePage = require("../pages/HomePage");
const Docker = require("../pages/docker")
const updateEnv = require("../pages/updateEnv")

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


test("⁠If some permission is removed, check user is automatically logged off", async ({ browser }) => {
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
      await userLogin.login("rajagopal1", "course1#");
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

test("Check the user edit field is restricted based on the option configured with values", async ({ page }) => {
  const login = new LoginPage(page, expect);
  const homePage = new HomePage(page, expect);
  const dockerUtils = new Docker(page, expect);
  const updateEnvironment = new updateEnv(page, expect);
  await dockerUtils.dockerStopContainer("liquid");
  await updateEnvironment.updateEnvVariable("ADMIN_API_USER_PROFILE_EDITABLE_FIELDS","firstName")
  await dockerUtils.dockerStartContainer("liquid");
  await login.sleep(10)
  await login.gotoLoginPage();
  await login.login("rajagopal1", "course1#");
  await login.checkHomePage("Hello, Rajatest");
  await homePage.checkUserIsPresent("rajagopal1");
  await homePage.checkEditFieldIsEnabled("rajagopal1", "First Name")
  await homePage.checkEditFieldIsDisabled("rajagopal1", "Last Name")
  await homePage.checkEditFieldIsDisabled("rajagopal1", "Middle Name")
  await homePage.checkEditFieldIsDisabled("rajagopal1", "Email")
  await homePage.checkEditFieldIsDisabled("rajagopal1", "Password")
  await login.logout();
  await login.checkLoginPage();
  await dockerUtils.dockerStopContainer("liquid");
  await updateEnvironment.updateEnvVariable("ADMIN_API_USER_PROFILE_EDITABLE_FIELDS","username,email,password,deleted,role,firstName,lastName,middleName,bio,pronouns,customLink,organization,designation,gender,preferredLanguage,country")
  await dockerUtils.dockerStartContainer("liquid");
  await login.sleep(2)
});

