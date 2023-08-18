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

const urlList = {
  short:"/column",
  normal:"/column",
  series:"/seriesList",
  calendar:"/calendar",
  community:"/community",
  myPage:"/profile",
}
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
    navigate("/")
  };
  const clickUserManagerHandler = () => {
    console.log(cookie.access_token)
    if (isLogin) {
      axios.delete("http://127.0.0.1:8000/user/logout/")
      .then((res)=>{
        console.log(res)
        removeCookie("access_token", {path:"/"})
        removeCookie("refresh_token", { path: "/" })
        removeCookie("user_uuid", { path: "/" })
        setIsLogin(()=>false)
        console.log(isLogin)
        console.log("accessToken:\n"+cookie.access_token)
        navigate("/")
      }).catch((err)=>{
        console.error(err)
      })
    } else {
      navigate("/login")
    }
  };
  const clickTopbarToolsHandler = (e) =>{
    const toolId = e.target.id;
    const urlName = urlList[toolId]
    const state = toolId==="normal"?"normal":"short";
    navigate(urlName, {state:state})
  }
  useEffect(()=>{
    if(cookie.access_token){
      setIsLogin(()=>true)
    }
  },[])
  useEffect(() => {
    console.log(cookie.access_token)
    const newToolsJSX = [];
    for (let toolId in toolData) {
      const toolName = toolData[toolId];
      if(cookie.access_token && toolName==="마이페이지"){
        continue;
      }
      if (toolId === current) {
        newToolsJSX.push(
          <div className={styles.currentTool} id={toolId} key={toolId} onClick={clickTopbarToolsHandler}>
            {toolName}
          </div>
        );
      } else {
        newToolsJSX.push(
          <div className={styles.tool} id={toolId} key={toolId} onClick={clickTopbarToolsHandler}>
            {toolName}
          </div>
        );
      }
    }
    setToolsJSX(() => newToolsJSX);
  }, [current, cookie.access_token, cookie.user_uuid, isLogin]);

  return (
    <div className="flex flex-col md:flex-row justify-between items-center bg-white border-b-2 border-gray-300 w-full mx-auto h-16 px-4">
      <div className="flex items-center mb-4 md:mb-0 h-full">
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
