import { CircleCheck, Clock, File, Menu, Music, Notebook, Pause, Play, Plus, Settings } from "lucide-react";
import { useState } from "react";
import { BiMovie } from "react-icons/bi";
import { CgSoftwareDownload } from "react-icons/cg";
import { useVariableData } from "../../../context/hooks/use";

export const SideNav = ({ showSidePanel, setShowSidePanel }) => {
  const [currentTask, setCurrentTask] = useState(1);
  const { dispMode, setDispMode } = useVariableData();
  const tasks = [
    { Icon: Notebook, name: 'All', id: 1 },
    { Icon: Play, name: 'Running', id: 2 },
    { Icon: Pause, name: 'Paused', id: 3 },
    { Icon: CircleCheck, name: 'Completed', id: 4 },
  ];

  const [currentSchedule, setCurrentSchedule] = useState(1);
  const schedules = [
    { Icon: Notebook, name: 'Default', id: 1 },
    { Icon: Clock, name: 'Waiting', id: 2 },
    { Icon: CircleCheck, name: 'Completed', id: 3 },
  ];

  const [currentTag, setCurrentTag] = useState(1);
  const tags = [
    { Icon: Notebook, name: 'All', id: 1 },
    { Icon: CgSoftwareDownload, name: 'Software', id: 2 },
    { Icon: Music, name: 'Music', id: 3 },
    { Icon: BiMovie, name: 'Movie', id: 4 },
    { Icon: File, name: 'Others', id: 5 },
  ];

  return (
    <nav
      className={`flex flex-col justify-between h-full overflow-y-auto bg-white border-r border-gray-200 shadow-sm transition-all duration-300 ease-in-out ${
        showSidePanel ? 'w-64 px-5 py-6' : 'hidden'
      }`}
    >
      <div className="flex flex-col gap-8">
        <NavItems title="Tasks" items={tasks} currentItem={currentTask} setCurrentItem={setCurrentTask} />
        <NavItems title="Schedules" items={schedules} currentItem={currentSchedule} setCurrentItem={setCurrentSchedule} />
        <NavItems title="Tags" items={tags} currentItem={currentTag} setCurrentItem={setCurrentTag} />
      </div>

      {/* Optional footer / user section */}
      <div className="pt-4 border-t border-gray-200">
        <button 
          className="flex items-center gap-3 px-3 py-2 w-full rounded-lg text-sm text-gray-600 hover:bg-gray-50 transition-colors"
          onClick={()=>setDispMode('privancy')}
        >
          <Settings className="w-4 h-4" />
          <span>Privancy</span>
        </button>
      </div>
    </nav>
  );
};

const NavItems = ({ title, items, currentItem, setCurrentItem }) => {
  return (
    <div>
      <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">{title}</h3>
      <div className="flex flex-col space-y-1">
        {items.map((item) => {
          const isActive = currentItem === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setCurrentItem(item.id)}
              className={`
                relative flex items-center gap-3 px-3 py-2 w-full text-sm rounded-lg transition-all duration-200
                ${isActive 
                  ? 'bg-indigo-50 text-indigo-700 font-medium' 
                  : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }
              `}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-indigo-600 rounded-r-full" />
              )}
              <item.Icon className={`w-4 h-4 ${isActive ? 'text-indigo-600' : 'text-gray-400'}`} />
              <span>{item.name}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};