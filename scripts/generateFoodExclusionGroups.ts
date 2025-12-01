import * as fs from 'fs';
import * as path from 'path';
import { parse } from 'csv-parse/sync';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

interface CSVRow {
  Ingredients: string;
  [key: string]: string;
}

interface FoodExclusionGroup {
  id: string;
  name: string;
  type: 'allergen' | 'food-family' | 'compound';
  searchTerms: string[];
  members: string[];
  csvColumn?: string;
}

interface FoodIngredient {
  name: string;
  groupIds: string[];
  searchTerms: string[];
}

interface FoodExclusionConfig {
  version: string;
  generatedAt: string;
  groups: FoodExclusionGroup[];
  ingredients: FoodIngredient[];
}

// Column to group mapping - maps CSV columns to group definitions
const CSV_COLUMN_TO_GROUP: Record<string, Omit<FoodExclusionGroup, 'members'>> = {
  alliumfree: {
    id: 'alliums',
    name: 'Alliums',
    type: 'food-family',
    searchTerms: ['allium', 'alliums', 'onion family', 'garlic family', 'onion', 'garlic', 'leek', 'shallot', 'chive'],
    csvColumn: 'alliumfree'
  },
  nightshadefree: {
    id: 'nightshades',
    name: 'Nightshades',
    type: 'food-family',
    searchTerms: ['nightshade', 'nightshades', 'solanaceae', 'tomato', 'pepper', 'potato', 'eggplant'],
    csvColumn: 'nightshadefree'
  },
  citrusfree: {
    id: 'citrus',
    name: 'Citrus',
    type: 'food-family',
    searchTerms: ['citrus', 'orange', 'lemon', 'lime', 'grapefruit'],
    csvColumn: 'citrusfree'
  },
  nutfree: {
    id: 'tree-nuts',
    name: 'Tree Nuts',
    type: 'allergen',
    searchTerms: ['nuts', 'tree nuts', 'nut allergy', 'almond', 'walnut', 'pecan', 'cashew'],
    csvColumn: 'nutfree'
  },
  dairyfree: {
    id: 'dairy',
    name: 'Dairy',
    type: 'allergen',
    searchTerms: ['dairy', 'milk', 'lactose', 'cheese', 'yogurt', 'cream'],
    csvColumn: 'dairyfree'
  },
  eggfree: {
    id: 'eggs',
    name: 'Eggs',
    type: 'allergen',
    searchTerms: ['egg', 'eggs'],
    csvColumn: 'eggfree'
  },
  wheatfree: {
    id: 'wheat',
    name: 'Wheat',
    type: 'allergen',
    searchTerms: ['wheat', 'flour'],
    csvColumn: 'wheatfree'
  },
  glutenfree: {
    id: 'gluten',
    name: 'Gluten',
    type: 'allergen',
    searchTerms: ['gluten', 'gluten-free'],
    csvColumn: 'glutenfree'
  },
  soyfree: {
    id: 'soy',
    name: 'Soy',
    type: 'allergen',
    searchTerms: ['soy', 'soya', 'tofu', 'edamame'],
    csvColumn: 'soyfree'
  },
  cornfree: {
    id: 'corn',
    name: 'Corn',
    type: 'food-family',
    searchTerms: ['corn', 'maize', 'cornmeal'],
    csvColumn: 'cornfree'
  },
  ricefree: {
    id: 'rice',
    name: 'Rice',
    type: 'food-family',
    searchTerms: ['rice'],
    csvColumn: 'ricefree'
  },
  oatfree: {
    id: 'oats',
    name: 'Oats',
    type: 'food-family',
    searchTerms: ['oat', 'oats', 'oatmeal'],
    csvColumn: 'oatfree'
  },
  seafoodfree: {
    id: 'fish',
    name: 'Fish',
    type: 'allergen',
    searchTerms: ['fish', 'salmon', 'tuna', 'tilapia'],
    csvColumn: 'seafoodfree'
  },
  legumefree: {
    id: 'legumes',
    name: 'Legumes',
    type: 'food-family',
    searchTerms: ['legume', 'legumes', 'bean', 'beans', 'lentil', 'lentils', 'chickpea'],
    csvColumn: 'legumefree'
  },
  mushroomfree: {
    id: 'mushrooms',
    name: 'Mushrooms',
    type: 'food-family',
    searchTerms: ['mushroom', 'mushrooms', 'fungi'],
    csvColumn: 'mushroomfree'
  },
  coconutfree: {
    id: 'coconut',
    name: 'Coconut',
    type: 'food-family',
    searchTerms: ['coconut'],
    csvColumn: 'coconutfree'
  },
  beeffree: {
    id: 'beef',
    name: 'Beef',
    type: 'food-family',
    searchTerms: ['beef', 'steak'],
    csvColumn: 'beeffree'
  },
  porkfree: {
    id: 'pork',
    name: 'Pork',
    type: 'food-family',
    searchTerms: ['pork', 'bacon', 'ham'],
    csvColumn: 'porkfree'
  },
  chickenfree: {
    id: 'poultry',
    name: 'Poultry',
    type: 'food-family',
    searchTerms: ['poultry', 'chicken', 'turkey', 'duck'],
    csvColumn: 'chickenfree'
  },
  turkeyfree: {
    id: 'turkey',
    name: 'Turkey',
    type: 'food-family',
    searchTerms: ['turkey'],
    csvColumn: 'turkeyfree'
  },
  tomatofree: {
    id: 'tomatoes',
    name: 'Tomatoes',
    type: 'food-family',
    searchTerms: ['tomato', 'tomatoes'],
    csvColumn: 'tomatofree'
  },
  onionfree: {
    id: 'onions',
    name: 'Onions',
    type: 'food-family',
    searchTerms: ['onion', 'onions'],
    csvColumn: 'onionfree'
  }
};

