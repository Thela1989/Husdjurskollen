// src/App.tsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Account from "./pages/Account";
import ".//assets/index.css";
import HealthPage from "./pages/HealthPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/account" element={<Account />} />
        <Route path="/pet/:id/health" element={<HealthPage />} />
      </Routes>
    </Router>
  );
}

export default App;
