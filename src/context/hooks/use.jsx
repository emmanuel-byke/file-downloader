import { useContext } from "react";
import { FileManagerContext } from "../FileManagerContext";
import { DownloadContext } from "../DownloadContext";
import { VariableContext } from "../VariableContext";
import { SettingsContext } from "../SettingsContext";
import { PrivancyContext } from "../PrivancyContext";


export const useFileManagerData = () => useContext(FileManagerContext);
export const useDownloadData = () => useContext(DownloadContext);
export const useVariableData = () => useContext(VariableContext);
export const useSettingsData = () => useContext(SettingsContext);
export const usePrivancyData = () => useContext(PrivancyContext);