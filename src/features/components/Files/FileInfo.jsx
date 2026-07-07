import { invoke } from '@tauri-apps/api/tauri';

export async function fetchMetadata(url) {
  try {
    const jsonString = await invoke('get_video_info', { url });
    const metadata = JSON.parse(jsonString);
    console.log(metadata.title); // Access the video title
    console.log(metadata.thumbnail); // Access the thumbnail URL
    // ... use the metadata to update your UI
  } catch (error) {
    console.error('Failed to get video info:', error);
  }
}