import extract from 'extract-zip';
import { merge } from './util';
import * as fs from "fs";

const sourceZip = async () : Promise<string> => {
    const host:NodeJS.Platform = process.platform;

    console.log(`detected OS: ${host}    Arch: ${process.arch}`);

    return `chrome/linux64.zip`;
}

const targetPath = () : string => {
    let path = `${__dirname}/drivers/`;

    if (process.env.PUPPETEER_DRIVER_PATH === undefined) {
        console.log("setting desired driver path using `PUPPETEER_DRIVER_PATH` env variable");
        path = process.env.PUPPETEER_DRIVER_PATH;
    };

    console.log(`installing drivers to: ${path}`);
    return path;
}

export const extractDriver = async () => {
    try {
        const source = await sourceZip();

        console.log("merging fragments together");
        let zipFile = `${__dirname}/${source}`
        await merge(zipFile);

        await extract(source, {dir: targetPath()});

        console.log("cleaning up...");
        fs.unlinkSync(zipFile);
        console.log('Extraction complete');
    } catch (err) {
        console.log(err);
    }
}

console.log("running post install script....");

extractDriver();