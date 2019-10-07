import http from 'http';
import { createWorker } from 'tesseract.js';

const hostname = '127.0.0.1';
const port = 3000;

const server = http.createServer((req: any, res: any) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  bob().then(el => res.end('>>>>' + el));
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
  
});

async function  bob (){
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
  worker.terminate();
  return text;
}

const worker = createWorker({
  logger: (m: any) => console.log(m)
});
