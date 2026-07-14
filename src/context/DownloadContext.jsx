import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { downloadDir } from '@tauri-apps/api/path';
import { createContext, useContext, useEffect, useState } from "react";

export const DownloadContext = createContext(null);

export default function DownloadProvider({ children }) {

  const [downloads, setDownloads] = useState({});
  const [urlQueue, setUrlQueue] = useState({});
  const [completedQueue, setCompletedQueue] = useState({});

  useEffect(() => {
    const unlistenProgress = listen('download-progress', (e) => {
      const { id, ...progress } = e.payload;
      setDownloads(prev => ({
        ...prev,
        [id]: { ...prev[id], progress }
      }));
    });

    const unlistenComplete = listen('download-complete', (e) => {
      const id = e.payload;
      setDownloads(prev => ({
        ...prev,
        // [id]: { ...prev[id], status: 'complete', progress: null }
        [id]: { ...prev[id], status: 'complete' }
      }));
    });

    return () => { unlistenProgress.then(f => f()); unlistenComplete.then(f => f()); };
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
    console.log("Downloading Started...")
    const id = crypto.randomUUID();
    setDownloads(prev => ({ ...prev, [id]: { url, status: 'starting' } }));

    try {
      
      await invoke("download_video", { id, url, outputPath });
    } catch (err) {
      setDownloads(prev => ({ ...prev, [id]: { ...prev[id], status: 'error', error: String(err) } }));
    }
    return id;
  }

  const addUrlToQueue = async(url) => {
    console.log("Adding it now...");

    const fileInfo = await getFileInfo(url);
    // const fileInfo = {};
    const dlDir = await downloadDir();
    const outputPath = `${dlDir}/AYDM/Video/%(title)s.%(ext)s`;
    setUrlQueue(prev => ({
      ...prev,
      [url]: { fileInfo, status: "waiting", outputPath }
    }));

    console.log(urlQueue);
  }

  return (
    <DownloadContext.Provider
      value={{ getFileInfo, downloadVideo, addUrlToQueue, urlQueue }}
    >
      {children}
    </DownloadContext.Provider>
  );
}