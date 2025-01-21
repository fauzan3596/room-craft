import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import FurniturePage from "./pages/furniturePage";
import FurnitureDetailPage from "./pages/furnitureDetailPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FurniturePage />} />
        <Route path="/furniture/:id" element={<FurnitureDetailPage />} />
      </Routes>
    </Router>
  );
}

export default App;
