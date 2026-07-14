import { File, Pause, Play, Trash2, X } from "lucide-react";
import { attributes, properties } from "./properties";
import { useDownloadData } from "../../../context/hooks/use";
import { useEffect, useState } from "react";

export const FileWriter = ({url, fileDetail}) => {
  const attr = attributes();
  const prop = properties();

  const Icon = getIcon();
  const progress = 40;
  const fileName = getFileName();
  const fileSize = "02.90 GB";
  const timeLeft = "01:25";
  const speed = "06.50 MB/s";

  const [runningState, setRunningState] = useState("waiting");
  const { downloadState, downloadVideo } = useDownloadData();
  // const [progress, setProgress] = useState(null);

  const toggleRunningState = async() => {
    if(url && runningState==='waiting') {
      downloadVideo(url, fileDetail);
      setRunningState("loading");
    }
  }

  useEffect(()=>{
    console.log(downloadState[url]);
    setRunningState(downloadState[url]?.status||"waiting"); //waiting is present in fileDetails
  }, [downloadState]);

  return (
    <div className="max-w-lg w-full bg-white rounded-xl shadow-md border border-gray-200 p-5 space-y-4 transition-shadow hover:shadow-lg">
      {/* Header: Icon, file name, progress percentage, and action buttons */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <div className="p-2 bg-blue-50 rounded-lg">
            <Icon className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-sm font-medium text-gray-800 truncate">{fileDetail?.fileInfo?.title}</p>
        </div>
        <div className="flex items-center gap-1">
          {
            runningState==='downloading' && <span className="text-sm font-semibold text-gray-700 mr-1">
              {downloadState[url]?.progress?.percent}%
            </span>
          }
          {
            (attr.state.id===1||attr.state.id===2) &&
            <button
              className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-400"
              aria-label="Pause download"
              onClick={toggleRunningState}
            >
              {
                runningState==='downloading'?<Pause className="w-4 h-4 text-gray-600" /> : <Play className="w-4 h-4 text-gray-600" />
              }
            </button>
          }
          
          <button
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-400"
            aria-label="Delete file"
          >
            <Trash2 className="w-4 h-4 text-gray-600" />
          </button>
          <button
            className="p-1.5 rounded-full hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
            aria-label="Close"
          >
            <X className="w-4 h-4 text-gray-600" />
          </button>
        </div>
      </div>

      {/* Progress bar with gradient and smooth transition */}
      {
        runningState==='downloading' ? <ProgressBar progress={downloadState[url]?.progress?.percent} /> : <p>{runningState}</p>
      }
      
      {/* Statistics: file size, time remaining, and speed */}
      <div className="flex items-center justify-between gap-2 text-xs font-medium text-gray-600">
        {
          (runningState==='waiting' || runningState==='complete') ? 
          <div className="px-3 py-1 bg-gray-100 rounded-full whitespace-nowrap">
            {fileDetail?.fileInfo?.filesize||fileDetail?.fileInfo?.filesize_approx}
          </div> : runningState==='downloading' ?
          <div className="px-3 py-1 bg-gray-100 rounded-full whitespace-nowrap">
            {downloadState[url]?.progress?.downloaded}/{downloadState[url]?.progress?.total}
          </div> :
          <></>
        }
        {
          runningState==='downloading' && 
          <div className="px-3 py-1 bg-gray-100 rounded-full whitespace-nowrap">
            {downloadState[url]?.progress?.eta}
          </div>
        }
        {
          runningState==='downloading' && 
          <div className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full whitespace-nowrap font-semibold">
            {downloadState[url]?.progress?.speed}
          </div>
        }
      </div>
    </div>
  );
};

// Helper functions (unchanged, but could be extended with props)
const getIcon = () => {
  const name = 'file';
  const icons = {
    file: File,
    home: File, // Fallback
  };
  return icons[name] || File;
};

const getFileName = () => {
  return 'Linux Mint Cinnamon.iso';
};

// Enhanced progress bar with subtle glow and rounded corners
const ProgressBar = ({ progress }) => {
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden relative">
      <div
        className="h-full rounded-full bg-linear-to-r from-blue-500 to-violet-500 transition-all duration-700 ease-out"
        style={{ width: `${progress}%` }}
      />
      {/* Optional shimmer effect (disabled for simplicity) */}
    </div>
  );
};