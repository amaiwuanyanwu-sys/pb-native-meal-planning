import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NutritionPlan } from '../types/nutrition';
import { mockNutritionPlans } from '../data/mockNutritionPlans';

interface PlanContextType {
  plans: NutritionPlan[];
  addPlan: (plan: NutritionPlan) => void;
  updatePlan: (id: string, updates: Partial<NutritionPlan>) => void;
  deletePlan: (id: string) => void;
  getPlanById: (id: string) => NutritionPlan | undefined;
  accessPlan: (id: string) => void;
}

const PlanContext = createContext<PlanContextType | undefined>(undefined);

const STORAGE_KEY = 'nutrition_plans';

// Load plans from localStorage or use mock data
const loadPlans = (): NutritionPlan[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (error) {
    console.error('Failed to load plans from localStorage:', error);
  }
  return mockNutritionPlans;
};

// Save plans to localStorage
const savePlans = (plans: NutritionPlan[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(plans));
  } catch (error) {
    console.error('Failed to save plans to localStorage:', error);
  }
};

export const PlanProvider = ({ children }: { children: ReactNode }) => {
  const [plans, setPlans] = useState<NutritionPlan[]>(loadPlans);

  // Save to localStorage whenever plans change
  useEffect(() => {
    savePlans(plans);
  }, [plans]);

  const addPlan = (plan: NutritionPlan) => {
    setPlans([plan, ...plans]);
  };

  const updatePlan = (id: string, updates: Partial<NutritionPlan>) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) => (plan.id === id ? { ...plan, ...updates } : plan))
    );
  };

  const deletePlan = (id: string) => {
    setPlans((prevPlans) => prevPlans.filter((plan) => plan.id !== id));
  };

  const getPlanById = (id: string) => {
    return plans.find((p) => p.id === id);
  };

  const accessPlan = (id: string) => {
    setPlans((prevPlans) =>
      prevPlans.map((plan) =>
        plan.id === id ? { ...plan, lastAccessedAt: new Date().toISOString() } : plan
      )
    );
  };

  return (
    <PlanContext.Provider value={{ plans, addPlan, updatePlan, deletePlan, getPlanById, accessPlan }}>
      {children}
    </PlanContext.Provider>
  );
};

export const usePlans = () => {
  const context = useContext(PlanContext);
  if (!context) {
    throw new Error('usePlans must be used within PlanProvider');
  }
  return context;
};
