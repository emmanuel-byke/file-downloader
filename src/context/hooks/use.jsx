import { useContext } from "react";
import { FileManagerContext } from "../FileManagerContext";


export const useFileManagerData = () => useContext(FileManagerContext);