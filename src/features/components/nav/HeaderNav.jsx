import { Menu, Pause, Play, Plus, Settings } from "lucide-react";

export const HeaderNav = ({setShowSidePanel}) => {
  return (
    <nav className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow-sm rounded-xl border border-gray-100 dark:border-gray-800">
      {/* Left side – Menu */}
      <div>
        <NavCustomButton icon={Menu} aria-label="Open menu" onClick={()=>setShowSidePanel(prev=>!prev)} />
      </div>

      {/* Center – Action buttons */}
      <div className="flex items-center gap-2">
        <NavCustomButton name="Add URL" icon={Plus} />
        <NavCustomButton name="Pause All" icon={Pause} />
        <NavCustomButton name="Resume All" icon={Play} />
      </div>

      {/* Right side – Settings */}
      <div>
        <NavCustomButton name="Settings" icon={Settings} />
      </div>
    </nav>
  );
};

/**
 * A reusable navigation button with an icon and optional label.
 * Handles hover, active, and focus states for a polished feel.
 */
const NavCustomButton = ({ name, icon, ...props }) => {
  const Icon = icon; // Capitalize for JSX usage

  return (
    <button
      className={`
        flex flex-col items-center gap-2 px-3 py-2 text-sm font-medium
        text-gray-700 dark:text-gray-200
        rounded-lg transition-all duration-200 ease-in-out
        hover:bg-gray-100 dark:hover:bg-gray-800
        hover:scale-105 active:scale-95
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900
      `}
      {...props}
    >
      <Icon className="w-7 h-7" />
      <p className="text-sm">{name && <span>{name}</span>}</p>
    </button>
  );
};