import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColumnCreatePage from './components/ColumnCreatePage/ColumnCreatePage';
import ColumnDetailPage from './components/ColumnDetailPage/ColumnDetailPage';
import LoginPage from "./components/LoginPage/LoginPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/column/create" element={<ColumnCreatePage />} />
          <Route path="/column/detail" element={<ColumnDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
