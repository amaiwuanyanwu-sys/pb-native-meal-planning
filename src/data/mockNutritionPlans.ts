import { NutritionPlan } from '../types/nutrition';
import { RECIPES } from './recipes';

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
  };
};

export const mockNutritionPlans: NutritionPlan[] = [
  // Recent Plan 1
  {
    id: '1',
    title: "Sarah's Nutrition Plan",
    plansCount: 1,
    recipesCount: 6,
    avatarUrl: 'https://i.pravatar.cc/150?img=5',
    ownerName: 'Sarah Klein',
    status: 'active',
    visibility: 'shared',
    createdAt: getDaysAgo(1), // Most recent
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
  // Recent Plan 2
  {
    id: '4',
    title: "Emily's Plant-Based Plan",
    plansCount: 1,
    recipesCount: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=9',
    ownerName: 'Emily Harper',
    status: 'active',
    visibility: 'shared',
    createdAt: getDaysAgo(2), // Second most recent
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
  // All Plans List (4 plans)
  {
    id: '2',
    title: "Layla's Mediterranean Plan",
    plansCount: 2,
    recipesCount: 8,
    avatarUrl: 'https://i.pravatar.cc/150?img=8',
    ownerName: 'Layla Brown',
    status: 'active',
    visibility: 'draft',
    createdAt: getDaysAgo(5),
    dietaryPreferences: 'Mediterranean, heart-healthy',
    goals: 'Heart health, Maintain weight',
    medicalConditions: 'High cholesterol',
    exclusions: 'Red meat, processed meats.',
    mealPlans: [
      {
        id: 'mp2a',
        name: 'Week 1',
        duration: '7 days',
        recipesCount: 4,
        images: [
          RECIPES.find(r => r.id === 'one-pan-mediterranean-trout')?.imageUrl || '',
          RECIPES.find(r => r.id === 'salmon-cucumber-bites')?.imageUrl || '',
          RECIPES.find(r => r.id === 'mediterranean-turkey-rice-bowl')?.imageUrl || '',
          RECIPES.find(r => r.id === 'mediterranean-roasted-tomato-chickpea-bowl')?.imageUrl || '',
        ],
      },
      {
        id: 'mp2b',
        name: 'Week 2',
        duration: '7 days',
        recipesCount: 4,
        images: [
          RECIPES.find(r => r.id === 'lentil-feta-tabbouleh')?.imageUrl || '',
          RECIPES.find(r => r.id === 'grilled-bruschetta-chicken')?.imageUrl || '',
          RECIPES.find(r => r.id === 'healthy-fish-n-chips')?.imageUrl || '',
          RECIPES.find(r => r.id === 'crackers-hummus')?.imageUrl || '',
        ],
      },
    ],
    recipes: [
      getRecipe('one-pan-mediterranean-trout'),
      getRecipe('salmon-cucumber-bites'),
      getRecipe('mediterranean-turkey-rice-bowl'),
      getRecipe('mediterranean-roasted-tomato-chickpea-bowl'),
    ],
  },
  {
    id: '3',
    title: "Amelia's Thyroid Support Plan",
    plansCount: 1,
    recipesCount: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=1',
    ownerName: 'Amelia Thompson',
    status: 'active',
    visibility: 'shared',
    createdAt: getDaysAgo(7),
    dietaryPreferences: 'Anti-inflammatory, selenium-rich',
    goals: 'Support thyroid function, Boost energy',
    medicalConditions: 'Hypothyroidism',
    exclusions: 'Soy, gluten, raw cruciferous vegetables.',
    mealPlans: [
      {
        id: 'mp3',
        name: 'Week 1',
        duration: '7 days',
        recipesCount: 5,
        images: [
          RECIPES.find(r => r.id === 'salmon-cucumber-bites')?.imageUrl || '',
          RECIPES.find(r => r.id === 'one-pan-mediterranean-trout')?.imageUrl || '',
          RECIPES.find(r => r.id === 'turkey-cheese-breakfast-plate')?.imageUrl || '',
          RECIPES.find(r => r.id === 'muesli-yogurt-blueberries')?.imageUrl || '',
        ],
      },
    ],
    recipes: [
      getRecipe('apple-almond-butter'),
      getRecipe('salmon-cucumber-bites'),
      getRecipe('one-pan-chicken-curried-brown-rice'),
      getRecipe('mediterranean-turkey-rice-bowl'),
      getRecipe('turkey-cheese-breakfast-plate'),
    ],
  },
  {
    id: '5',
    title: "Maria's Post-Pregnancy Plan",
    plansCount: 1,
    recipesCount: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=3',
    ownerName: 'Maria Benson',
    status: 'active',
    visibility: 'draft',
    createdAt: getDaysAgo(10),
    dietaryPreferences: 'Nutrient-dense, lactation-supporting',
    goals: 'Support breastfeeding, Restore nutrients',
    medicalConditions: 'Postpartum recovery',
    exclusions: 'Alcohol, excessive caffeine.',
    mealPlans: [
      {
        id: 'mp5',
        name: 'Week 1',
        duration: '7 days',
        recipesCount: 5,
        images: [
          RECIPES.find(r => r.id === 'overnight-bircher-muesli')?.imageUrl || '',
          RECIPES.find(r => r.id === 'one-pan-mediterranean-trout')?.imageUrl || '',
          RECIPES.find(r => r.id === 'healthy-fish-n-chips')?.imageUrl || '',
          RECIPES.find(r => r.id === 'lentil-feta-tabbouleh')?.imageUrl || '',
        ],
      },
    ],
    recipes: [
      getRecipe('overnight-bircher-muesli'),
      getRecipe('lentil-feta-tabbouleh'),
      getRecipe('one-pan-mediterranean-trout'),
      getRecipe('healthy-fish-n-chips'),
      getRecipe('muesli-yogurt-blueberries'),
    ],
  },
  {
    id: '6',
    title: "Mike's Gut Healing Plan",
    plansCount: 1,
    recipesCount: 5,
    avatarUrl: 'https://i.pravatar.cc/150?img=12',
    ownerName: 'Mike Johnson',
    status: 'active',
    visibility: 'draft',
    createdAt: getDaysAgo(14),
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
