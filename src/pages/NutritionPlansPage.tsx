import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { NutritionPlan } from '../types/nutrition';
import { usePlans } from '../contexts/PlanContext';
import MainTemplate from '../components/layout/MainTemplate';
import LeftSidebar from '../components/navigation/LeftSidebar';
import NutritionPlansHeader from '../components/nutrition-plans/NutritionPlansHeader';
import NutritionPlanListItem from '../components/nutrition-plans/NutritionPlanListItem';
import TabControlPanel from '../components/common/TabControlPanel';

type NutritionPlanTab = 'all' | 'shared' | 'draft';

const NutritionPlansPage = () => {
  const navigate = useNavigate();
  const { plans, accessPlan, addPlan, deletePlan } = usePlans();
  const [isLeftSidebarExpanded, setIsLeftSidebarExpanded] = useState(true);
  const [activeTab, setActiveTab] = useState<NutritionPlanTab>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const tabs = [
    { id: 'all' as NutritionPlanTab, label: 'All' },
    { id: 'shared' as NutritionPlanTab, label: 'Shared' },
    { id: 'draft' as NutritionPlanTab, label: 'Draft' },
  ];

  // Filter and sort plans by tab and search query
  const filteredPlans = useMemo(() => {
    let filtered = plans;

    // Filter by tab
    if (activeTab === 'shared') {
      filtered = filtered.filter(plan => plan.visibility === 'shared');
    } else if (activeTab === 'draft') {
      filtered = filtered.filter(plan => plan.visibility === 'draft' || !plan.visibility);
    }
    // 'all' shows everything

    // Filter by search
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter((plan) => (
        plan.title.toLowerCase().includes(query) ||
        plan.ownerName?.toLowerCase().includes(query) ||
        plan.dietaryPreferences?.toLowerCase().includes(query) ||
        plan.goals?.toLowerCase().includes(query)
      ));
    }

    // Sort alphabetically by title
    return [...filtered].sort((a, b) => a.title.localeCompare(b.title));
  }, [searchQuery, plans, activeTab]);

  const handlePlanClick = (plan: NutritionPlan) => {
    accessPlan(plan.id);
    navigate(`/plans/${plan.id}`);
  };

  const handleNewPlan = () => {
    const now = new Date().toISOString();
    const newPlan: NutritionPlan = {
      id: `plan-${Date.now()}`,
      title: 'Untitled nutrition plan',
      plansCount: 0,
      recipesCount: 0,
      avatarUrl: null,
      ownerName: '',
      status: 'active',
      createdAt: now,
      lastAccessedAt: now,
    };

    addPlan(newPlan);
    navigate(`/plans/${newPlan.id}`);
  };

  const handleDeletePlan = (plan: NutritionPlan) => {
    if (window.confirm(`Are you sure you want to delete "${plan.title}"?`)) {
      deletePlan(plan.id);
    }
  };

  return (
    <MainTemplate
      leftSidebar={
        <LeftSidebar
          isExpanded={isLeftSidebarExpanded}
          onToggle={setIsLeftSidebarExpanded}
          onNewPlan={handleNewPlan}
        />
      }
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <NutritionPlansHeader onNewClick={handleNewPlan} />

        {/* Tabs and Search */}
        <TabControlPanel
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search nutrition plans..."
        />

        {/* All Plans List */}
        <div className="border border-gray-200 rounded-lg overflow-hidden bg-white">
          {filteredPlans.length === 0 ? (
            <div className="p-8 text-center text-slate-600">
              {searchQuery ? 'No plans match your search' : 'No plans found'}
            </div>
          ) : (
            filteredPlans.map((plan) => (
              <NutritionPlanListItem
                key={plan.id}
                plan={plan}
                onClick={handlePlanClick}
                onDelete={handleDeletePlan}
              />
            ))
          )}
        </div>
      </div>
    </MainTemplate>
  );
};

export default NutritionPlansPage;
