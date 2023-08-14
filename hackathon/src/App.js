import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/LoginPage/LoginPage";
import MainPage from "./components/MainPage/MainPage";
import SeriesList from "./components/SeriesPage/SeriesList";
import SeriesCreate from "./components/SeriesPage/SeriesCreate";
import SignUp from "./components/SignupPage/Signup";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/seriesList" element={<SeriesList />} />
          <Route path="/seriesList/create" element={<SeriesCreate />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
