import React, { useState } from "react";
import styles from "./LoginPage.module.css"
import Topbar from '../Topbar/Topbar';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useCookies } from 'react-cookie';

const LoginPage = () => {
  const [id, setId] = useState(""); //아이디와 비밀번호가 빈칸이 아닌지 유효성 검사
  const [pw, setPw] = useState("");
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const navigate = useNavigate();
  // cookies
  const [cookie, setCookie] = useCookies(["access_token", "refresh_token", "user_uuid"])
  const idHandler = (event) => {
    setIdValid(false);
    setId(event.target.value);
  };

  const pwHandler = (event) => {
    setPwValid(false);
    setPw(event.target.value);
  };

  const loginHandler = async (event) => {
    event.preventDefault();

    if (id.trim().length === 0) {
      setIdValid(true);
    } else if (pw.trim().length === 0) {
      setPwValid(true);
    } else {
      try {
        const response = await axios.post("http://127.0.0.1:8000/user/login/", {
          userId: id,
          password: pw,
        });

        console.log("Login success:", response.data);
        navigate("/");
      } catch (error) {
        console.error("Login error:", error);
        alert("로그인 정보가 맞지 않습니다. 다시 로그인해주세요");
      }
    }
    console.log(id)
    console.log(pw)
    axios.post('http://127.0.0.1:8000/user/login/', {
      userId:id,
      password:pw,
    }).then((res)=>{
      console.log(res)
      //set cookies
      const access_token = res.data.token.access
      const refresh_token = res.data.token.refresh
      const user_uuid = res.data.user.uuid
      console.log(access_token + "\n" + refresh_token + "\n" + user_uuid)
      setCookie("access_token", access_token, {path:"/"})
      setCookie("refresh_token", refresh_token, {path:"/"})
      setCookie("user_uuid", user_uuid, {path:"/"})
    }).catch((err)=>{
      console.log(err)
    })
  }

  // navigate

  const passwordForgetHandler = () => {
    navigate('#');
  };

  return (
    <div>
      <Topbar/>
      <div className={styles.login_container}>
        <div className={styles.login_logo}>
          <h1>
            Economys<span>Times</span>
          </h1>
        </div>
        <form onSubmit={loginHandler}>
          <div className={styles.login_form}>
            <div className={styles.login_input}>
              <input onChange={idHandler} type="text" placeholder="id" />
            </div>
            <div className={styles.login_input} style={{ paddingBottom: "2rem" }}>
              <input
                onChange={pwHandler}
                type="password"
                placeholder="password"
              />
            </div>
            <div className={styles.login_button}>
              <button type="submit">Log In</button>
            </div>
          </div>
        </form>
        {idValid && (
          <p className={styles.login_invalid}>아이디를 입력해주세요.</p>
        )}
        {pwValid && (
          <p className={styles.login_invalid}>비밀번호를 입력해주세요.</p>
        )}
        <div className={styles.login_replace}>
          <div>Kakao</div>
          <div>Naver</div>
          <div>Google</div>
        </div>
        <div className={styles.login_forget}>
          <p onClick={passwordForgetHandler}>Forget Password?</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
