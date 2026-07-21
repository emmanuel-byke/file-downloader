// src/context/TauriContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core"; // Use "@tauri-apps/api/tauri" if on Tauri v1

export const SettingsContext = createContext(null);

export default function SettingsProvider({ children }) {


  return (
    <SettingsContext.Provider
        value={{
          
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}