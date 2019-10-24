import http from 'http';
import { configManager } from './configManager';
import { cloneGit } from './gitManager';

console.log("\n *STARTING* \n");
const configManagerSession = new configManager();
const config = configManagerSession.config;

cloneGit();

// const server = http.createServer((req: any, res: any) => {
//   console.log("IMPACT");

//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');


// });

// server.listen(config.port, config.hostname, () => {
//   console.log(`Server running at http://${config.hostname}:${config.port}/`);
// });

