import { TabsProps } from '../../types/nutrition';

const Tabs = ({ tabs, activeTab, onChange }: TabsProps) => {
  return (
    <div className="flex gap-3" role="tablist">
      {tabs.map((tab) => {
        const isActive = activeTab === tab.id;

        return (
          <button
            key={tab.id}
            role="tab"
            aria-selected={isActive}
            onClick={() => onChange(tab.id)}
            className={`
              px-4 py-2.5 text-base font-semibold transition-colors duration-200 relative
              ${isActive ? 'text-[#01272E]' : 'text-slate-600 hover:text-[#01272E]'}
            `}
          >
            {tab.label}
            {isActive && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#01272E]" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default Tabs;
