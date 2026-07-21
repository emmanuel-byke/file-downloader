// src/context/TauriContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core"; // Use "@tauri-apps/api/tauri" if on Tauri v1

export const VariableContext = createContext(null);

export default function VariableProvider({ children }) {
  const [dispMode, setDispMode] = useState('home') //home, settings, privancy ...
  


  return (
    <VariableContext.Provider
        value={{
          dispMode, setDispMode
      }}
    >
      {children}
    </VariableContext.Provider>
  );
}