import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Importamos HashRouter para la navegación
import FormsLogin from "./components/formsLogin";
import FormsRegister from "./components/formsRegister";
import RestablecerContraseña from "./components/RestablecerContraseña";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormsLogin />} />
          <Route path="/registro" element={<FormsRegister />} />
          <Route path="/recuperar-password" element={<RestablecerContraseña />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
