import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Importamos HashRouter para la navegación
import FormsLogin from "./components/formsLogin";
import FormsRegister from "./components/formsRegister";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormsLogin />} />
          <Route path="/registro" element={<FormsRegister />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
