import { split } from "./util";

console.log(`detected OS: ${process.platform}    Arch: ${process.arch}`);

split("chrome-linux64.zip", "chrome/linux64").then((i) => {
    console.log(i);
});