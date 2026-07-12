import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FileManagerProvider from "./context/FileManagerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <FileManagerProvider>
      <App />
    </FileManagerProvider>
    
  </React.StrictMode>,
);
