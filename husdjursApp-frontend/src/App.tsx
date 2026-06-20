// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Account from "./pages/Account";
import "./assets/index.css";
import Header from "./components/Header";
import HealthPage from "./pages/HealthPage";
import PetProfilePage from "./pages/PetProfilePage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/pet/:id/health" element={<HealthPage />} />
        <Route path="/pet/:id/profile" element={<PetProfilePage />} />
      </Routes>
    </Router>
  );
}

export default App;
