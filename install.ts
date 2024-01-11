import extract from 'extract-zip';
import { merge } from './util';
import * as fs from "fs";

const sourceZip = async () : Promise<string> => {
    const host:NodeJS.Platform = process.platform;

    console.log(`detected OS: ${host}    Arch: ${process.arch}`);

    return `chrome/linux64.zip`;
}

const targetPath = () : string => {
    if (process.env.PUPPETEER_DRIVER_PATH === undefined) {
        throw Error("set desired driver path using `PUPPETEER_DRIVER_PATH` env variable");
    }

    console.log(`installing drivers to: ${process.env.PUPPETEER_DRIVER_PATH}`);
    return process.env.PUPPETEER_DRIVER_PATH;
}

export const extractDriver = async () => {
    try {
        const source = await sourceZip();
        let zipFile = `${__dirname}/${source}`

        console.log(`merging fragments together at: ${zipFile}`);
        await merge(zipFile);

        console.log(`source: ${source}`);

        await extract(zipFile, {dir: targetPath()});

        console.log("cleaning up...");
        fs.unlinkSync(zipFile);
        console.log('Extraction complete');
    } catch (err) {
        console.log(err);
    }
}

console.log("running post install script....");

extractDriver();
