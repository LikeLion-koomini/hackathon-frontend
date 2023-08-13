import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MyPage from "./components/MyPage";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/mypage" element={<MyPage />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
