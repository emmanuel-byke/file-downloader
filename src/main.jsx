import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FileManagerProvider from "./context/FileManagerContext";
import DownloadProvider from "./context/DownloadContext";
import SettingsProvider from "./context/SettingsContext";
import VariableProvider from "./context/VariableContext";
import PrivancyProvider from "./context/PrivancyContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <FileManagerProvider>
    <SettingsProvider>
    <DownloadProvider>
    <VariableProvider>
    <PrivancyProvider>
      <App />
    </PrivancyProvider>
    </VariableProvider>
    </DownloadProvider>
    </SettingsProvider>
    </FileManagerProvider>

  </React.StrictMode>,
);
