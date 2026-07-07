// components/AddURL.jsx
import { Folder, X } from 'lucide-react';
import { useState } from 'react';
import { getCurrentWindow } from '@tauri-apps/api/window';

export const AddURL = () => {
  const [url, setUrl] = useState('');
  const [name, setName] = useState('');
  const [saveTo, setSaveTo] = useState('');
  const [mode, setMode] = useState('url');
  const [rememberPath, setRememberPath] = useState(false);
  const [category, setCategory] = useState('');

  const categories = ['Software', 'Movie', 'Music', 'Pictures', 'Compressed', 'Others'];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // 1. Perform your save logic here (e.g., send to backend)
    console.log('URL submitted:', { url, name, saveTo, mode, rememberPath, category });
    
    // 2. Safely close the window after processing
    await closeWindow(); 
  };

  const closeWindow = async () => {
    try {
      // If you are on Tauri v2:
      const currentWindow = getCurrentWindow();
      await currentWindow.close();

      // If you are on Tauri v1, uncomment the line below instead:
      // await appWindow.close();
    } catch (error) {
      console.error('Failed to close window:', error);
    }
  };

  return (
    <div className="min-w-lg h-screen mx-auto p-6 bg-white shadow-lg border border-gray-100">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        Add a new {mode === 'url' ? 'URL' : 'Torrent'}
      </h2>

      {/* Mode Toggle */}
      <div className="flex rounded-md overflow-hidden border border-gray-200 mb-6">
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === 'url'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setMode('url')}
        >
          URL
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-medium transition-colors ${
            mode === 'torrent'
              ? 'bg-blue-600 text-white'
              : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
          }`}
          onClick={() => setMode('torrent')}
        >
          Torrent
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* URL / Torrent input */}
        <div>
          <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-1">
            {mode === 'url' ? 'URL' : 'Magnet Link or Torrent File'}
          </label>
          <input
            id="url-input"
            type={mode === 'url' ? 'url' : 'text'}
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder={mode === 'url' ? 'https://example.com/file.mp4' : 'magnet:?xt=urn:btih:...'}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Save to */}
        <div>
          <label htmlFor="save-to" className="block text-sm font-medium text-gray-700 mb-1">
            Save to
          </label>
          <div className="flex items-center gap-2">
            <input
              id="save-to"
              type="text"
              value={saveTo}
              onChange={(e) => setSaveTo(e.target.value)}
              placeholder="/path/to/download/folder"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            />
            <button
              type="button"
              className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition"
              aria-label="Browse folder"
            >
              <Folder className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Remember location checkbox */}
        <div className="flex items-center">
          <input
            id="remember-path"
            type="checkbox"
            checked={rememberPath}
            onChange={(e) => setRememberPath(e.target.checked)}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="remember-path" className="ml-2 text-sm text-gray-700">
            Remember this location for future downloads
          </label>
        </div>

        {/* Rename */}
        <div>
          <label htmlFor="rename" className="block text-sm font-medium text-gray-700 mb-1">
            Rename (optional)
          </label>
          <input
            id="rename"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Custom filename"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
          />
        </div>

        {/* Category */}
        <div>
          <span className="block text-sm font-medium text-gray-700 mb-2">Category</span>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-1 text-sm rounded-full border transition ${
                  category === cat
                    ? 'bg-blue-600 text-white border-blue-600'
                    : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
          <button
            type="button"
            onClick={closeWindow}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};