export interface FoodItem {
  name: string;
  tags: string[];
  isGroup?: boolean;
}

export const FOOD_EXCLUSIONS: FoodItem[] = [
  // Groups (can be selected as a whole)
  { name: 'Tree Nuts', tags: ['Allergens', 'Tree Nuts'], isGroup: true },
  { name: 'Dairy', tags: ['Allergens', 'Dairy'], isGroup: true },
  { name: 'Eggs', tags: ['Allergens', 'Eggs'], isGroup: true },
  { name: 'Wheat', tags: ['Allergens', 'Grains & Starches', 'Wheat'], isGroup: true },
  { name: 'Soy', tags: ['Allergens', 'Legumes'], isGroup: true },
  { name: 'Fish', tags: ['Allergens', 'Proteins', 'Fish'], isGroup: true },
  { name: 'Shellfish', tags: ['Allergens', 'Proteins', 'Shellfish'], isGroup: true },
  { name: 'Rice', tags: ['Grains & Starches', 'Rice'], isGroup: true },
  { name: 'Corn', tags: ['Grains & Starches', 'Corn'], isGroup: true },
  { name: 'Oats', tags: ['Grains & Starches', 'Oats'], isGroup: true },
  { name: 'Potatoes', tags: ['Grains & Starches', 'Potatoes'], isGroup: true },
  { name: 'Beef', tags: ['Proteins', 'Beef'], isGroup: true },
  { name: 'Pork', tags: ['Proteins', 'Pork'], isGroup: true },
  { name: 'Poultry', tags: ['Proteins', 'Poultry'], isGroup: true },
  { name: 'Lamb', tags: ['Proteins'], isGroup: true },
  { name: 'Beans', tags: ['Legumes', 'Beans'], isGroup: true },
  { name: 'Tomatoes', tags: ['Vegetables', 'Tomatoes'], isGroup: true },
  { name: 'Onions', tags: ['Vegetables', 'Onions'], isGroup: true },
  { name: 'Mushrooms', tags: ['Vegetables', 'Mushrooms'], isGroup: true },
  { name: 'Peppers', tags: ['Vegetables', 'Peppers'], isGroup: true },
  { name: 'Carrots', tags: ['Vegetables'], isGroup: true },
  { name: 'Citrus', tags: ['Fruits', 'Citrus'], isGroup: true },
  { name: 'Berries', tags: ['Fruits', 'Berries'], isGroup: true },
  { name: 'Tropical Fruits', tags: ['Fruits', 'Tropical Fruits'], isGroup: true },
  { name: 'Melons', tags: ['Fruits', 'Melons'], isGroup: true },
  { name: 'Seeds', tags: ['Other', 'Seeds'], isGroup: true },

  // Common Allergens (individual items)
  { name: 'Peanuts', tags: ['Allergens'] },
  { name: 'Gluten', tags: ['Allergens'] },
  { name: 'Sesame', tags: ['Allergens'] },

  // Tree Nuts (individual items)
  { name: 'Almonds', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Cashews', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Walnuts', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Pecans', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Pistachios', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Hazelnuts', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Macadamia nuts', tags: ['Allergens', 'Tree Nuts'] },
  { name: 'Brazil nuts', tags: ['Allergens', 'Tree Nuts'] },

  // Dairy (individual items)
  { name: 'Milk', tags: ['Allergens', 'Dairy'] },
  { name: 'Cheese', tags: ['Allergens', 'Dairy'] },
  { name: 'Butter', tags: ['Allergens', 'Dairy'] },
  { name: 'Yogurt', tags: ['Allergens', 'Dairy'] },
  { name: 'Cream', tags: ['Allergens', 'Dairy'] },
  { name: 'Ice cream', tags: ['Allergens', 'Dairy'] },
  { name: 'Sour cream', tags: ['Allergens', 'Dairy'] },
  { name: 'Cottage cheese', tags: ['Allergens', 'Dairy'] },
  { name: 'Whey', tags: ['Allergens', 'Dairy'] },
  { name: 'Casein', tags: ['Allergens', 'Dairy'] },

  // Eggs (individual items)
  { name: 'Chicken eggs', tags: ['Allergens', 'Eggs'] },
  { name: 'Duck eggs', tags: ['Allergens', 'Eggs'] },
  { name: 'Quail eggs', tags: ['Allergens', 'Eggs'] },

  // Wheat products (individual items)
  { name: 'Bread', tags: ['Grains & Starches', 'Wheat'] },
  { name: 'Pasta', tags: ['Grains & Starches', 'Wheat'] },
  { name: 'Flour', tags: ['Grains & Starches', 'Wheat'] },
  { name: 'Couscous', tags: ['Grains & Starches', 'Wheat'] },
  { name: 'Bulgur', tags: ['Grains & Starches', 'Wheat'] },
  { name: 'Semolina', tags: ['Grains & Starches', 'Wheat'] },

  // Soy products (individual items)
  { name: 'Tofu', tags: ['Legumes'] },
  { name: 'Soy sauce', tags: ['Legumes'] },
  { name: 'Edamame', tags: ['Legumes'] },
  { name: 'Tempeh', tags: ['Legumes'] },
  { name: 'Miso', tags: ['Legumes'] },
  { name: 'Soy milk', tags: ['Legumes'] },

  // Fish (individual items)
  { name: 'Salmon', tags: ['Proteins', 'Fish'] },
  { name: 'Tuna', tags: ['Proteins', 'Fish'] },
  { name: 'Cod', tags: ['Proteins', 'Fish'] },
  { name: 'Tilapia', tags: ['Proteins', 'Fish'] },
  { name: 'Halibut', tags: ['Proteins', 'Fish'] },
  { name: 'Sardines', tags: ['Proteins', 'Fish'] },
  { name: 'Mackerel', tags: ['Proteins', 'Fish'] },
  { name: 'Trout', tags: ['Proteins', 'Fish'] },

  // Shellfish (individual items)
  { name: 'Shrimp', tags: ['Proteins', 'Shellfish'] },
  { name: 'Crab', tags: ['Proteins', 'Shellfish'] },
  { name: 'Lobster', tags: ['Proteins', 'Shellfish'] },
  { name: 'Clams', tags: ['Proteins', 'Shellfish'] },
  { name: 'Mussels', tags: ['Proteins', 'Shellfish'] },
  { name: 'Oysters', tags: ['Proteins', 'Shellfish'] },
  { name: 'Scallops', tags: ['Proteins', 'Shellfish'] },
  { name: 'Crawfish', tags: ['Proteins', 'Shellfish'] },

  // Rice varieties (individual items)
  { name: 'White rice', tags: ['Grains & Starches', 'Rice'] },
  { name: 'Brown rice', tags: ['Grains & Starches', 'Rice'] },
  { name: 'Jasmine rice', tags: ['Grains & Starches', 'Rice'] },
  { name: 'Basmati rice', tags: ['Grains & Starches', 'Rice'] },
  { name: 'Wild rice', tags: ['Grains & Starches', 'Rice'] },
  { name: 'Rice noodles', tags: ['Grains & Starches', 'Rice'] },

  // Corn products (individual items)
  { name: 'Corn on the cob', tags: ['Grains & Starches', 'Corn'] },
  { name: 'Corn flour', tags: ['Grains & Starches', 'Corn'] },
  { name: 'Cornmeal', tags: ['Grains & Starches', 'Corn'] },
  { name: 'Popcorn', tags: ['Grains & Starches', 'Corn'] },
  { name: 'Corn syrup', tags: ['Grains & Starches', 'Corn'] },

  // Oats products (individual items)
  { name: 'Oatmeal', tags: ['Grains & Starches', 'Oats'] },
  { name: 'Rolled oats', tags: ['Grains & Starches', 'Oats'] },
  { name: 'Steel-cut oats', tags: ['Grains & Starches', 'Oats'] },
  { name: 'Oat flour', tags: ['Grains & Starches', 'Oats'] },

  // Other grains
  { name: 'Quinoa', tags: ['Grains & Starches'] },

  // Potato varieties (individual items)
  { name: 'White potatoes', tags: ['Grains & Starches', 'Potatoes'] },
  { name: 'Sweet potatoes', tags: ['Grains & Starches', 'Potatoes'] },
  { name: 'Red potatoes', tags: ['Grains & Starches', 'Potatoes'] },
  { name: 'Russet potatoes', tags: ['Grains & Starches', 'Potatoes'] },
  { name: 'Potato chips', tags: ['Grains & Starches', 'Potatoes'] },
  { name: 'French fries', tags: ['Grains & Starches', 'Potatoes'] },

  // Poultry
  { name: 'Chicken', tags: ['Proteins', 'Poultry'] },
  { name: 'Turkey', tags: ['Proteins', 'Poultry'] },
  { name: 'Duck', tags: ['Proteins', 'Poultry'] },

  // Beef products (individual items)
  { name: 'Ground beef', tags: ['Proteins', 'Beef'] },
  { name: 'Steak', tags: ['Proteins', 'Beef'] },
  { name: 'Beef roast', tags: ['Proteins', 'Beef'] },
  { name: 'Beef liver', tags: ['Proteins', 'Beef'] },

  // Pork products (individual items)
  { name: 'Bacon', tags: ['Proteins', 'Pork'] },
  { name: 'Ham', tags: ['Proteins', 'Pork'] },
  { name: 'Sausage', tags: ['Proteins', 'Pork'] },
  { name: 'Pork chops', tags: ['Proteins', 'Pork'] },
  { name: 'Pork tenderloin', tags: ['Proteins', 'Pork'] },
  { name: 'Pulled pork', tags: ['Proteins', 'Pork'] },

  // Lamb products (individual items)
  { name: 'Lamb chops', tags: ['Proteins'] },
  { name: 'Ground lamb', tags: ['Proteins'] },
  { name: 'Lamb shank', tags: ['Proteins'] },

  // Beans (individual items)
  { name: 'Black beans', tags: ['Legumes', 'Beans'] },
  { name: 'Kidney beans', tags: ['Legumes', 'Beans'] },
  { name: 'Pinto beans', tags: ['Legumes', 'Beans'] },
  { name: 'Navy beans', tags: ['Legumes', 'Beans'] },
  { name: 'Lima beans', tags: ['Legumes', 'Beans'] },
  { name: 'Chickpeas', tags: ['Legumes', 'Beans'] },
  { name: 'Lentils', tags: ['Legumes', 'Beans'] },
  { name: 'Peas', tags: ['Legumes'] },

  // Tomatoes (individual items)
  { name: 'Cherry tomatoes', tags: ['Vegetables', 'Tomatoes'] },
  { name: 'Roma tomatoes', tags: ['Vegetables', 'Tomatoes'] },
  { name: 'Tomato sauce', tags: ['Vegetables', 'Tomatoes'] },
  { name: 'Sun-dried tomatoes', tags: ['Vegetables', 'Tomatoes'] },

  // Onions (individual items)
  { name: 'Yellow onion', tags: ['Vegetables', 'Onions'] },
  { name: 'Red onion', tags: ['Vegetables', 'Onions'] },
  { name: 'White onion', tags: ['Vegetables', 'Onions'] },
  { name: 'Green onion', tags: ['Vegetables', 'Onions'] },
  { name: 'Shallots', tags: ['Vegetables', 'Onions'] },
  { name: 'Leeks', tags: ['Vegetables', 'Onions'] },

  // Mushrooms (individual items)
  { name: 'Button mushrooms', tags: ['Vegetables', 'Mushrooms'] },
  { name: 'Portobello', tags: ['Vegetables', 'Mushrooms'] },
  { name: 'Shiitake', tags: ['Vegetables', 'Mushrooms'] },
  { name: 'Oyster mushrooms', tags: ['Vegetables', 'Mushrooms'] },
  { name: 'Cremini', tags: ['Vegetables', 'Mushrooms'] },

  // Peppers (individual items)
  { name: 'Bell peppers', tags: ['Vegetables', 'Peppers'] },
  { name: 'Jalapeños', tags: ['Vegetables', 'Peppers'] },
  { name: 'Habanero', tags: ['Vegetables', 'Peppers'] },
  { name: 'Chili peppers', tags: ['Vegetables', 'Peppers'] },
  { name: 'Poblano', tags: ['Vegetables', 'Peppers'] },
  { name: 'Serrano', tags: ['Vegetables', 'Peppers'] },

  // Carrots (individual items)
  { name: 'Baby carrots', tags: ['Vegetables'] },
  { name: 'Carrot juice', tags: ['Vegetables'] },

  // Other vegetables
  { name: 'Garlic', tags: ['Vegetables'] },
  { name: 'Cilantro', tags: ['Vegetables'] },
  { name: 'Celery', tags: ['Vegetables'] },
  { name: 'Broccoli', tags: ['Vegetables'] },
  { name: 'Cauliflower', tags: ['Vegetables'] },
  { name: 'Spinach', tags: ['Vegetables'] },
  { name: 'Kale', tags: ['Vegetables'] },
  { name: 'Lettuce', tags: ['Vegetables'] },
  { name: 'Cucumbers', tags: ['Vegetables'] },
  { name: 'Zucchini', tags: ['Vegetables'] },
  { name: 'Eggplant', tags: ['Vegetables'] },

  // Citrus fruits (individual items)
  { name: 'Oranges', tags: ['Fruits', 'Citrus'] },
  { name: 'Lemons', tags: ['Fruits', 'Citrus'] },
  { name: 'Limes', tags: ['Fruits', 'Citrus'] },
  { name: 'Grapefruit', tags: ['Fruits', 'Citrus'] },
  { name: 'Tangerines', tags: ['Fruits', 'Citrus'] },

  // Berries (individual items)
  { name: 'Strawberries', tags: ['Fruits', 'Berries'] },
  { name: 'Blueberries', tags: ['Fruits', 'Berries'] },
  { name: 'Raspberries', tags: ['Fruits', 'Berries'] },
  { name: 'Blackberries', tags: ['Fruits', 'Berries'] },
  { name: 'Cranberries', tags: ['Fruits', 'Berries'] },

  // Tropical fruits (individual items)
  { name: 'Pineapple', tags: ['Fruits', 'Tropical Fruits'] },
  { name: 'Mango', tags: ['Fruits', 'Tropical Fruits'] },
  { name: 'Papaya', tags: ['Fruits', 'Tropical Fruits'] },
  { name: 'Dragon fruit', tags: ['Fruits', 'Tropical Fruits'] },
  { name: 'Passion fruit', tags: ['Fruits', 'Tropical Fruits'] },

  // Melons (individual items)
  { name: 'Watermelon', tags: ['Fruits', 'Melons'] },
  { name: 'Cantaloupe', tags: ['Fruits', 'Melons'] },
  { name: 'Honeydew', tags: ['Fruits', 'Melons'] },

  // Other fruits
  { name: 'Apples', tags: ['Fruits'], isGroup: true },
  { name: 'Green apples', tags: ['Fruits'] },
  { name: 'Red apples', tags: ['Fruits'] },
  { name: 'Apple juice', tags: ['Fruits'] },
  { name: 'Apple sauce', tags: ['Fruits'] },
  { name: 'Bananas', tags: ['Fruits'] },
  { name: 'Grapes', tags: ['Fruits'] },

  // Dietary Restrictions
  { name: 'Red meat', tags: ['Dietary Restrictions'] },
  { name: 'Alcohol', tags: ['Dietary Restrictions'] },
  { name: 'Caffeine', tags: ['Dietary Restrictions'] },

  // Seeds (individual items)
  { name: 'Sunflower seeds', tags: ['Other', 'Seeds'] },
  { name: 'Pumpkin seeds', tags: ['Other', 'Seeds'] },
  { name: 'Chia seeds', tags: ['Other', 'Seeds'] },
  { name: 'Flax seeds', tags: ['Other', 'Seeds'] },
  { name: 'Hemp seeds', tags: ['Other', 'Seeds'] },

  // Other common items
  { name: 'Coconut', tags: ['Other'] },
  { name: 'Avocado', tags: ['Other'] },
  { name: 'Olives', tags: ['Other'] },
  { name: 'Pickles', tags: ['Other'] },
  { name: 'Spicy food', tags: ['Other'] },
  { name: 'Raw food', tags: ['Other'] },
];
