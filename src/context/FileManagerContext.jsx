// src/context/TauriContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core"; // Use "@tauri-apps/api/tauri" if on Tauri v1

export const FileManagerContext = createContext(null);

export default function FileManagerProvider({ children }) {
  const [settings, setSettings] = useState({
    name: "Settings"
  });

    // `yt-dlp -N 8 --downloader aria2c --downloader-args "aria2c:-x 16 -s 16 -k 1M" "${url}"`;
  const [commandOptions, setCommandOptions] = useState({
    name: "CommandOptions",
    base: "yt-dlp", engine: "aria2c", connections: 8
  });


  useEffect(()=>{
    const init = async() => {
      const output1 = await loadJSON("CommandOptions");
      if (output1 && Object.keys(output1).length > 0) setCommandOptions(output1);
    }
    init();
  }, []);

  async function changeJSON(input) {
    const name = input.name;
    await invoke("save_json_file", {
      input, name
    });
    if(name==="CommandOptions") setCommandOptions(input);
  }

  async function loadJSON(name) {
    return await invoke("load_json_file", {
      name
    });
  }

  return (
    <FileManagerContext.Provider
        value={{
          changeJSON, settings, commandOptions, setCommandOptions
      }}
    >
      {children}
    </FileManagerContext.Provider>
  );
}