import React, {useState, useEffect} from 'react';
import styles from "./Topbar.module.css"
import images from '../../assets/images/images';
import { useCookies } from 'react-cookie';

const toolData = {
  'short':"3분 칼럼",
  'normal':"단편 칼럼",
  'series':"시리즈",
  'calendar':"캘린더",
  'community':"커뮤니티",
}

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
const Topbar = ({current})=>{
  const [toolsJSX, setToolsJSX] = useState([])
  const [isLogin, setIsLogin] = useState([])
  const [cookie] = useCookies(["access_token"])
  const clickLogoHanlder = ()=>{
    alert("go to mainPage")
  }
  const clickUserManagerHandler = ()=>{
    if(isLogin){
      alert("go to mypage")
    }else{
      alert("go to login/signup page")
    }
  }

  useEffect(()=>{
    setIsLogin(()=>cookie.access_token?true:false)
    const newToolsJSX = []
    for(let toolId in toolData){
      const toolName = toolData[toolId];
      console.log(toolName)
      if(toolId==current){
        newToolsJSX.push(
          <span className={styles.currentTool} id={toolId} key={toolId}>{toolName}</span>
        )
      }else{
        newToolsJSX.push(
          <span className={styles.tool} id={toolId} key={toolId}>{toolName}</span>
        )
      }
    }
    setToolsJSX(()=>newToolsJSX)
  }, [])

  return (
    <div className={styles.topbarContainer}>
      <div className={styles.topbarTools}>
        <img src={images.logo} alt='logo' onClick={clickLogoHanlder} className={styles.logo}/>
        {toolsJSX}
      </div>
      {!isLogin && <div className={styles.userStatusTool} onClick={clickUserManagerHandler}>로그인 | 회원가입</div>}
      {isLogin && <div className={styles.userStatusTool} onClick={clickUserManagerHandler}>마이 페이지</div>}
    </div>
  )
}

export default Topbar