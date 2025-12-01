import foodExclusionGroupsJson from '../constants/food_exclusion_groups.json';
import { FOOD_EXCLUSIONS, FoodItem } from '../constants/foodExclusions';

export interface EnhancedFoodItem extends FoodItem {
  groupIds: string[];
  searchTerms: string[];
  type?: 'allergen' | 'food-family' | 'compound';
}

export interface FoodExclusionGroup {
  id: string;
  name: string;
  type: 'allergen' | 'food-family' | 'compound';
  searchTerms: string[];
  members: string[];
  memberCount: number;
  csvColumn?: string;
  isGroup: true;
}

class FoodExclusionService {
  private groups: Map<string, FoodExclusionGroup>;
  private ingredients: Map<string, EnhancedFoodItem>;
  private searchIndex: Map<string, Set<string>>; // searchTerm -> item names

  constructor() {
    this.groups = new Map();
    this.ingredients = new Map();
    this.searchIndex = new Map();
    this.initialize();
  }

  private initialize() {
    // Load JSON groups
    foodExclusionGroupsJson.groups.forEach((group: any) => {
      this.groups.set(group.id, {
        ...group,
        memberCount: group.members.length,
        isGroup: true
      });

      // Index search terms for groups
      group.searchTerms.forEach((term: string) => {
        const lowerTerm = term.toLowerCase();
        if (!this.searchIndex.has(lowerTerm)) {
          this.searchIndex.set(lowerTerm, new Set());
        }
        this.searchIndex.get(lowerTerm)!.add(group.name);
      });

      // Also index the group name itself
      const lowerName = group.name.toLowerCase();
      if (!this.searchIndex.has(lowerName)) {
        this.searchIndex.set(lowerName, new Set());
      }
      this.searchIndex.get(lowerName)!.add(group.name);
    });

    // Load JSON ingredients with multi-group membership
    foodExclusionGroupsJson.ingredients.forEach((ing: any) => {
      const groupFromMap = this.groups.get(ing.groupIds[0]);

      this.ingredients.set(ing.name, {
        name: ing.name,
        tags: ing.groupIds.map((id: string) => this.groups.get(id)?.name || id),
        groupIds: ing.groupIds,
        searchTerms: ing.searchTerms || [],
        isGroup: false,
        type: groupFromMap?.type
      });

      // Index search terms for ingredients
      ing.searchTerms?.forEach((term: string) => {
        const lowerTerm = term.toLowerCase();
        if (!this.searchIndex.has(lowerTerm)) {
          this.searchIndex.set(lowerTerm, new Set());
        }
        this.searchIndex.get(lowerTerm)!.add(ing.name);
      });

      // Also index the ingredient name itself
      const lowerName = ing.name.toLowerCase();
      if (!this.searchIndex.has(lowerName)) {
        this.searchIndex.set(lowerName, new Set());
      }
      this.searchIndex.get(lowerName)!.add(ing.name);
    });

    // Merge legacy foodExclusions.ts (for items not in JSON)
    FOOD_EXCLUSIONS.forEach(item => {
      if (!item.isGroup && !this.ingredients.has(item.name)) {
        this.ingredients.set(item.name, {
          ...item,
          groupIds: [],
          searchTerms: [],
          type: undefined
        });

        // Index legacy items
        const lowerName = item.name.toLowerCase();
        if (!this.searchIndex.has(lowerName)) {
          this.searchIndex.set(lowerName, new Set());
        }
        this.searchIndex.get(lowerName)!.add(item.name);
      }
    });
  }

  getAllGroups(): FoodExclusionGroup[] {
    return Array.from(this.groups.values()).sort((a, b) => {
      // Sort by type first (allergen, food-family, compound), then by name
      if (a.type !== b.type) {
        const typeOrder = { allergen: 1, 'food-family': 2, compound: 3 };
        return typeOrder[a.type] - typeOrder[b.type];
      }
      return a.name.localeCompare(b.name);
    });
  }

  getGroupsByType(type: 'allergen' | 'food-family' | 'compound'): FoodExclusionGroup[] {
    return this.getAllGroups().filter(g => g.type === type);
  }

