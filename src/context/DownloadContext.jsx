import { listen } from '@tauri-apps/api/event';
import { invoke } from '@tauri-apps/api/core';
import { downloadDir } from '@tauri-apps/api/path';
import { createContext, useContext, useEffect, useState } from "react";

export const DownloadContext = createContext(null);

export default function DownloadProvider({ children }) {

  const [downloadState, setDownloadState] = useState({});
  const [urlQueue, setUrlQueue] = useState({});
  const [completedQueue, setCompletedQueue] = useState({});

  useEffect(() => {
    const unlistenProgress = listen('download-progress', (e) => {
      const { id, ...progress } = e.payload;
      setDownloadState(prev => ({
        ...prev,
        [id]: { ...prev[id], status: 'downloading', progress }
      }));
    });

    const unlistenComplete = listen('download-complete', (e) => {
      const id = e.payload;
      setDownloadState(prev => ({
        ...prev,
        // [id]: { ...prev[id], status: 'complete', progress: null }
        [id]: { ...prev[id], status: 'complete' }
      }));
    });

    return () => { unlistenProgress.then(f => f()); unlistenComplete.then(f => f()); };
  }, []);

  async function getFileInfo(url) {
    return await invoke("get_file_info", { url });
  }

  async function downloadVideo(url, fileData) {
    console.log("Downloading Started...")
    const id = crypto.randomUUID();
    setDownloadState(prev => ({ ...prev, [id]: { url, status: 'starting' } }));
    try {
      await invoke("download_video", { id: url, url, outputPath: fileData?.outputPath });
    } catch (err) {
      setDownloadState(prev => ({ ...prev, [id]: { ...prev[id], status: 'error', error: String(err) } }));
    }
    return id;
  }

  const getFileData = async(url) => {
    const fileInfo = await getFileInfo(url);
    const dlDir = await downloadDir();
    const outputPath = `${dlDir}/AYDM/Video/%(title)s.%(ext)s`;
    return { fileInfo, status: "waiting", outputPath, attr: {category: "File"} }
  }

  const addUrlToQueue = async(url, fileDetail) => {
    setUrlQueue(prev => ({
      ...prev,
      [url]: fileDetail
    }));

    console.log(urlQueue);
    //use Object.entries(urlQueue).map(([url, fileDetail])
  }

  return (
    <DownloadContext.Provider
      value={{ getFileInfo, getFileData, downloadVideo, downloadState, addUrlToQueue, urlQueue }}
    >
      {children}
    </DownloadContext.Provider>
  );
}