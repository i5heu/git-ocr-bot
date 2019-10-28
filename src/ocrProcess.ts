import ocrImage from "./ocr";
import fs from "fs";
import path from "path";

export default async function ocrProcess(pathToImg: string) {
    try {
        await ocrProcessThing(pathToImg);
    } catch (error) {
        console.log("ERROR:", error);
    }
}

async function ocrProcessThing(pathToImg: string) {
    if (!fs.existsSync(pathToImg)) throw new Error("Img not found");

    const newPath = generateNewPathForFolder(pathToImg);
    if (fs.existsSync(newPath)) throw new Error("Folder already exists!");

    fs.mkdirSync(newPath);

    // create new folder
    const newImgPath = await moveImgIntoFolder(pathToImg, newPath);

    const ocrText = await ocrImage(newImgPath);
    console.log("OCR:::", ocrText);

    await writeTextFileIntoFolder(ocrText, newPath + "/ocrText.txt");
}

/**
 * move img in given folder
 * TODO: handle errors
 *
 * @param {string} pathToImg
 * @param {string} pathOfFolder
 */
async function moveImgIntoFolder(pathToImg: string, pathOfFolder: string): Promise<string> {
    return new Promise(
        (resolve, reject) => {
            const fileName = path.basename(pathToImg);
            const newImgPath = pathOfFolder + "/" + fileName;
            fs.rename(pathToImg,
                newImgPath,
                () => {
                    resolve(newImgPath);
                }
            );
        }
    );
}

/**
 * write Text File Into Folder
 * TODO: handle errors
 *
 * @param {string} pathToImg
 * @param {string} pathOfFolder
 */
async function writeTextFileIntoFolder(text: string, newFilePath: string) {
    new Promise(
        (resolve, reject) => {
            fs.writeFile(newFilePath, text, function (err) {

                if (err) {
                    reject(err);
                    return;
                }

                resolve();
            });
        }
    );
}


function generateNewPathForFolder(pathToImg: string) {
    let newPath = path.dirname(pathToImg);
    newPath += "/";
    newPath += path.basename(pathToImg).split(".").join("-");
    return newPath;
}