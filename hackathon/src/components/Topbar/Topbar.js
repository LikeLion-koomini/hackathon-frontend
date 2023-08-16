import React, { useState, useEffect } from "react";
import styles from "./Topbar.module.css";
import images from "../../assets/images/images";

const toolData = {
  short: "3분 칼럼",
  normal: "단편 칼럼",
  series: "시리즈",
  calendar: "캘린더",
  community: "커뮤니티",
};

/*
1. 현재 페이지 표시
<Topbar current="short"/> : 3분 칼럼 파란색
<Topbar current="normal"/> : 단편 칼럼 파란색
<Topbar current="series"/> : 시리즈 파란색
<Topbar current="calendar"/> : 캘린더 파란색
<Topbar current="community"/> : 커뮤니티 파란색

2. 로그인 여부 표시
<Topbar isLogin={true}/> : 로그인 했을 경우 topbar
<Topbar isLogin={false}/> : 로그인 안헀을 경우 topbar
*/
const Topbar = ({ current, isLogin }) => {
  const [toolsJSX, setToolsJSX] = useState([]);


  const clickLogoHanlder = () => {
    alert("go to mainPage");
  };
  const clickUserManagerHandler = () => {
    if (isLogin) {
      alert("go to mypage");
    } else {
      alert("go to login/signup page");
    }
  };

  useEffect(() => {
    const newToolsJSX = [];
    for (let toolId in toolData) {
      const toolName = toolData[toolId];
      console.log(toolName);
      if (toolId === current) {
        newToolsJSX.push(
          <span className={styles.currentTool} id={toolId}>
            {toolName}
          </span>
        );
      } else {
        newToolsJSX.push(
          <span className={styles.tool} id={toolId}>
            {toolName}
          </span>
        );
      }
    }
    setToolsJSX(() => newToolsJSX);
  }, [current]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white border-b-2 border-gray-300 w-full mx-auto h-16 px-4">
      <div className="flex items-center mb-4 md:mb-0">
        <img
          src={images.logo}
          alt="logo"
          onClick={clickLogoHandler}
          className="w-56 cursor-pointer object-contain"
        />
        {toolsJSX}
      </div>
      {!isLogin && (
        <div
          className="flex items-center border rounded border-gray-700 p-2 cursor-pointer"
          onClick={clickUserManagerHandler}
        >
          로그인 | 회원가입
        </div>
      )}
      {isLogin && (
        <div
          className="flex items-center border rounded border-blue-700 p-2 cursor-pointer"
          onClick={clickUserManagerHandler}
        >
          마이 페이지
        </div>
      )}
    </div>
  );
};

export default Topbar;
