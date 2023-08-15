import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ColumnCreatePage from "./components/ColumnCreatePage/ColumnCreatePage";
import LoginPage from "./components/LoginPage/LoginPage";
import MyPage from "./components/MyPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/column/create" element={<ColumnCreatePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/profile" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
