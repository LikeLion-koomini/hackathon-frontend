import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPage from "./components/MyPage";
import ColumnCreatePage from './components/ColumnCreatePage/ColumnCreatePage';

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/column/create" element={<ColumnCreatePage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