// Manual compound-based groups (not derivable from CSV)
const COMPOUND_GROUPS: Omit<FoodExclusionGroup, 'members'>[] = [
  {
    id: 'high-salicylate',
    name: 'High Salicylate',
    type: 'compound',
    searchTerms: ['salicylate', 'salicylates', 'aspirin sensitivity']
  },
  {
    id: 'high-oxalate',
    name: 'High Oxalate',
    type: 'compound',
    searchTerms: ['oxalate', 'oxalates', 'kidney stone']
  },
  {
    id: 'high-histamine',
    name: 'High Histamine',
    type: 'compound',
    searchTerms: ['histamine', 'histamines', 'fermented']
  },
  {
    id: 'high-fodmap',
    name: 'High FODMAP',
    type: 'compound',
    searchTerms: ['fodmap', 'fodmaps', 'ibs', 'digestive']
  },
  {
    id: 'high-lectin',
    name: 'High Lectin',
    type: 'compound',
    searchTerms: ['lectin', 'lectins']
  }
];

// Compound group member definitions based on nutritional research
const COMPOUND_GROUP_MEMBERS: Record<string, string[]> = {
  'high-salicylate': [
    // Fruits
    'Blueberries', 'Strawberries', 'Raspberries', 'Blackberries',
    'Navel Orange', 'Grapefruit', 'Apple', 'Grapes', 'Peach',
    // Vegetables
    'Tomato', 'Cherry Tomatoes', 'Yellow Bell Pepper', 'Red Bell Pepper', 'Green Bell Pepper',
    'Cucumber', 'Zucchini', 'Eggplant', 'Radishes', 'Spinach', 'Baby Spinach',
    // Nuts & Seeds
    'Almonds', 'Slivered Almonds', 'Almond Flour', 'Almond Butter',
    'Pine Nuts', 'Sunflower Seeds',
    // Herbs & Spices
    'Basil Leaves', 'Thyme', 'Thyme Sprigs', 'Mint Leaves', 'Curry Powder',
    'Cayenne Pepper', 'Paprika', 'Cumin'
  ],
  'high-oxalate': [
    // Leafy Greens
    'Baby Spinach', 'Collard Greens', 'Kale Leaves',
    // Vegetables
    'Beet', 'Sweet Potato', 'Rhubarb',
    // Nuts & Seeds
    'Almonds', 'Slivered Almonds', 'Almond Flour', 'Almond Butter',
    'Cashews', 'Pecans', 'Peanuts', 'All Natural Peanut Butter',
    // Other
    'Sesame Seeds', 'Chia Seeds'
  ],
  'high-histamine': [
    // Fermented/Aged
    'Feta Cheese', // aged cheese
    // Vegetables
    'Tomato', 'Cherry Tomatoes', 'Eggplant', 'Baby Spinach', 'Avocado',
    // Citrus
    'Lemon', 'Lime', 'Navel Orange', 'Grapefruit',
    // Seafood
    'Salmon Fillet', 'Tilapia Fillet', 'Shrimp',
    // Nuts
    'Cashews', 'Walnuts'
  ],
  'high-fodmap': [
    // Alliums
    'Yellow Onion', 'Red Onion', 'Sweet Onion', 'White Onion', 'Green Onion',
    'Garlic', 'Garlic Powder', 'Leeks', 'Shallots',
    // Fruits
    'Apple', 'Pear', 'Peach', 'Watermelon', 'Mango',
    // Legumes
    'Chickpeas', 'Black Beans', 'Kidney Beans', 'Lentils',
    // Vegetables
    'Cauliflower', 'Mushrooms', 'Portobello Mushroom', 'Asparagus',
    // Grains
    'Wheat', 'Rye',
    // Nuts
    'Cashews', 'Pistachios',
    // Dairy
    'Milk', 'Yogurt', 'Ice Cream'
  ],
  'high-lectin': [
    // Legumes
    'Chickpeas', 'Black Beans', 'Kidney Beans', 'Lentils', 'Peanuts',
    // Nightshades
    'Tomato', 'Cherry Tomatoes', 'Eggplant',
    'Yellow Bell Pepper', 'Red Bell Pepper', 'Green Bell Pepper',
    // Grains
    'Wheat', 'Oats', 'Corn', 'Rice', 'Quinoa',
    // Squash
    'Zucchini', 'Spaghetti Squash', 'Butternut Squash'
  ]
};

