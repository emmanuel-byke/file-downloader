// hooks/useAddURLDialog.ts
import { WebviewWindow } from '@tauri-apps/api/webviewWindow'; // Tauri v2

export const useAddURLDialog = () => {
  const openURLDialog = async () => {
    // Check if window already exists
    const existingWindow = await WebviewWindow.getByLabel('addURL');
    if (existingWindow) {
      await existingWindow.setFocus();
      return;
    }

    // Create new window
    const addURLWindow = new WebviewWindow('addURL', {
      url: 'index.html#/addURL', // your route
      title: 'Add URL',
      width: 600,
      height: 565,
      resizable: true,
      center: true,
    });

    addURLWindow.once('tauri://created', () => {
      console.log('Add URL window created');
    });

    addURLWindow.once('tauri://error', (e) => {
      console.error('Failed to create window:', e);
    });
  };

  return { openURLDialog };
};