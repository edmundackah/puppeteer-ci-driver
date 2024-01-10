const splitFile = require('split-file');
import * as fs from "fs";

// 10000000   10MB in bytes
const maxSize = 10000000;

export const split = async (file: string, dest: string) : Promise<string[]> => {
    try {
        return await splitFile.splitFileBySize(file, maxSize, dest);
    } catch (err) {
        console.log(err);
    }
}

export const merge = async (dest: string) : Promise<void> => {
    const names: string[] = [];
    
    fs.readdirSync(fragmentSource()).forEach(file => {
        names.push(`${fragmentSource()}${file}`);
    });
    console.log(`dest: ${dest}`);
    console.log(`fragments: ${names}`);

    await splitFile.mergeFiles(names, dest);
}

export const fragmentSource = () : string => {
    const host:NodeJS.Platform = process.platform;

    if (host === 'linux') {
        return `chrome/${host}64/`;
    } else if (host === "win32" && process.arch === "x64") {
        return "chrome/win64/";
    } else throw Error(`Host OS: ${host}    Arch: ${process.arch} is not supported`);
}