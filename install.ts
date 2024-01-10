import extract from 'extract-zip';
import { merge } from './util';

const target = "C:/Users/Quest/Documents/GitHub/puppeteer-ci-driver/drivers";

const sourceZip = () : string => {
    const host:NodeJS.Platform = process.platform;

    console.log(`detected OS: ${host}    Arch: ${process.arch}`);

    if (host === 'linux') {
        return `chrome/chrome-${host}64.zip`;
    } else if (host === "win32" && process.arch === "x64") {
        return "chrome/chrome-win64.zip";
    } else throw Error(`Host OS: ${host}    Arch: ${process.arch} is not supported`);
}

const targetPath = () : string => {
    console.log(process.env.PUPPETEER_DRIVER_PATH);

    if (process.env.PUPPETEER_DRIVER_PATH == undefined) {
        throw Error("set desired driver path using `PUPPETEER_DRIVER_PATH` env variable");
    } else return process.env.PUPPETEER_DRIVER_PATH;
}

export const extractDriver = async () => {
    console.log("merging fragments together");

    await merge(`${__dirname}/${sourceZip()}`);

    if (process.env.CI_DRIVER_SKIP_SETUP !== "false" || process.env.CI_DRIVER_SKIP_SETUP === undefined) {
        try {
            await extract(sourceZip(), {dir: targetPath()});
            console.log('Extraction complete');
        } catch (err) {
            console.log(err);
        }
    } else console.log(`Skipping driver extraction. 'CI_DRIVER_SKIP_SETUP' is set to ${process.env.CI_DRIVER_SKIP_SETUP}`);
}

console.log("running post install script....");

extractDriver();