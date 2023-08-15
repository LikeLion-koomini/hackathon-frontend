import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColumnCreatePage from './components/ColumnCreatePage/ColumnCreatePage';
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import SeriesList from "./components/SeriesPage/SeriesList";
import SeriesCreate from "./components/SeriesPage/SeriesCreate";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/column/create" element={<ColumnCreatePage />} />
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seriesList" element={<SeriesList />} />
          <Route path="/seriesList/create" element={<SeriesCreate />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
