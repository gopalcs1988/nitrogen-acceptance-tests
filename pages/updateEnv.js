const { exec } = require("child_process");
const fs = require('fs');
const path = require("path");
const currentDirectory = __dirname;
const updateFile = path.join(currentDirectory,"../../liquid/quickstart/.env");
const parentDirectory = path.join(currentDirectory,"../../liquid/scripts");

class UpdateEnv {
  
  async updateEnvVariable(key, value) {
    const envContent = fs.readFileSync(updateFile, "utf8");

    // Parse the .env content
    const envConfig = envContent.split("\n").reduce((config, line) => {
      const [k, v] = line.split("=");
      config[k] = v;
      return config;
    }, {});

    // Update the variable
    envConfig[key] = value;

    // Serialize the updated config back to a string
    const updatedEnvContent = Object.keys(envConfig)
      .map((k) => `${k}=${envConfig[k]}`)
      .join("\n");

    // Write the updated content back to the .env file
    fs.writeFileSync(updateFile, updatedEnvContent);

    console.log(`Updated ${key} to ${value}`);
  }
}
module.exports = UpdateEnv;