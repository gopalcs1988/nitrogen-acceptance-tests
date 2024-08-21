const { exec } = require("child_process");
const path = require("path");
const currentDirectory = __dirname;
const parentDirectory = path.join(currentDirectory,"../liquid/quickstart");

class Docker {
  dockerStop() {
    // Define the shell command to stop all Docker containers
    return new Promise((resolve, reject) => {
      const stopContainersCommand =
      `docker compose -f ${parentDirectory}/docker-compose.yaml down`;
      
      // Execute the shell command
      exec(stopContainersCommand, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          console.error(`Error stopping Docker containers: ${error.message}`);
          return;
        }

        console.log(`Stopped Docker containers:\n${stdout}`);
        resolve();
      });
    });
  }

  dockerStopContainer(containerName) {
    return new Promise((resolve, reject) => {
      const stopContainersCommand =
      `docker compose -f ${parentDirectory}/docker-compose.yaml down ${containerName}`;
      
      // Execute the shell command
      exec(stopContainersCommand, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          console.error(`Error stopping Docker containers: ${error.message}`);
          return;
        }

        console.log(`Stopped Docker container ${containerName}:\n${stdout}`);
        resolve();
      });
    });
  }

  dockerStart() {
    // Define the shell command to stop all Docker containers
    return new Promise((resolve, reject) => {
      const startContainersCommand =
      `docker compose -f ${parentDirectory}/docker-compose.yaml up -d`;

      // Execute the shell command
      exec(startContainersCommand, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          console.error(`Error stopping Docker containers: ${error.message}`);
          return;
        }
        
        console.log(`Started Docker containers:\n${stdout}`);
        resolve();
      });
    });
  }

  dockerStartContainer(containerName) {
    // Define the shell command to stop all Docker containers
    return new Promise((resolve, reject) => {
      const startContainersCommand =
      `docker compose -f ${parentDirectory}/docker-compose.yaml up -d ${containerName}`;

      // Execute the shell command
      exec(startContainersCommand, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          console.error(`Error stopping Docker containers: ${error.message}`);
          return;
        }
        console.log(`Started Docker container ${containerName}:\n${stdout}`);
        resolve();
      });
    });
  }

  getDockerLogs(containerName) 
  {
    // Define the shell command to stop all Docker containers
    return new Promise((resolve, reject) => {
      const stopContainersCommand =
      `docker logs ${containerName} > ${containerName}.txt`;
      
      // Execute the shell command
      exec(stopContainersCommand, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          console.error(`Failed to export the liquid container logs: ${error.message}`);
          return;
        }

        console.log(`Successfully exported the liquid container logs\n${stdout}`);
        resolve();
      });
    });
  } 
}
module.exports = Docker;
