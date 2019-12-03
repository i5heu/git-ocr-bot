import { createWorker } from "tesseract.js";

/**
 *  TODO: convert img to black and white img (for better recognition)
 */
export default async function ocrImage(url: string) {
  const foo = await imageRecognition(url);
  return foo;
}

async function imageRecognition(url: string) {
  await worker.load();
  await worker.loadLanguage("deu");
  await worker.initialize("deu");
  //TODO check if url can be blob or file path
  const {
    data: { text }
  } = await worker.recognize(url);
  worker.terminate();
  return text;
}

const worker = createWorker({
  logger: (m: any) => console.log(m)
});
