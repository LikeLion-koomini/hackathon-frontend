import React from "react";
import Topbar from "../Topbar/Topbar";

const SearchComponent = () => {
  return (
    <div>
      <div>
        <input
          type="text"
          style={{
            width: 550,
            height: 40,
            padding: 12,
            fontSize: 14,
            borderWidth: 1,
            borderColor: "#002947",
            borderRadius: 8,
          }}
          placeholder="# 칼럼 제목으로 검색"
        />
      </div>
    </div>
  );
};

const ColumnPage = () => {
  return (
    <div>
      <div className="fixed top-0 left-0 w-full z-10">
        <Topbar current="normal" isLogin={false} />
      </div>
      <div className="mt-24 flex justify-center">
        <SearchComponent />
      </div>
    </div>
  );
};

export default ColumnPage;
