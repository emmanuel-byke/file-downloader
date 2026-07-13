import { useContext } from "react";
import { FileManagerContext } from "../FileManagerContext";
import { DownloadContext } from "../DownloadContext";


export const useFileManagerData = () => useContext(FileManagerContext);
export const useDownloadData = () => useContext(DownloadContext);