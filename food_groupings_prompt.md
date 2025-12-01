# Enhancement: Add "Groups" to Food Exclusions

## Context

We have an existing food exclusions feature that allows practitioners to exclude individual ingredients when creating meal plans. The current UI shows:

- **Foods to exclude** (selected items appear as chips)
- **CATEGORIES** section with options like "All Tree Nuts (24 items)", "All Dairy (24 items)", "All Wheat (52 items)"
- **INGREDIENTS** section with individual items like "Peanuts", "Gluten", "Sesame", "Almonds"

See the attached screenshot for the current UI.

## The Problem

Based on user research, practitioners are frustrated that:
1. Selecting "onion" doesn't exclude all onion variants (Yellow Onion, Red Onion, Onion Powder, etc.)
2. They can't easily exclude food families like "all nightshades" or "all alliums"
3. They can't exclude by compound sensitivity (e.g., "all high salicylate foods")
4. They have to click 15+ times to exclude all variants of a single food

## The Enhancement

Rename "CATEGORIES" to **"GROUPS"** and expand it to include:

1. **Food Families** — Botanical/animal groupings (Alliums, Nightshades, Cruciferous, etc.)
2. **Compound-based Groups** — Foods grouped by chemical content (High Salicylate, High Histamine, etc.)

When a practitioner selects a Group, all ingredients within that group should be excluded from recipe results.

## Your Task

Create a JSON configuration file that defines all the Groups. This will be used to:
1. Populate the GROUPS section in the UI
2. Power the search (typing "allium" should surface "Onion & Garlic (Alliums)")
3. Map each Group to the specific ingredients it contains

## Output Format

```json
{
  "groups": [
    {
      "id": "alliums",
      "displayName": "Onion & Garlic (Alliums)",
      "searchTerms": ["allium", "alliums", "onion", "garlic", "leek", "shallot", "chive", "scallion"],
      "type": "food_family",
      "ingredients": [
        "Yellow Onion",
        "Red Onion",
        "Green Onion",
        "White Onion",
        "Sweet Onion",
        "Onion Powder",
        "Dried Onion Flakes",
        "Pickled Red Onions",
        "Garlic",
        "Garlic Powder",
        "Garlic Scapes"
      ]
    },
    {
      "id": "high_salicylate",
      "displayName": "High Salicylate Foods",
      "searchTerms": ["salicylate", "salicylic acid", "salicylates"],
      "type": "compound",
      "ingredients": [
        "Blueberries",
        "Strawberries",
        "Almonds"
      ]
    }
  ]
}
```

## Groups to Create

### Food Families

| ID | Display Name | Search Terms | What to Include |
|----|--------------|--------------|-----------------|
| `alliums` | Onion & Garlic (Alliums) | allium, alliums, onion, garlic, leek, shallot, chive, scallion | All onions, garlic, leeks, shallots, chives, scallions and their variants |
| `nightshades` | Tomato & Pepper (Nightshades) | nightshade, nightshades, solanaceae, tomato, pepper, potato, eggplant | All tomatoes, peppers (bell, jalapeño, cayenne, etc.), potatoes, eggplant, paprika, chili powder |
| `cruciferous` | Broccoli & Cabbage (Cruciferous) | cruciferous, brassica, broccoli, cabbage, kale | Broccoli, cabbage, kale, cauliflower, Brussels sprouts, bok choy, arugula, radish, turnip |
| `citrus` | All Citrus | citrus, lemon, lime, orange, grapefruit | Lemon, lime, orange, grapefruit, and their juices/zests |
| `dairy` | All Dairy | dairy, milk, cheese, lactose | All milk (cow, goat, sheep), cheese, yogurt, cream, butter, buttermilk, kefir |
| `eggs` | All Eggs | egg, eggs | Eggs, egg whites, egg yolks, egg noodles |
| `tree_nuts` | All Tree Nuts | tree nut, tree nuts, nut, nuts | Almonds, walnuts, pecans, cashews, pistachios, macadamia, hazelnuts, Brazil nuts, pine nuts — and butters, milks, flours |
| `peanuts` | All Peanuts | peanut, peanuts | Peanuts, peanut butter, peanut sauce |
| `soy` | All Soy | soy, soya, tofu, edamame | Soy sauce, soy milk, tofu, tempeh, edamame, miso |
| `wheat` | All Wheat | wheat | All wheat flour, bread, pasta, tortillas, couscous |
| `gluten` | All Gluten | gluten | Wheat, barley, rye, and products containing them |
| `corn` | All Corn | corn, maize | Corn, cornmeal, corn tortilla, popcorn, corn starch, polenta |
| `rice` | All Rice | rice | All rice varieties, rice flour, rice noodles, rice paper, rice milk |
| `oats` | All Oats | oat, oats, oatmeal | Oats, oat flour, oat milk, oat bran |
| `fish` | All Fish | fish | All fish fillets, fish sauce, anchovies |
| `shellfish` | All Shellfish | shellfish, shrimp, crab, lobster, clam, mussel, scallop, oyster | Shrimp, crab, lobster, clams, mussels, scallops, oysters, calamari, octopus |
| `beef` | All Beef | beef | All beef cuts, ground beef, beef broth, beef liver |
| `pork` | All Pork | pork, bacon, ham | All pork cuts, bacon, ham, pork sausage |
| `poultry` | All Poultry | poultry, chicken, turkey, duck | Chicken, turkey, duck — all cuts, ground, broth |
| `lamb` | All Lamb | lamb | All lamb cuts, ground lamb |
| `legumes` | All Legumes | legume, legumes, bean, beans, lentil, lentils | Beans, lentils, chickpeas, peanuts |
| `mushrooms` | All Mushrooms | mushroom, mushrooms, fungi | All mushroom varieties |
| `squash` | All Squash | squash | Butternut, acorn, spaghetti squash, delicata, zucchini |
| `coconut` | All Coconut | coconut | Coconut, coconut oil, coconut milk, coconut cream, coconut flour |
| `sesame` | All Sesame | sesame, tahini | Sesame seeds, sesame oil, tahini |

### Compound-Based Groups

| ID | Display Name | Search Terms | What to Include |
|----|--------------|--------------|-----------------|
| `high_salicylate` | High Salicylate Foods | salicylate, salicylates, salicylic acid | Berries, almonds, apples, tomatoes, peppers, spices, honey, tea, vinegar |
| `high_oxalate` | High Oxalate Foods | oxalate, oxalates, oxalic acid | Spinach, rhubarb, beets, Swiss chard, almonds, chocolate, sweet potatoes |
| `high_histamine` | High Histamine Foods | histamine, histamines | Aged cheese, fermented foods, cured meats, vinegar, citrus, tomatoes, spinach, avocado |
| `high_fodmap` | High FODMAP Foods | fodmap, fodmaps | Onion, garlic, wheat, apples, pears, honey, milk, legumes, cauliflower, mushrooms |
| `high_lectin` | High Lectin Foods | lectin, lectins | Legumes, grains, nightshades, squash |

## Reference Data

Use `master_ingredients.xlsx` (Sheet: "Ingredients", Column A) as the source of truth for ingredient names. Only include ingredients that exist in this file.

## Validation Checklist

Before submitting:
- [ ] Every ingredient in the JSON exists exactly as spelled in `master_ingredients.xlsx`
- [ ] Ingredients that belong to multiple groups appear in all relevant groups
- [ ] Search terms include common misspellings and variations practitioners might type
- [ ] No duplicate ingredients within the same group

## Output

Save as `food_exclusion_groups.json`
