import { Plus, X, File, Folder, Music, Image, Archive, MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { isValidUrl } from "../../logic/checkItems"; // keep your validation logic
import { useDownloadData } from "../../context/hooks/use";
import { getCategoryIcon } from "./FileIcons";

export const AddUrlBtn = ({}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [url, setUrl] = useState("");
  const [showDetails, setShowDetails] = useState(false);
  const [category, setCategory] = useState("");

  const { getFileData, addUrlToQueue } = useDownloadData();

  const categories = ["Video", "Music", "Apps", "Pictures", "Compressed", "Others"];
  const [fileData, setFileData] = useState({});

  const handleUrlChange = async(e) => {
    const value = e.target.value;
    setUrl(value);
    if (isValidUrl(value)) {
      setShowDetails(true);
      
      const result = await getFileData(value);
      setFileData(result);
      setCategory(result?.fileInfo?.media_type||"Other");
      console.log(result);
    } else {
      setShowDetails(false);
    }
  };

  const handleSubmit = () => {    
    // Reset and close
    if (isValidUrl(url)){
        setIsOpen(false);
        setUrl("");
        setShowDetails(false);
    
        addUrlToQueue(url, fileData);
    }
  };

  const handleCancel = () => {
    setIsOpen(false);
    setUrl("");
    setShowDetails(false);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-1 left-60 z-40 bg-linear-to-r from-blue-600 to-blue-500 text-white rounded-full p-3 shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
        aria-label="Add URL"
      >
        <Plus className="h-6 w-6" />
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div
          className="fixed top-90 inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm transition-opacity"
          onClick={handleCancel}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 p-6 transform transition-all duration-300 scale-100 opacity-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                <Plus className="h-5 w-5 text-blue-600" />
                Add New Download
              </h2>
              <button
                onClick={handleCancel}
                className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* URL Input */}
            <div className="space-y-4">
              <div>
                <label htmlFor="url-input" className="block text-sm font-medium text-gray-700 mb-1">
                  File URL
                </label>
                <input
                  id="url-input"
                  type="text"
                  value={url}
                  onChange={handleUrlChange}
                  placeholder="https://example.com/file.mp4"
                  className="w-full border border-gray-300 rounded-lg px-4 py-2.5 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  autoFocus
                />
                {url && !isValidUrl(url) && (
                  <p className="mt-1.5 text-sm text-red-500 flex items-center gap-1">
                    <span className="inline-block w-1.5 h-1.5 bg-red-500 rounded-full" />
                    Please enter a valid URL
                  </p>
                )}
              </div>

              {/* Details Panel (shown when URL is valid) */}
              {showDetails && (
                <div className="border-t border-gray-200 pt-4 mt-2">
                  <div className="bg-gray-50 rounded-xl p-4 space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="bg-blue-100 p-2.5 rounded-full shrink-0">
                        <File className="h-5 w-5 text-blue-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-800 truncate">{fileData?.fileInfo?.title}</p>
                        <p className="text-sm text-gray-500">
                          {fileData?.fileInfo?.filesize||fileData?.fileInfo?.filesize_approx} MiB • {category}
                        </p>
                      </div>
                    </div>
                    <div className="text-sm text-gray-600 flex items-center gap-2">
                      <Folder className="h-4 w-4 text-gray-400" />
                      <span>Save to:</span>
                      <code className="bg-gray-200 px-2 py-0.5 rounded text-xs font-mono">
                        {fileData?.outputPath}
                      </code>
                    </div>
                  </div>

                  {/* Category Selection */}
                  <div className="mt-4">
                    <p className="text-sm font-medium text-gray-700 mb-2">Category</p>
                    <div className="flex flex-wrap gap-2">
                      {categories.map((cat) => (
                        <button
                          key={cat}
                          type="button"
                          onClick={() => setCategory(cat)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-full border transition ${
                            category.toLowerCase() === cat.toLowerCase()
                              ? "bg-blue-600 text-white border-blue-600 shadow-sm"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {getCategoryIcon(cat)}
                          {cat}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                onClick={handleCancel}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!showDetails}
                className={`px-5 py-2 text-sm font-medium text-white rounded-lg transition ${
                  showDetails
                    ? "bg-blue-600 hover:bg-blue-700 shadow-sm"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                Add Download
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};