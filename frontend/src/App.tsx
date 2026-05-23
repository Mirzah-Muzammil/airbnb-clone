import { Route, Routes } from "react-router-dom";
import ErrorBoundary from "./components/ErrorBoundary";
import HomePage from "./pages/HomePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import PropertyDetailPage from "./pages/PropertyDetailPage.tsx";

const App = () => (
  <ErrorBoundary>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/property/:id" element={<PropertyDetailPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  </ErrorBoundary>
);

export default App;