function generateConfig(): FoodExclusionConfig {
  console.log('Starting food exclusion groups generation...\n');

  // Read CSV
  const csvPath = path.join(__dirname, '../src/data/Ingredients-Table 1.csv');
  console.log(`Reading CSV from: ${csvPath}`);

  const csvContent = fs.readFileSync(csvPath, 'utf-8');
  const rows: CSVRow[] = parse(csvContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true
  });

  console.log(`✓ Parsed ${rows.length} ingredients from CSV\n`);

  const groups: FoodExclusionGroup[] = [];
  const ingredientToGroups = new Map<string, Set<string>>();

  // Process CSV columns to derive groups
  let csvDerivedCount = 0;
  Object.entries(CSV_COLUMN_TO_GROUP).forEach(([column, groupDef]) => {
    const members: string[] = [];

    rows.forEach(row => {
      // If column value is 'n', ingredient CONTAINS this restriction
      // (e.g., alliumfree=n means ingredient contains alliums)
      if (row[column] === 'n') {
        const ingredientName = row.Ingredients.trim();
        members.push(ingredientName);

        // Track ingredient-to-group mapping
        if (!ingredientToGroups.has(ingredientName)) {
          ingredientToGroups.set(ingredientName, new Set());
        }
        ingredientToGroups.get(ingredientName)!.add(groupDef.id);
      }
    });

    if (members.length > 0) {
      groups.push({
        ...groupDef,
        members
      });
      csvDerivedCount++;
      console.log(`✓ ${groupDef.name} (${groupDef.type}): ${members.length} ingredients`);
    }
  });

  console.log(`\n✓ Generated ${csvDerivedCount} groups from CSV columns\n`);

  // Add compound-based groups
  console.log('Adding compound-based groups:');
  COMPOUND_GROUPS.forEach(groupDef => {
    const members = COMPOUND_GROUP_MEMBERS[groupDef.id] || [];

    groups.push({
      ...groupDef,
      members
    });

    // Update ingredient-to-group mapping
    members.forEach(member => {
      if (!ingredientToGroups.has(member)) {
        ingredientToGroups.set(member, new Set());
      }
      ingredientToGroups.get(member)!.add(groupDef.id);
    });

    console.log(`✓ ${groupDef.name}: ${members.length} ingredients`);
  });

  console.log(`\n✓ Added ${COMPOUND_GROUPS.length} compound-based groups\n`);

  // Build ingredients array
  const ingredients: FoodIngredient[] = Array.from(ingredientToGroups.entries()).map(([name, groupIds]) => ({
    name,
    groupIds: Array.from(groupIds),
    searchTerms: [name.toLowerCase(), ...name.toLowerCase().split(' ')]
  }));

  console.log(`✓ Mapped ${ingredients.length} ingredients to groups\n`);

  // Statistics
  const allergenGroups = groups.filter(g => g.type === 'allergen');
  const foodFamilyGroups = groups.filter(g => g.type === 'food-family');
  const compoundGroups = groups.filter(g => g.type === 'compound');

  console.log('Summary:');
  console.log(`  Total Groups: ${groups.length}`);
  console.log(`    - Allergen Groups: ${allergenGroups.length}`);
  console.log(`    - Food Family Groups: ${foodFamilyGroups.length}`);
  console.log(`    - Compound Groups: ${compoundGroups.length}`);
  console.log(`  Total Ingredients with Group Membership: ${ingredients.length}\n`);

  // Find ingredients in multiple groups
  const multiGroupIngredients = ingredients.filter(ing => ing.groupIds.length > 1);
  console.log(`  Ingredients in Multiple Groups: ${multiGroupIngredients.length}`);
  if (multiGroupIngredients.length > 0) {
    console.log('  Examples:');
    multiGroupIngredients.slice(0, 5).forEach(ing => {
      const groupNames = ing.groupIds.map(id => groups.find(g => g.id === id)?.name).join(', ');
      console.log(`    - ${ing.name}: ${groupNames}`);
    });
  }

  return {
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    groups,
    ingredients
  };
}

// Run generation
try {
  console.log('='.repeat(60));
  console.log('FOOD EXCLUSION GROUPS GENERATOR');
  console.log('='.repeat(60) + '\n');

  const config = generateConfig();

  const outputPath = path.join(__dirname, '../src/constants/food_exclusion_groups.json');
  fs.writeFileSync(outputPath, JSON.stringify(config, null, 2));

  console.log('='.repeat(60));
  console.log(`✓ Successfully generated: ${outputPath}`);
  console.log('='.repeat(60));
} catch (error) {
  console.error('Error generating config:', error);
  process.exit(1);
}
