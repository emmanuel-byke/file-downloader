import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FileManagerProvider from "./context/FileManagerContext";
import DownloadProvider from "./context/DownloadContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>

    <FileManagerProvider>
    <DownloadProvider>
      <App />
    </DownloadProvider>
    </FileManagerProvider>

  </React.StrictMode>,
);
