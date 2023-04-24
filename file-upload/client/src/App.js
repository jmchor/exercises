import './App.css';
import Navbar from "./components/Navbar/Navbar";

import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import NotFoundPage from "./pages/NotFoundPage/NotFoundPage";

// src/App.js

import { Routes, Route, Link } from "react-router-dom";
import AddMovie from "./pages/AddMovie/AddMovie"

function App() {
  return (
    <div className="App">
      <nav>
        <Link to="/"> Home </Link>
        <Link to="/movies/add"> Add a movie </Link>
      </nav>

      <Routes>
        <Route path="/" element={ <HomePage /> } />
        <Route path="/movies/add" element={ <AddMovie /> } />
      </Routes>
    </div>
  );
}

export default App;
