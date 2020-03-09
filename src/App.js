import React from "react";
import NavBar from "./components/navbar";
import Routes from "./routes";
import { HashRouter } from "react-router-dom";

function App() {
  return (
    // HashRouter engloba todas as rotas
    <HashRouter>
      <div className="container">
        {/* Header */}
        <NavBar />
        {/* Rotas, é tipo router-outlet */}
        <Routes />
      </div>
    </HashRouter>
  );
}

export default App;
