import http from 'http';
import { createWorker } from 'tesseract.js';
import { configManager } from './configManager';
import { cloneGit } from './gitManager';

console.log("\n *STARTING* \n");
const configManagerSession = new configManager();
const config = configManagerSession.config;

cloneGit();

const server = http.createServer((req: any, res: any) => {
  console.log("IMPACT");

  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');

  imageRecognition()
    .catch(err => {
      res.end(JSON.stringify(err, null, 2));
      console.error(err);
    })
    .then(el => res.end(el));
});

server.listen(config.port, config.hostname, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});

async function imageRecognition() {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize(config.imgUrl);
  worker.terminate();
  return text;
}

const worker = createWorker({
  logger: (m: any) => console.log(m)
});
