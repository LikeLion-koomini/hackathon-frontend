import React, { useState, useEffect } from "react";
import styles from "./Topbar.module.css";
import images from "../../assets/images/images";
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router';
import axios from 'axios';

const toolData = {
  short: "3분 칼럼",
  normal: "단편 칼럼",
  series: "시리즈",
  calendar: "캘린더",
  community: "커뮤니티",
  myPage: "마이페이지",
};

/*
1. 현재 페이지 표시
<Topbar current="short"/> : 3분 칼럼 파란색
<Topbar current="normal"/> : 단편 칼럼 파란색
<Topbar current="series"/> : 시리즈 파란색
<Topbar current="calendar"/> : 캘린더 파란색
<Topbar current="community"/> : 커뮤니티 파란색
<Topbar current="myPage"/> : 커뮤니티 파란색

2. 로그인 여부 표시
<Topbar isLogin={true}/> : 로그인 했을 경우 topbar
<Topbar isLogin={false}/> : 로그인 안헀을 경우 topbar
*/
const Topbar = ({ current }) => {
  const [toolsJSX, setToolsJSX] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [cookie, removeCookie] = useCookies(["access_token", "refresh_token", "user_uuid"])
  const navigate = useNavigate()

  const clickLogoHandler = () => {
    alert("go to mainPage");
  };
  const clickUserManagerHandler = () => {
    if (isLogin) {
      axios.delete("http://127.0.0.1:8000/user/logout/")
      .then((res)=>{
        console.log(res)
        removeCookie("access_token", { path: "/" })
        removeCookie("refresh_token", { path: "/" })
        removeCookie("user_uuid", { path: "/" })
        navigate("/")
      }).catch((err)=>{
        console.error(err)
      })
    } else {
      navigate("/login")
    }
  };

  useEffect(() => {
    if(cookie.access_token){
      setIsLogin(()=>true)
    }
    const newToolsJSX = [];
    for (let toolId in toolData) {
      const toolName = toolData[toolId];
      if(!isLogin && toolName==="마이페이지"){
        continue;
      }
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
          로그아웃
        </div>
      )}
    </div>
  );
};

export default Topbar;
