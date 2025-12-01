import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { usePlans } from '../contexts/PlanContext';
import MainTemplate from '../components/layout/MainTemplate';
import LeftSidebar from '../components/navigation/LeftSidebar';
import Avatar from '../components/common/Avatar';
import Button from '../components/common/Button';
import PlanDetailTabs from '../components/plan-detail/PlanDetailTabs';
import MealPlanCard from '../components/plan-detail/MealPlanCard';
import RecipeCard from '../components/common/RecipeCard';
import RecipeCardSmall from '../components/plan-detail/RecipeCard';
import PlanDetailSidebar from '../components/plan-detail/PlanDetailSidebar';
import AddIcon from '@mui/icons-material/Add';
import ShareIcon from '@mui/icons-material/Share';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import FilePresentIcon from '@mui/icons-material/FilePresentOutlined';
import WizardIcon from '../components/icons/WizardIcon';
import DashboardCustomizeIcon from '@mui/icons-material/DashboardCustomize';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import EditIcon from '@mui/icons-material/Edit';

const PlanDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getPlanById, updatePlan } = usePlans();
  const [activeTab, setActiveTab] = useState('all');
  const [isLeftSidebarExpanded, setIsLeftSidebarExpanded] = useState(true);
  const [isSidebarExpanded, setIsSidebarExpanded] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [openOwnerDropdown, setOpenOwnerDropdown] = useState(false);
  const [focusField, setFocusField] = useState<string | undefined>(undefined);

  const plan = getPlanById(id || '');

  // Reset openOwnerDropdown after edit mode is exited
  useEffect(() => {
    if (!editMode) {
      setOpenOwnerDropdown(false);
    }
  }, [editMode]);

  if (!plan) {
    return null;
  }

  const handleStartAssistant = () => {
    navigate(`/plans/${plan.id}/assistant`);
  };

  const handleAddClient = () => {
    setEditMode(true);
    setOpenOwnerDropdown(true);
    if (!isSidebarExpanded) {
      setIsSidebarExpanded(true);
    }
  };

  const handleNewPlan = () => {
    // Navigate to the most recently created plan
    navigate('/');
  };

  // Check if plan has any content
  const hasContent =
    (plan.mealPlans && plan.mealPlans.length > 0) ||
    (plan.recipes && plan.recipes.length > 0) ||
    plan.dietaryPreferences ||
    plan.goals ||
    plan.medicalConditions ||
    plan.exclusions;

  // Empty state - show onboarding
  if (!hasContent) {
    return (
      <MainTemplate
        leftSidebar={
          <LeftSidebar
            isExpanded={isLeftSidebarExpanded}
            onToggle={setIsLeftSidebarExpanded}
            onNewPlan={handleNewPlan}
          />
        }
        rightSidebar={
          <PlanDetailSidebar
            plan={plan}
            isExpanded={isSidebarExpanded}
            onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
            onUpdatePlan={(updates) => updatePlan(plan.id, updates)}
            editMode={editMode}
            onEditModeChange={setEditMode}
            openOwnerDropdown={openOwnerDropdown}
            focusFieldProp={focusField}
          />
        }
      >
        <div className="flex flex-col gap-6">
            {/* Header */}
            <div className="flex items-center gap-4">
              {plan.ownerName && plan.ownerName !== 'Unassigned' ? (
                <Avatar
                  imageUrl={plan.avatarUrl}
                  name={plan.ownerName}
                  size="md"
                />
              ) : (
                <div className="relative group">
                  <button
                    onClick={handleAddClient}
                    className="w-8 h-8 rounded flex items-center justify-center bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <PersonAddIcon sx={{ fontSize: 20 }} />
                  </button>
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Add client
                  </div>
                </div>
              )}
              <div className="flex-1 flex items-center gap-3 group">
                <h1 className="text-2xl font-semibold text-[#244348]">
                  {plan.title}
                </h1>
                <button
                  onClick={() => {
                    setFocusField('title');
                    setEditMode(true);
                    if (!isSidebarExpanded) {
                      setIsSidebarExpanded(true);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-100 rounded"
                  aria-label="Edit plan"
                >
                  <EditIcon sx={{ fontSize: 20, color: '#657A7E' }} />
                </button>
              </div>
            </div>

            {/* Get started quickly section */}
            <section className="flex flex-col gap-3">
              {/* <h2 className="text-lg font-semibold text-[#244348]">
                Get started quickly
              </h2> */}
              <div className="grid grid-cols-3 gap-3">
                {/* Build with plan assistant */}
                <div
                  onClick={handleStartAssistant}
                  className="bg-white rounded-lg border border-[#DFE3E4] overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
                >
                  <div className="bg-[#F0F2F3] border-b border-[#DFE3E4] h-24 flex items-center justify-center">
                    <div className="rounded-lg p-3">
                      <WizardIcon sx={{ fontSize: 32 }} className="text-slate-700" />
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[#244348]">
                      Build with plan assistant
                    </h3>
                    <p className="text-xs text-[#657A7E] leading-relaxed">
                      Create a customized nutrition plan step by step using our assistant.
                    </p>
                  </div>
                </div>

                {/* Start with a template */}
                <div className="bg-white rounded-lg border border-[#DFE3E4] overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="bg-[#F0F2F3] border-b border-[#DFE3E4] h-24 flex items-center justify-center">
                    <div className="rounded-lg p-3">
                      <DashboardCustomizeIcon sx={{ fontSize: 32 }} className="text-slate-700" />
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[#244348]">
                      Start with a template
                    </h3>
                    <p className="text-xs text-[#657A7E] leading-relaxed">
                      Begin with a ready-made template you can customize for your client.
                    </p>
                  </div>
                </div>

                {/* Copy from another plan */}
                <div className="bg-white rounded-lg border border-[#DFE3E4] overflow-hidden cursor-pointer hover:shadow-md transition-shadow">
                  <div className="bg-[#F0F2F3] border-b border-[#DFE3E4] h-24 flex items-center justify-center">
                    <div className="rounded-lg p-3">
                      <ContentCopyIcon sx={{ fontSize: 32 }} className="text-slate-700" />
                    </div>
                  </div>
                  <div className="p-3 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[#244348]">
                      Copy from another plan
                    </h3>
                    <p className="text-xs text-[#657A7E] leading-relaxed">
                      Start with a plan you've already created and customize it to meet your client's needs.
                    </p>
                  </div>
                </div>
              </div>
            </section>

            {/* Build it your way section */}
            <section className="flex flex-col gap-3">
              <h2 className="text-lg font-semibold text-[#244348]">
                Build it your way
              </h2>
              <div className="bg-white rounded-lg border border-[#DFE3E4] divide-y divide-[#DFE3E4]">
                {/* Add recipes */}
                <div className="p-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="bg-[#F0F2F3] rounded-lg p-3 flex items-center justify-center">
                    <RestaurantIcon sx={{ fontSize: 24 }} className="text-slate-700" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[#244348]">
                      Add recipes
                    </h3>
                    <p className="text-xs text-[#657A7E]">
                      Choose from our library of recipes or create your own.
                    </p>
                  </div>
                  <KeyboardArrowRightIcon sx={{ fontSize: 24 }} className="text-[#657A7E]" />
                </div>

                {/* Create a meal plan */}
                <div className="p-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="bg-[#F0F2F3] rounded-lg p-3 flex items-center justify-center">
                    <CalendarViewMonthIcon sx={{ fontSize: 24 }} className="text-slate-700" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[#244348]">
                      Create a meal plan
                    </h3>
                    <p className="text-xs text-[#657A7E]">
                      Organize recipes into a structured weekly or monthly schedule for your client
                    </p>
                  </div>
                  <KeyboardArrowRightIcon sx={{ fontSize: 24 }} className="text-[#657A7E]" />
                </div>

                {/* Add an attachment */}
                <div className="p-3 flex items-center gap-4 cursor-pointer hover:bg-gray-50 transition-colors">
                  <div className="bg-[#F0F2F3] rounded-lg p-3 flex items-center justify-center">
                    <FilePresentIcon sx={{ fontSize: 24 }} className="text-slate-700" />
                  </div>
                  <div className="flex-1 flex flex-col gap-1">
                    <h3 className="text-sm font-semibold text-[#244348]">
                      Add an attachment
                    </h3>
                    <p className="text-xs text-[#657A7E]">
                      Include helpful resources, such as guides, articles, or checklists.
                    </p>
                  </div>
                  <KeyboardArrowRightIcon sx={{ fontSize: 24 }} className="text-[#657A7E]" />
                </div>
              </div>
            </section>
          </div>
      </MainTemplate>
    );
  }

  // Populated state - show plan content with sidebar
  return (
    <MainTemplate
      leftSidebar={
        <LeftSidebar
          isExpanded={isLeftSidebarExpanded}
          onToggle={setIsLeftSidebarExpanded}
          onNewPlan={handleNewPlan}
        />
      }
      rightSidebar={
        <PlanDetailSidebar
          plan={plan}
          isExpanded={isSidebarExpanded}
          onToggle={() => setIsSidebarExpanded(!isSidebarExpanded)}
          onUpdatePlan={(updates) => updatePlan(plan.id, updates)}
          editMode={editMode}
          onEditModeChange={setEditMode}
          openOwnerDropdown={openOwnerDropdown}
          focusFieldProp={focusField}
        />
      }
    >
      {/* Header */}
      <div className="flex flex-col gap-2 mb-6">
            <div className="flex items-center gap-4">
              {plan.ownerName && plan.ownerName !== 'Unassigned' ? (
                <Avatar
                  imageUrl={plan.avatarUrl}
                  name={plan.ownerName}
                  size="md"
                />
              ) : (
                <div className="relative group">
                  <button
                    onClick={handleAddClient}
                    className="w-8 h-8 rounded flex items-center justify-center bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <PersonAddIcon sx={{ fontSize: 20 }} />
                  </button>
                  {/* Tooltip */}
                  <div className="absolute left-1/2 -translate-x-1/2 bottom-full mb-2 px-2 py-1 bg-slate-800 text-white text-xs rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                    Add client
                  </div>
                </div>
              )}
              <div className="flex-1 flex items-center gap-3 group">
                <h1 className="text-2xl font-semibold text-[#244348]">
                  {plan.title}
                </h1>
                <button
                  onClick={() => {
                    setFocusField('title');
                    setEditMode(true);
                    if (!isSidebarExpanded) {
                      setIsSidebarExpanded(true);
                    }
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1.5 hover:bg-slate-100 rounded"
                  aria-label="Edit plan"
                >
                  <EditIcon sx={{ fontSize: 20, color: '#657A7E' }} />
                </button>
              </div>
              
              <Button
                variant="secondary"
                icon={<AddIcon sx={{ fontSize: 20 }} />}
                onClick={() => {}}
                iconPosition="left"
              >
                Add
              </Button>
              <Button
                variant="primary"
                icon={<ShareIcon sx={{ fontSize: 20 }} />}
                onClick={() => {}}
                iconPosition="left"
              >
                Share
              </Button>
            </div>

            {/* Tabs */}
            <PlanDetailTabs activeTab={activeTab} onTabChange={setActiveTab} />
          </div>

          {/* Content */}
          <div className="flex flex-col gap-6">
            {/* All Tab - Widgets Layout */}
            {activeTab === 'all' && (
              <>
                {/* Recent Meal Plans Widget */}
                <div className="bg-white border border-[#DFE3E4] rounded-lg overflow-hidden">
                  <div className="border-b border-[#DFE3E4] px-4 py-2 flex items-center gap-2">
                    <CalendarViewMonthIcon sx={{ fontSize: 24 }} className="text-[#657A7E]" />
                    <h2 className="text-sm font-semibold text-[#244348]">Recent meal plans</h2>
                  </div>
                  <div className="p-4 flex gap-3 overflow-x-auto">
                    {plan.mealPlans && plan.mealPlans.length > 0 ? (
                      plan.mealPlans.map((mealPlan) => (
                        <MealPlanCard key={mealPlan.id} mealPlan={mealPlan} />
                      ))
                    ) : (
                      <div className="w-full py-12 text-center text-sm text-[#657A7E]">
                        No meal plans added
                      </div>
                    )}
                  </div>
                  <button className="w-full bg-[#F0F2F3] border-t border-[#DFE3E4] py-2.5 text-sm font-semibold text-[#385459] hover:bg-[#DFE3E4] transition-colors">
                    Add a meal plan
                  </button>
                </div>

                {/* Recipe Box and Resources Row */}
                <div className="grid grid-cols-2 gap-6">
                  {/* Recipe Box Widget */}
                  <div className="bg-white border border-[#DFE3E4] rounded-lg overflow-hidden">
                    <div className="border-b border-[#DFE3E4] px-4 py-2 flex items-center gap-2">
                      <RestaurantIcon sx={{ fontSize: 24 }} className="text-[#657A7E]" />
                      <h2 className="text-sm font-semibold text-[#244348]">Recipe box</h2>
                      {plan.recipes && plan.recipes.length > 0 && (
                        <span className="bg-[#DFE3E4] px-2 py-0.5 rounded-full text-xs font-medium text-[#244348]">
                          {plan.recipes.length} recipes
                        </span>
                      )}
                    </div>
                    <div className="bg-white p-4">
                      {plan.recipes && plan.recipes.length > 0 ? (
                        <div className="grid grid-cols-3 gap-3">
                          {plan.recipes.slice(0, 6).map((recipe) => (
                            <RecipeCardSmall key={recipe.id} recipe={recipe} />
                          ))}
                        </div>
                      ) : (
                        <div className="py-12 text-center text-sm text-[#657A7E]">
                          No recipes added
                        </div>
                      )}
                    </div>
                    <button className="w-full bg-[#F0F2F3] border-t border-[#DFE3E4] py-2.5 text-sm font-semibold text-[#385459] hover:bg-[#DFE3E4] transition-colors">
                      Add a recipe
                    </button>
                  </div>

                  {/* Additional Resources Widget */}
                  <div className="bg-white border border-[#DFE3E4] rounded-lg overflow-hidden flex flex-col">
                    <div className="border-b border-[#DFE3E4] px-4 py-2 flex items-center gap-2">
                      <FilePresentIcon sx={{ fontSize: 24 }} className="text-[#657A7E]" />
                      <h2 className="text-sm font-semibold text-[#244348]">Additional resources</h2>
                    </div>
                    <div className="flex-1 flex items-center justify-center p-4">
                      <p className="text-sm text-[#657A7E] text-center">No resources added</p>
                    </div>
                    <button className="w-full bg-[#F0F2F3] border-t border-[#DFE3E4] py-2.5 text-sm font-semibold text-[#385459] hover:bg-[#DFE3E4] transition-colors">
                      Add an attachment
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* Meal Plans Tab - Grid Layout */}
            {activeTab === 'meal-plans' && (
              <div className="w-full">
                {plan.mealPlans && plan.mealPlans.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plan.mealPlans.map((mealPlan) => (
                      <MealPlanCard key={mealPlan.id} mealPlan={mealPlan} variant="grid" />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-[#657A7E]">No meal plans added</p>
                  </div>
                )}
              </div>
            )}

            {/* Recipe Box Tab - Grid Layout (same as RecipesPage) */}
            {activeTab === 'recipe-box' && (
              <div className="w-full">
                {plan.recipes && plan.recipes.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {plan.recipes.map((recipe) => (
                      <RecipeCard key={recipe.id} recipe={recipe} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <p className="text-sm text-[#657A7E]">No recipes found</p>
                  </div>
                )}
              </div>
            )}

            {/* Additional Resources Tab - Empty State */}
            {activeTab === 'additional-resources' && (
              <div className="text-center py-12">
                <p className="text-sm text-[#657A7E]">No resources added</p>
              </div>
            )}
          </div>
    </MainTemplate>
  );
};

export default PlanDetailPage;
