import { Recipe } from '../types/nutrition';

// Import all recipe images
import appleAlmondButter from '../assets/images/apple-with-almond-butter.jpg';
import celeryHummus from '../assets/images/celery-hummus.jpg';
import crackersHummus from '../assets/images/crackers-hummus.jpg';
import grilledBruschettaChicken from '../assets/images/grilled-bruschetta-chicken.jpg';
import healthyFishNChips from '../assets/images/healthy-fish-n-chips.jpg';
import hummusToastAvocado from '../assets/images/hummus-toast-with-avocado.jpg';
import lentilFetaTabbouleh from '../assets/images/lentil-feta-tabbouleh.jpg';
import mediterraneanTomatoChickpea from '../assets/images/mediterranean-roasted-tomato-chickpea-bowl.jpg';
import mediterraneanTurkeyRice from '../assets/images/mediterranean-turkey-rice-bowl.jpg';
import muesliYogurtBlueberries from '../assets/images/muesli-with-yogurt-blueberries.jpg';
import onePanChickenCurried from '../assets/images/one-pan-chicken-curried-brown-rice.jpg';
import onePanMediterraneanTrout from '../assets/images/one-pan-mediterranean-trout.jpg';
import overnightBircherMuesli from '../assets/images/overnight-bircher-muesli.jpg';
import salmonCucumberBites from '../assets/images/salmon-cucumber-bites.jpg';
import turkeyCheeseBreakfast from '../assets/images/turkey-cheese-breakfast-plate.jpg';

/**
 * Central Recipe Database
 * Single source of truth for all recipe data across the application
 */
