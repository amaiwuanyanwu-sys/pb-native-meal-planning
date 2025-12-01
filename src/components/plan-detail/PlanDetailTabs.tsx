interface Tab {
  id: string;
  label: string;
}

interface PlanDetailTabsProps {
  activeTab: string;
  onTabChange: (tabId: string) => void;
}

const tabs: Tab[] = [
  { id: 'all', label: 'All' },
  { id: 'meal-plans', label: 'Meal Plans' },
  { id: 'recipe-box', label: 'Recipe Box' },
  { id: 'additional-resources', label: 'Additional Resources' },
];

const PlanDetailTabs = ({ activeTab, onTabChange }: PlanDetailTabsProps) => {
  return (
    <div className="border-b border-[#DFE3E4] pt-1">
      <div className="flex items-center">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`
              px-4 py-3 text-sm font-semibold transition-colors
              ${
                activeTab === tab.id
                  ? 'border-b-2 border-[#01272E] text-[#244348]'
                  : 'border-b-2 border-transparent text-[#657A7E] hover:text-[#385459]'
              }
            `}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default PlanDetailTabs;