  getGroupById(groupId: string): FoodExclusionGroup | undefined {
    return this.groups.get(groupId);
  }

  getGroupByName(groupName: string): FoodExclusionGroup | undefined {
    return Array.from(this.groups.values()).find(g => g.name === groupName);
  }

  getIngredientsByGroup(groupId: string): EnhancedFoodItem[] {
    const group = this.groups.get(groupId);
    if (!group) return [];

    return Array.from(this.ingredients.values())
      .filter(ing => ing.groupIds.includes(groupId));
  }

  getAllIngredients(): EnhancedFoodItem[] {
    return Array.from(this.ingredients.values());
  }

  getIngredient(name: string): EnhancedFoodItem | undefined {
    return this.ingredients.get(name);
  }

  search(query: string): {
    groups: FoodExclusionGroup[];
    ingredients: EnhancedFoodItem[];
  } {
    if (!query || query.trim() === '') {
      return {
        groups: [],
        ingredients: []
      };
    }

    const lowerQuery = query.toLowerCase().trim();
    const matchedGroups = new Set<string>();
    const matchedIngredients = new Set<string>();

    // Search in index for partial matches
    this.searchIndex.forEach((items, term) => {
      if (term.includes(lowerQuery) || lowerQuery.includes(term)) {
        items.forEach(itemName => {
          const group = Array.from(this.groups.values())
            .find(g => g.name === itemName);
          if (group) {
            matchedGroups.add(group.id);
          } else if (this.ingredients.has(itemName)) {
            matchedIngredients.add(itemName);
          }
        });
      }
    });

    // Separate direct matches from group member matches for prioritization
    const directMatches = new Set(matchedIngredients);
    const groupMemberMatches = new Set<string>();

    // Add all members of matched groups to the ingredients list
    matchedGroups.forEach(groupId => {
      const group = this.groups.get(groupId);
      if (group) {
        group.members.forEach(memberName => {
          if (this.ingredients.has(memberName)) {
            // Track if this is a direct match or just a group member
            if (!directMatches.has(memberName)) {
              groupMemberMatches.add(memberName);
            }
            matchedIngredients.add(memberName);
          }
        });
      }
    });

    // Sort ingredients with intelligent prioritization
    const sortedIngredients = Array.from(matchedIngredients)
      .map(name => this.ingredients.get(name)!)
      .filter(Boolean)
      .sort((a, b) => {
        const aIsDirect = directMatches.has(a.name);
        const bIsDirect = directMatches.has(b.name);

        // Prioritize direct matches over group member matches
        if (aIsDirect && !bIsDirect) return -1;
        if (!aIsDirect && bIsDirect) return 1;

        // Within same priority level, sort alphabetically
        return a.name.localeCompare(b.name);
      });

    return {
      groups: Array.from(matchedGroups)
        .map(id => this.groups.get(id)!)
        .filter(Boolean)
        .sort((a, b) => {
          // Sort by type first, then by name
          if (a.type !== b.type) {
            const typeOrder = { allergen: 1, 'food-family': 2, compound: 3 };
            return typeOrder[a.type] - typeOrder[b.type];
          }
          return a.name.localeCompare(b.name);
        }),
      ingredients: sortedIngredients
    };
  }

  isItemDisabledByGroup(itemName: string, selectedExclusions: string[]): boolean {
    const item = this.ingredients.get(itemName);
    if (!item) return false;

    // Check if any selected group contains this item
    return selectedExclusions.some(selected => {
      const group = this.getGroupByName(selected);
      if (!group) return false;

      return group.members.includes(itemName);
    });
  }

  // Get all items for display (both groups and ingredients)
  getAllFoodItems(): FoodItem[] {
    const groupItems: FoodItem[] = this.getAllGroups().map(g => ({
      name: g.name,
      tags: [g.type],
      isGroup: true
    }));

    const ingredientItems: FoodItem[] = this.getAllIngredients().map(ing => ({
      name: ing.name,
      tags: ing.tags,
      isGroup: false
    }));

    return [...groupItems, ...ingredientItems];
  }
}

// Export singleton instance
export const foodExclusionService = new FoodExclusionService();