export const RECIPES: Recipe[] = [
  // ========== BREAKFAST (4 recipes) ==========
  {
    id: 'muesli-yogurt-blueberries',
    name: 'Muesli With Yogurt Blueberries',
    imageUrl: muesliYogurtBlueberries,
    mealType: 'breakfast',
    calories: 380,
    protein: 18,
    carbs: 48,
    fats: 12,
    prepTime: 5,
    ingredients: 5,
    cuisine: 'Swiss',
    tags: ['high-protein', 'quick', 'yogurt', 'berries', 'whole-grain'],
  },
  {
    id: 'overnight-bircher-muesli',
    name: 'Overnight Bircher Muesli',
    imageUrl: overnightBircherMuesli,
    mealType: 'breakfast',
    calories: 350,
    protein: 15,
    carbs: 45,
    fats: 10,
    prepTime: 10,
    ingredients: 6,
    cuisine: 'Swiss',
    tags: ['make-ahead', 'overnight', 'oats', 'whole-grain', 'fiber'],
  },
  {
    id: 'hummus-toast-avocado',
    name: 'Hummus Toast With Avocado',
    imageUrl: hummusToastAvocado,
    mealType: 'breakfast',
    calories: 420,
    protein: 16,
    carbs: 38,
    fats: 22,
    prepTime: 8,
    ingredients: 5,
    cuisine: 'Mediterranean',
    tags: ['vegetarian', 'avocado', 'toast', 'healthy-fats', 'quick'],
  },
  {
    id: 'turkey-cheese-breakfast-plate',
    name: 'Turkey Cheese Breakfast Plate',
    imageUrl: turkeyCheeseBreakfast,
    mealType: 'breakfast',
    calories: 440,
    protein: 32,
    carbs: 35,
    fats: 18,
    prepTime: 10,
    ingredients: 6,
    cuisine: 'American',
    tags: ['high-protein', 'turkey', 'cheese', 'balanced', 'savory'],
  },

  // ========== LUNCH (4 recipes) ==========
  {
    id: 'grilled-bruschetta-chicken',
    name: 'Grilled Bruschetta Chicken',
    imageUrl: grilledBruschettaChicken,
    mealType: 'lunch',
    calories: 480,
    protein: 42,
    carbs: 38,
    fats: 16,
    prepTime: 25,
    ingredients: 8,
    cuisine: 'Italian',
    tags: ['high-protein', 'chicken', 'grilled', 'tomatoes', 'low-carb'],
  },
  {
    id: 'mediterranean-roasted-tomato-chickpea-bowl',
    name: 'Mediterranean Roasted Tomato Chickpea Bowl',
    imageUrl: mediterraneanTomatoChickpea,
    mealType: 'lunch',
    calories: 450,
    protein: 18,
    carbs: 55,
    fats: 18,
    prepTime: 30,
    ingredients: 9,
    cuisine: 'Mediterranean',
    tags: ['vegetarian', 'chickpeas', 'roasted', 'bowl', 'fiber'],
  },
  {
    id: 'mediterranean-turkey-rice-bowl',
    name: 'Mediterranean Turkey Rice Bowl',
    imageUrl: mediterraneanTurkeyRice,
    mealType: 'lunch',
    calories: 520,
    protein: 35,
    carbs: 52,
    fats: 18,
    prepTime: 30,
    ingredients: 10,
    cuisine: 'Mediterranean',
    tags: ['turkey', 'rice', 'bowl', 'balanced', 'complete-meal'],
  },
  {
    id: 'lentil-feta-tabbouleh',
    name: 'Lentil Feta Tabbouleh',
    imageUrl: lentilFetaTabbouleh,
    mealType: 'lunch',
    calories: 420,
    protein: 20,
    carbs: 48,
    fats: 16,
    prepTime: 25,
    ingredients: 8,
    cuisine: 'Middle Eastern',
    tags: ['vegetarian', 'lentils', 'feta', 'fresh', 'fiber'],
  },

  // ========== DINNER (3 recipes) ==========
  {
    id: 'one-pan-mediterranean-trout',
    name: 'One Pan Mediterranean Trout',
    imageUrl: onePanMediterraneanTrout,
    mealType: 'dinner',
    calories: 580,
    protein: 45,
    carbs: 42,
    fats: 24,
    prepTime: 35,
    ingredients: 10,
    cuisine: 'Mediterranean',
    tags: ['fish', 'one-pan', 'omega-3', 'complete-meal', 'healthy-fats'],
  },
  {
    id: 'healthy-fish-n-chips',
    name: 'Healthy Fish N Chips',
    imageUrl: healthyFishNChips,
    mealType: 'dinner',
    calories: 620,
    protein: 48,
    carbs: 65,
    fats: 18,
    prepTime: 40,
    ingredients: 8,
    cuisine: 'British',
    tags: ['fish', 'baked', 'omega-3', 'comfort-food', 'lighter-version'],
  },
  {
    id: 'one-pan-chicken-curried-brown-rice',
    name: 'One Pan Chicken Curried Brown Rice',
    imageUrl: onePanChickenCurried,
    mealType: 'dinner',
    calories: 590,
    protein: 42,
    carbs: 58,
    fats: 20,
    prepTime: 40,
    ingredients: 12,
    cuisine: 'Indian',
    tags: ['chicken', 'curry', 'one-pan', 'rice', 'spiced'],
  },

  // ========== SNACKS (4 recipes) ==========
  {
    id: 'apple-almond-butter',
    name: 'Apple With Almond Butter',
    imageUrl: appleAlmondButter,
    mealType: 'snack',
    calories: 210,
    protein: 8,
    carbs: 24,
    fats: 10,
    prepTime: 3,
    ingredients: 2,
    cuisine: 'American',
    tags: ['quick', 'nuts', 'fruit', 'healthy-fats', 'portable'],
  },
  {
    id: 'celery-hummus',
    name: 'Celery Hummus',
    imageUrl: celeryHummus,
    mealType: 'snack',
    calories: 180,
    protein: 6,
    carbs: 18,
    fats: 10,
    prepTime: 5,
    ingredients: 3,
    cuisine: 'Mediterranean',
    tags: ['vegetarian', 'hummus', 'low-calorie', 'crunchy', 'fresh'],
  },
  {
    id: 'crackers-hummus',
    name: 'Crackers Hummus',
    imageUrl: crackersHummus,
    mealType: 'snack',
    calories: 220,
    protein: 8,
    carbs: 28,
    fats: 9,
    prepTime: 3,
    ingredients: 2,
    cuisine: 'Mediterranean',
    tags: ['vegetarian', 'hummus', 'quick', 'portable', 'satisfying'],
  },
  {
    id: 'salmon-cucumber-bites',
    name: 'Salmon Cucumber Bites',
    imageUrl: salmonCucumberBites,
    mealType: 'snack',
    calories: 240,
    protein: 15,
    carbs: 12,
    fats: 12,
    prepTime: 10,
    ingredients: 5,
    cuisine: 'Scandinavian',
    tags: ['fish', 'omega-3', 'protein-rich', 'elegant', 'low-carb'],
  },
];

/**
 * Total number of recipes in the database
 */
export const TOTAL_RECIPES = RECIPES.length;

/**
 * Get a recipe by its ID
 */
export const getRecipeById = (id: string): Recipe | undefined => {
  return RECIPES.find((recipe) => recipe.id === id);
};

/**
 * Get all recipes for a specific meal type
 */
export const getRecipesByMealType = (mealType: Recipe['mealType']): Recipe[] => {
  return RECIPES.filter((recipe) => recipe.mealType === mealType);
};

/**
 * Get all recipes that contain a specific tag
 */
export const getRecipesByTag = (tag: string): Recipe[] => {
  return RECIPES.filter((recipe) => recipe.tags?.includes(tag));
};

/**
 * Get all recipes from a specific cuisine
 */
export const getRecipesByCuisine = (cuisine: string): Recipe[] => {
  return RECIPES.filter(
    (recipe) => recipe.cuisine?.toLowerCase() === cuisine.toLowerCase()
  );
};

/**
 * Search recipes by name, cuisine, or tags
 */
export const searchRecipes = (query: string): Recipe[] => {
  const lowerQuery = query.toLowerCase();
  return RECIPES.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(lowerQuery) ||
      recipe.cuisine?.toLowerCase().includes(lowerQuery) ||
      recipe.tags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  );
};
