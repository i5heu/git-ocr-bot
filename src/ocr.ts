
import { createWorker } from 'tesseract.js';

async function ocrImage(url: string){
  const foo = await imageRecognition(url);
}

async function imageRecognition(url: string) {
  await worker.load();
  await worker.loadLanguage('eng');
  await worker.initialize('eng');
  //TODO check if url can be blob or file path
  const { data: { text } } = await worker.recognize(url);
  worker.terminate();
  return text;
}

const worker = createWorker({
  logger: (m: any) => console.log(m)
});
