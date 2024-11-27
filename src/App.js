import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // Importamos HashRouter para la navegación
import FormsLogin from "./components/formsLogin";
import FormsRegister from "./components/formsRegister";
import RestablecerContraseña from "./components/RestablecerContraseña";
import Home from "./components/home";
import Fact1Page from "./components/fact1";
import Fact2Page from "./components/fact2";
import Fact3Page from "./components/fact3";

function App() {
  return (
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<FormsLogin />} />
          <Route path="/registro" element={<FormsRegister />} />
          <Route path="/recuperar-password" element={<RestablecerContraseña />} />
          <Route path="/home" element={<Home />} />
          <Route path="/fact1" element={<Fact1Page />} />
          <Route path="/fact2" element={<Fact2Page />} />
          <Route path="/fact3" element={<Fact3Page />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
