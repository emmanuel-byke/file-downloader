import { Menu, Pause, Play, Plus, Settings } from "lucide-react";
import { useAddURLDialog } from "../../../context/hooks/useAddURLDialog";
import { useDownloadData } from "../../../context/hooks/use";

export const HeaderNav = ({ setShowSidePanel }) => {
  const { openURLDialog } = useAddURLDialog();

  const { urlQueue } = useDownloadData();
  const btnClicked = () => {
    console.log("Hello");
    console.log(urlQueue);
  }

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md border-b border-gray-200/70 dark:border-gray-700/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Left – Menu toggle */}
          <div className="flex items-center">
            <NavCustomButton
              icon={Menu}
              aria-label="Toggle sidebar"
              onClick={() => setShowSidePanel((prev) => !prev)}
              tooltip="Toggle sidebar"
            />
          </div>

          {/* Center – Action buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            <NavCustomButton
              name="Add URL"
              icon={Plus}
              onClick={openURLDialog}
              primary
            />
            <NavCustomButton name="Pause All" icon={Pause} onClick={btnClicked} />
            <NavCustomButton name="Resume All" icon={Play} />
          </div>

          {/* Right – Settings */}
          <div className="flex items-center">
            <NavCustomButton
              name="Settings"
              icon={Settings}
              aria-label="Open settings"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

/**
 * A polished, reusable navigation button with icon, optional label, and tooltip.
 * Supports primary variant for call-to-action.
 */
const NavCustomButton = ({
  name,
  icon: Icon,
  primary = false,
  tooltip,
  className = '',
  ...props
}) => {
  return (
    <button
      className={`
        relative group inline-flex flex-col items-center justify-center
        px-3 py-1.5 rounded-xl
        text-sm font-medium
        transition-all duration-200 ease-out
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        dark:focus:ring-offset-gray-900
        ${
          primary
            ? 'bg-blue-600 text-white shadow-sm hover:bg-blue-700 hover:shadow-md active:bg-blue-800'
            : 'text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white hover:bg-gray-100/70 dark:hover:bg-gray-800/50'
        }
        ${className}
      `}
      {...props}
    >
      <Icon
        className={`
          w-6 h-6 transition-transform duration-200
          ${primary ? 'text-white' : 'text-current'}
          group-hover:scale-110
        `}
      />
      {name && (
        <span
          className={`
            mt-0.5 text-[11px] leading-none font-medium
            ${primary ? 'text-white/90' : 'text-gray-500 dark:text-gray-400'}
          `}
        >
          {name}
        </span>
      )}
      {/* Tooltip fallback for icon-only buttons */}
      {!name && tooltip && (
        <span className="absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-0.5 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {tooltip}
        </span>
      )}
    </button>
  );
};