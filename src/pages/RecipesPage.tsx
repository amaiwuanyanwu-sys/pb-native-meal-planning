import { useState } from 'react';
import MainTemplate from '../components/layout/MainTemplate';
import LeftSidebar from '../components/navigation/LeftSidebar';
import FilterPanel from '../components/wizard/FilterPanel';
import Button from '../components/common/Button';
import TabControlPanel from '../components/common/TabControlPanel';
import RecipeCard from '../components/common/RecipeCard';
import AddIcon from '@mui/icons-material/Add';
import { RECIPES } from '../data/recipes';

type RecipeTab = 'all' | 'my-recipes' | 'practice-better';

interface Tab {
  id: RecipeTab;
  label: string;
}

const RecipesPage = () => {
  const [isLeftSidebarExpanded, setIsLeftSidebarExpanded] = useState(true);
  const [isFilterCollapsed, setIsFilterCollapsed] = useState(true);
  const [activeTab, setActiveTab] = useState<RecipeTab>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedRecipes, setSelectedRecipes] = useState<string[]>([]);

  const tabs: Tab[] = [
    { id: 'all', label: 'All' },
    { id: 'my-recipes', label: 'My recipes' },
    { id: 'practice-better', label: 'Practice Better' },
  ];

  const handleNewRecipe = () => {
    // TODO: Implement new recipe functionality
    console.log('New recipe clicked');
  };

  const toggleRecipe = (recipeId: string) => {
    if (selectedRecipes.includes(recipeId)) {
      setSelectedRecipes(prev => prev.filter(id => id !== recipeId));
    } else {
      setSelectedRecipes(prev => [...prev, recipeId]);
    }
  };

  return (
    <MainTemplate
      leftSidebar={
        <LeftSidebar
          isExpanded={isLeftSidebarExpanded}
          onToggle={setIsLeftSidebarExpanded}
        />
      }
      rightSidebar={
        <FilterPanel
          isCollapsed={isFilterCollapsed}
          onToggleCollapse={() => setIsFilterCollapsed(!isFilterCollapsed)}
        />
      }
    >
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between w-full">
          <h1 className="text-2xl font-semibold text-[#01272E]">
            Recipes
          </h1>
          <Button iconPosition='left' onClick={handleNewRecipe} icon={<AddIcon sx={{ fontSize: 20 }} />}>
            New recipe
          </Button>
        </div>

        {/* Tabs and Search */}
        <TabControlPanel
          tabs={tabs}
          activeTab={activeTab}
          onTabChange={setActiveTab}
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          searchPlaceholder="Search recipes..."
        />

        {/* Recipe Grid */}
        <div className="w-full">
          {RECIPES.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {RECIPES.map((recipe) => (
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onClick={() => toggleRecipe(recipe.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-sm text-[#96A5A8]">
                No recipes found. Try adjusting your search or filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </MainTemplate>
  );
};

export default RecipesPage;
