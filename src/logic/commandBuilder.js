import { useFileManagerData } from "../context/hooks/use";


export const buildURLCommand = (url) => {
    const { commandOptions } = useFileManagerData();
    const engine = commandOptions.engine==="aria2c" ? 
        `--downloader aria2c --downloader-args "aria2c:-x 16 -s 16 -k 1M"`:""
    return `${commandOptions.base} -N ${commandOptions.connections} ${engine} ${url}`
}