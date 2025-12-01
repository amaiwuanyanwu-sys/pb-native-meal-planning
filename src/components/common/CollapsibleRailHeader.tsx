import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';

interface CollapsibleRailHeaderProps {
  isExpanded: boolean;
  onToggle: () => void;
  side: 'left' | 'right';
}

const CollapsibleRailHeader = ({
  isExpanded,
  onToggle,
  side,
}: CollapsibleRailHeaderProps) => {
  // Determine icon rotation and tooltip text based on expanded state and side
  const getIconRotation = () => {
    if (side === 'left') {
      return isExpanded ? '' : 'rotate(180deg)'; // Expanded: left arrow, Collapsed: right arrow
    } else {
      return isExpanded ? 'rotate(180deg)' : ''; // Expanded: right arrow, Collapsed: left arrow
    }
  };

  const getTooltipText = () => {
    if (side === 'left') {
      return isExpanded ? 'Collapse sidebar' : 'Expand sidebar';
    } else {
      return isExpanded ? 'Collapse sidebar' : 'Expand sidebar';
    }
  };

  const getTooltipPosition = () => {
    if (side === 'left') {
      return isExpanded ? 'right-full mr-2' : 'left-full ml-2';
    } else {
      return isExpanded ? 'left-full ml-2' : 'right-full mr-2';
    }
  };

  // For left side, we want the icon on the far right
  if (side === 'left') {
    return (
      <div className="relative group">
        <button
          onClick={onToggle}
          className="h-10 w-full border-b border-[#DFE3E4] flex items-center justify-end px-3 shrink-0 hover:bg-[#F8F9F9] transition-colors cursor-pointer"
          aria-label={getTooltipText()}
        >
          <KeyboardDoubleArrowLeftIcon
            sx={{ fontSize: 20, transform: getIconRotation() }}
            className="text-[#657A7E]"
          />
        </button>
        {/* Tooltip */}
        <div
          className={`absolute ${getTooltipPosition()} top-1/2 -translate-y-1/2 px-2 py-1.5 bg-[#01272E] text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50`}
        >
          {getTooltipText()}
        </div>
      </div>
    );
  }

  // For right side, make the whole bar clickable
  return (
    <div className="relative group">
      <button
        onClick={onToggle}
        className="h-10 w-full border-b border-[#DFE3E4] flex items-center justify-left px-3 shrink-0 hover:bg-[#F8F9F9] transition-colors cursor-pointer"
        aria-label={getTooltipText()}
      >
        <KeyboardDoubleArrowLeftIcon
          sx={{ fontSize: 20, transform: getIconRotation() }}
          className="text-[#657A7E]"
        />
      </button>
      {/* Tooltip */}
      <div
        className={`absolute ${getTooltipPosition()} top-1/2 -translate-y-1/2 px-2 py-1.5 bg-[#01272E] text-white text-xs rounded shadow-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50`}
      >
        {getTooltipText()}
      </div>
    </div>
  );
};

export default CollapsibleRailHeader;
