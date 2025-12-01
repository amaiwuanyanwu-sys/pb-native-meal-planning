export interface Recipe {
  id: string;
  name: string;
  imageUrl: string;
  mealType?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  calories?: number;
  protein?: number;      // grams
  carbs?: number;        // grams
  fats?: number;         // grams
  prepTime?: number;     // minutes
  ingredients?: number;  // count
  cuisine?: string;
  tags?: string[];
}

export type PlanVisibility = 'draft' | 'shared';

export interface MealPlan {
  id: string;
  name: string;
  duration: string;
  recipesCount: number;
  images: string[];
}

export interface NutritionPlan {
  id: string;
  title: string;
  plansCount: number;
  recipesCount: number;
  avatarUrl: string | null;
  ownerName: string;
  status: 'active' | 'inactive';
  createdAt: string; // ISO date string for sorting
  lastAccessedAt?: string; // ISO date string for tracking when plan was last accessed
  visibility?: PlanVisibility; // Optional: 'draft' or 'shared' status for filtering
  // Detailed plan information
  dietaryPreferences?: string;
  goals?: string;
  medicalConditions?: string;
  exclusions?: string;
  mealPlans?: MealPlan[];
  recipes?: Recipe[];
}

export type PlanStatus = 'all' | 'active' | 'inactive';

export interface NutritionPlanCardProps {
  plan: NutritionPlan;
  onClick?: (plan: NutritionPlan) => void;
}

export interface NutritionPlanListItemProps {
  plan: NutritionPlan;
  onClick?: (plan: NutritionPlan) => void;
  onDelete?: (plan: NutritionPlan) => void;
}

export interface AvatarProps {
  imageUrl?: string | null;
  name: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: (e?: React.MouseEvent<HTMLButtonElement>) => void;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  disabled?: boolean;
}

export interface TabsProps {
  tabs: Array<{ id: PlanStatus; label: string }>;
  activeTab: PlanStatus;
  onChange: (tabId: PlanStatus) => void;
}

export interface Owner {
  id: string;
  name: string;
  avatarUrl: string | null;
}

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
}

export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  error?: string;
  className?: string;
  type?: string;
  autoFocus?: boolean;
  ref?: React.Ref<HTMLInputElement>;
}

export interface SelectOption {
  id: string;
  name: string;
  avatarUrl: string | null;
  isTemplate?: boolean;
  icon?: React.ReactNode;
}

export interface SelectProps {
  label: string;
  value: string | null;
  onChange: (value: string | null) => void;
  options: SelectOption[];
  placeholder?: string;
  helpText?: string;
  className?: string;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  showAvatar?: boolean;
}

export interface NewNutritionPlanModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (planData: { title: string; ownerId: string | null }) => void;
  availableOwners: SelectOption[];
}

export interface PlanDetailHeaderProps {
  plan: NutritionPlan;
  onBack: () => void;
}

export interface TabControlPanelProps<T extends string = string> {
  tabs: Array<{ id: T; label: string }>;
  activeTab: T;
  onTabChange: (tabId: T) => void;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
}
