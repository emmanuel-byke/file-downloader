// src/context/TauriContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core"; // Use "@tauri-apps/api/tauri" if on Tauri v1

export const FileManagerContext = createContext(null);

export default function FileManagerProvider({ children }) {
  const [settings, setSettings] = useState({
    name: "Emmanuel"
  });

  useEffect(()=>{
    const init = async() => {
      await loadSettings();
    }
    init();
  }, []);

  async function changeSettings(newSettings) {
    setSettings(newSettings);
    await invoke("save_settings", {
      settings: newSettings,
    });
  }

  async function loadSettings() {
    const output = await invoke("load_settings");
    if (output && Object.keys(output).length > 0) {
      setSettings(output);
    }
  }

  return (
    <FileManagerContext.Provider
        value={{
          changeSettings, settings
      }}
    >
      {children}
    </FileManagerContext.Provider>
  );
}