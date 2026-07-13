import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { downloadDir } from '@tauri-apps/api/path';
import { createContext, useContext, useEffect, useState } from "react";

export const DownloadContext = createContext(null);

export default function DownloadProvider({ children }) {
  const [fileInfo, setFileInfo] = useState();
  const [progress, setProgress] = useState(null);
  const [error, setError] = useState(null);
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    const unlistenProgress = listen('download-progress', (e) => setProgress(e.payload));
    const unlistenLog = listen('download-log', (e) =>
      setLogs((prev) => [...prev.slice(-199), e.payload]) // keep last 200 lines
    );
    const unlistenComplete = listen('download-complete', () => setProgress(null));
    return () => {
      unlistenProgress.then(f => f());
      unlistenLog.then(f => f());
      unlistenComplete.then(f => f());
    };
  }, []);

  async function getFileInfo(url) {
    try {
      const results = await invoke("get_file_info", { url });
      if (results && Object.keys(results).length > 0) setFileInfo(results);
    } catch (err) {
      console.error("get_file_info failed:", err);
      setError(String(err));
    }
  }

  async function downloadVideo(url) {
    setError(null);
    try {
      const dlDir = await downloadDir(); // resolves the real OS Downloads folder
      const outputPath = `${dlDir}test/%(title)s.%(ext)s`;
      return await invoke("download_video", { url, outputPath });
    } catch (err) {
      console.error("download_video failed:", err);
      setError(String(err));
      throw err;
    }
  }

  return (
    <DownloadContext.Provider
      value={{ fileInfo, getFileInfo, downloadVideo, progress, error, logs }}
    >
      {children}
    </DownloadContext.Provider>
  );
}