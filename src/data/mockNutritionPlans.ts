import { NutritionPlan } from '../types/nutrition';
import { RECIPES } from './recipes';
import { generatePhotoAvatar } from '../utils/avatarUtils';

// Helper function to get date X days ago
const getDaysAgo = (days: number): string => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date.toISOString();
};

// Helper to get recipe by ID from central source
const getRecipe = (id: string) => {
  const recipe = RECIPES.find(r => r.id === id);
  if (!recipe) throw new Error(`Recipe ${id} not found`);
  return {
    id: recipe.id,
    name: recipe.name,
    imageUrl: recipe.imageUrl,
    prepTime: recipe.prepTime,
    ingredients: recipe.ingredients,
  };
};

export const mockNutritionPlans: NutritionPlan[] = [
  {
    id: '1',
    title: "Sarah's Nutrition Plan",
    plansCount: 1,
    recipesCount: 6,
    avatarUrl: generatePhotoAvatar('female', '5'),
    ownerName: 'Sarah Klein',
    status: 'active',
    visibility: 'shared',
    createdAt: getDaysAgo(1),
    dietaryPreferences: 'Gluten-free, dairy-free, mediterranean cuisine',
    goals: 'Improve gut health, Reduce inflammation',
    medicalConditions: 'PCOS',
    exclusions: 'Processed foods, refined sugars, gluten, dairy, seed oils, high FODMAP items, spicy foods.',
    mealPlans: [
      {
        id: 'mp1',
        name: 'Week 1',
        duration: '7 days',
        recipesCount: 6,
        images: [
          RECIPES.find(r => r.id === 'salmon-cucumber-bites')?.imageUrl || '',
          RECIPES.find(r => r.id === 'mediterranean-roasted-tomato-chickpea-bowl')?.imageUrl || '',
          RECIPES.find(r => r.id === 'muesli-yogurt-blueberries')?.imageUrl || '',
          RECIPES.find(r => r.id === 'hummus-toast-avocado')?.imageUrl || '',
        ],
      },
    ],
    recipes: [
      getRecipe('salmon-cucumber-bites'),
      getRecipe('mediterranean-roasted-tomato-chickpea-bowl'),
      getRecipe('muesli-yogurt-blueberries'),
      getRecipe('overnight-bircher-muesli'),
      getRecipe('hummus-toast-avocado'),
      getRecipe('grilled-bruschetta-chicken'),
    ],
  },
  {
    id: '4',
    title: "Emily's Plant-Based Plan",
    plansCount: 1,
    recipesCount: 5,
    avatarUrl: generatePhotoAvatar('female', '9'),
    ownerName: 'Emily Harper',
    status: 'active',
    visibility: 'shared',
    createdAt: getDaysAgo(2),
    dietaryPreferences: 'Vegan, whole foods, plant-based',
    goals: 'Weight management, Increase energy',
    medicalConditions: 'None',
    exclusions: 'All animal products, processed foods.',
    mealPlans: [
      {
        id: 'mp4',
        name: 'Week 1',
        duration: '7 days',
        recipesCount: 5,
        images: [
          RECIPES.find(r => r.id === 'mediterranean-roasted-tomato-chickpea-bowl')?.imageUrl || '',
          RECIPES.find(r => r.id === 'lentil-feta-tabbouleh')?.imageUrl || '',
          RECIPES.find(r => r.id === 'hummus-toast-avocado')?.imageUrl || '',
          RECIPES.find(r => r.id === 'apple-almond-butter')?.imageUrl || '',
        ],
      },
    ],
    recipes: [
      getRecipe('mediterranean-roasted-tomato-chickpea-bowl'),
      getRecipe('lentil-feta-tabbouleh'),
      getRecipe('hummus-toast-avocado'),
      getRecipe('crackers-hummus'),
      getRecipe('apple-almond-butter'),
    ],
  },
  {
    id: '6',
    title: "Mike's Gut Healing Plan",
    plansCount: 1,
    recipesCount: 5,
    avatarUrl: generatePhotoAvatar('male', '12'),
    ownerName: 'Mike Johnson',
    status: 'active',
    visibility: 'draft',
    createdAt: getDaysAgo(5),
    dietaryPreferences: 'Low FODMAP, probiotic-rich',
    goals: 'Heal gut lining, Reduce bloating',
    medicalConditions: 'IBS',
    exclusions: 'High FODMAP foods, dairy, gluten.',
    mealPlans: [
      {
        id: 'mp6',
        name: 'Week 1',
        duration: '7 days',
        recipesCount: 5,
        images: [
          RECIPES.find(r => r.id === 'one-pan-chicken-curried-brown-rice')?.imageUrl || '',
          RECIPES.find(r => r.id === 'mediterranean-turkey-rice-bowl')?.imageUrl || '',
          RECIPES.find(r => r.id === 'grilled-bruschetta-chicken')?.imageUrl || '',
          RECIPES.find(r => r.id === 'turkey-cheese-breakfast-plate')?.imageUrl || '',
        ],
      },
    ],
    recipes: [
      getRecipe('turkey-cheese-breakfast-plate'),
      getRecipe('mediterranean-turkey-rice-bowl'),
      getRecipe('overnight-bircher-muesli'),
      getRecipe('grilled-bruschetta-chicken'),
      getRecipe('one-pan-mediterranean-trout'),
    ],
  },
];
