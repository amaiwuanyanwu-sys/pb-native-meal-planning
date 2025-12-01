import { HashRouter, Routes, Route } from 'react-router-dom';
import { PlanProvider } from './contexts/PlanContext';
import NutritionPlansPage from './pages/NutritionPlansPage';
import PlanDetailPage from './pages/PlanDetailPage';
import RecipesPage from './pages/RecipesPage';
import WizardPage from './pages/WizardPage';

function App() {
  return (
    <HashRouter>
      <PlanProvider>
        <Routes>
          <Route path="/" element={<NutritionPlansPage />} />
          <Route path="/plans/:id" element={<PlanDetailPage />} />
          <Route path="/plans/:id/assistant" element={<WizardPage />} />
          <Route path="/recipes" element={<RecipesPage />} />
        </Routes>
      </PlanProvider>
    </HashRouter>
  );
}

export default App
