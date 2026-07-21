// src/context/TauriContext.jsx
import { createContext, useContext, useEffect, useState } from "react";
import { invoke } from "@tauri-apps/api/core"; // Use "@tauri-apps/api/tauri" if on Tauri v1
import { useFileManagerData } from "./hooks/use";

export const PrivancyContext = createContext(null);

export default function PrivancyProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [currentUserData, setCurrentUserData] = useState(null);
  const [availableUsers, setAvailableUsers] = useState({});
  const { changeJSON, loadJSON } = useFileManagerData();
  
  useEffect(()=>{
    const init = async() => {
      const response = await loadJSON('availableUsers');
      setAvailableUsers(response);
    }
    init();
  }, [])

  const createAccount = async (username, password) => {
    if (availableUsers && Object.keys(availableUsers).length > 0 && Object.keys(availableUsers).includes(username)) {
      console.log('user found... Update Password algorithm');
    } else {
      await saveData({
        ...availableUsers,
        name: 'availableUsers',
        [username]: {password, data: {}}
      })
      setCurrentUser(username);
      setCurrentUserData({});
    }
  }

  const login = async (username, password) => {
    if (
      Object.hasOwn(availableUsers, username) && 
      availableUsers[username]?.password === password
    ) {
      setCurrentUser(username);
      setCurrentUserData(availableUsers[username]);
      return availableUsers[username];
    }
    setCurrentUser(null);
    setCurrentUserData(null);
    return false;
  }

  const saveData = async (data) => {
    // return await changeJSON(data);
  }

  const addData = async (data) => {

  }

  const removeData = async (data) => {

  }
  


  return (
    <PrivancyContext.Provider
        value={{
          createAccount, login, saveData, addData, removeData
      }}
    >
      {children}
    </PrivancyContext.Provider>
  );
}