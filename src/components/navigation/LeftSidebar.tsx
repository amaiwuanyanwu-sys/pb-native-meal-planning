import { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import CollapsibleRailHeader from '../common/CollapsibleRailHeader';
import Avatar from '../common/Avatar';
import RecipeIcon from '../icons/RecipeIcon';
import NutritionPlanIcon from '../icons/NutritionPlanIcon';
import { usePlans } from '../../contexts/PlanContext';

interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  path: string;
  disabled?: boolean;
}

interface LeftSidebarProps {
  isExpanded?: boolean;
  onToggle?: (expanded: boolean) => void;
  onNewPlan?: () => void;
}

const NAV_ITEMS: NavItem[] = [
  {
    id: 'nutrition-plans',
    label: 'All nutrition plans',
    icon: <NutritionPlanIcon sx={{ fontSize: 20 }} />,
    path: '/',
    disabled: false,
  },
  {
    id: 'recipes',
    label: 'All recipes',
    icon: <RecipeIcon sx={{ fontSize: 20 }} />,
    path: '/recipes',
    disabled: false,
  },
];

const LeftSidebar = ({ isExpanded: externalIsExpanded, onToggle }: LeftSidebarProps = {}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [internalIsExpanded, setInternalIsExpanded] = useState(true);
  const { plans } = usePlans();

  // Use external state if provided, otherwise use internal state
  const isExpanded = externalIsExpanded !== undefined ? externalIsExpanded : internalIsExpanded;

  // Get all recent plans sorted by lastAccessedAt (if available) or createdAt
  const recentPlans = useMemo(() => {
    return [...plans]
      .sort((a, b) => {
        const aTime = a.lastAccessedAt || a.createdAt;
        const bTime = b.lastAccessedAt || b.createdAt;
        return new Date(bTime).getTime() - new Date(aTime).getTime();
      });
  }, [plans]);

  const handleToggle = () => {
    const newValue = !isExpanded;
    if (onToggle) {
      onToggle(newValue);
    } else {
      setInternalIsExpanded(newValue);
    }
  };

  const isActive = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  const isPlanActive = (planId: string) => {
    return location.pathname === `/plans/${planId}` || location.pathname.startsWith(`/plans/${planId}/`);
  };

  if (!isExpanded) {
    return (
      <div className="h-full w-[52px] shrink-0 bg-white border-r border-[#DFE3E4] shadow-[0px_2px_4px_0px_rgba(1,39,46,0.1)] flex flex-col transition-all duration-300">
        <CollapsibleRailHeader
          isExpanded={isExpanded}
          onToggle={handleToggle}
          side="left"
        />
        {/* Collapsed Navigation - Just Icons */}
        <nav className="flex-1 overflow-y-auto">
          <ul className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const active = isActive(item.path);
              return (
                <li key={item.id}>
                  <button
                    onClick={() => !item.disabled && navigate(item.path)}
                    className={`w-full flex items-center justify-center p-2 transition-colors ${active
                        ? 'bg-[#01272E] text-white'
                        : item.disabled
                          ? 'text-[#657A7E] opacity-50 cursor-not-allowed'
                          : 'text-[#657A7E] hover:bg-[#F8F9F9]'
                      }`}
                    aria-label={item.label}
                    disabled={item.disabled}
                  >
                    {item.icon}
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    );
  }

  return (
    <div className="h-full w-64 shrink-0 bg-white border-r border-[#DFE3E4] shadow-[0px_2px_4px_0px_rgba(1,39,46,0.1)] flex flex-col transition-all duration-300">
      <CollapsibleRailHeader
        isExpanded={isExpanded}
        onToggle={handleToggle}
        side="left"
      />

      {/* Navigation Items */}
      <nav className="flex-1 overflow-y-auto">
        <ul className="flex flex-col">
          {NAV_ITEMS.map((item) => {
            const active = isActive(item.path);
            return (
              <li key={item.id}>
                <button
                  onClick={() => !item.disabled && navigate(item.path)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm font-medium transition-colors ${active
                      ? 'bg-[#01272E] text-white'
                      : item.disabled
                        ? 'text-[#385459] opacity-50 cursor-not-allowed'
                        : 'text-[#385459] hover:bg-[#F8F9F9]'
                    }`}
                  disabled={item.disabled}
                >
                  <span className={active ? 'text-white' : 'text-[#657A7E]'}>
                    {item.icon}
                  </span>
                  {item.label}
                </button>
              </li>
            );
          })}

          {/* Divider before Recents */}
          <li className="my-2">
            <div className="h-px bg-[#DFE3E4]" />
          </li>

          {/* Recents Section Header */}
          <li className="px-4 py-2">
            <div className="text-xs font-semibold text-[#385459] tracking-wide">
              Recents
            </div>
          </li>

          {/* Recent Nutrition Plans */}
          {recentPlans.map((plan) => {
            const active = isPlanActive(plan.id);
            return (
              <li key={plan.id}>
                <button
                  onClick={() => navigate(`/plans/${plan.id}`)}
                  className={`w-full flex items-center gap-3 px-4 py-2 text-sm font-medium transition-colors ${active
                      ? 'bg-[#01272E] text-white'
                      : 'text-[#385459] hover:bg-[#F8F9F9]'
                    }`}
                  title={plan.title}
                >
                  <Avatar
                    imageUrl={plan.avatarUrl}
                    name={plan.ownerName}
                    size="sm"
                  />
                  <span className="truncate">{plan.title}</span>
                </button>
              </li>
            );
          })}

          {recentPlans.length === 0 && (
            <li className="px-4 py-2">
              <p className="text-xs text-[#96A5A8]">No recent plans</p>
            </li>
          )}
        </ul>
      </nav>
    </div>
  );
};

export default LeftSidebar;
