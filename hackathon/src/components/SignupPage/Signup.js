import React, {useState} from "react";
import styles from './Signup.module.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import Topbar from '../Topbar/Topbar';
const SignUp = () => {
  // 회원가입 정보
  const [idCheck,setIdCheck] = useState('');
  const [pwCheck,setPwCheck] = useState('');
  const [pw2Check,setPw2Check] = useState('');
  const [nameCheck,setNameCheck] = useState('');
  const [birthCheck,setBirthCheck] = useState('');
  const [emailCheck,setEmailCheck] = useState('');
  const [telCheck,setTelCheck] = useState('');
  const navigate = useNavigate();

  //form정보에 대한 간단한 유효성 검사 : 비밀번호와 비밀번호 확인이 같은지, 폼에 모든 양식이 기입되어있는지
  const [pwAlert,setPwAlert] = useState(false);
  const [formAlert,setFormAlert] = useState(false);

  // cookie
  const [cookie, setCookie] = useCookies(['access_token', 'refresh_token', 'user_uuid'])

  //form 데이터
  const idChecking = (event) => {
    setFormAlert(false);
    setIdCheck(event.target.value);
  };
  const pwChecking = (event) => {
    setFormAlert(false);
    setPwAlert(false);
    setPwCheck(event.target.value);
  };
  const pw2Checking = (event) => {
    setFormAlert(false);
    setPwAlert(false);
    setPw2Check(event.target.value);
  };
  const nameChecking = (event) => {
    setFormAlert(false);
    setNameCheck(event.target.value);
  };
  const birthChecking = (event) => {
    setFormAlert(false);
    setBirthCheck(event.target.value);
  };
  const emailChecking = (event) => {
    setFormAlert(false);
    setEmailCheck(event.target.value);
  };
  const telChecking = (event) => {
    setFormAlert(false);
    setTelCheck(event.target.value);
  };

  //form 데이터 전송
  const signUpHandler = (event) => {
    event.preventDefault();

    //유효성 검사
    if (idCheck.trim().length === 0 || pwCheck.trim().length === 0 || pw2Check.trim().length === 0 || nameCheck.trim().length === 0 || birthCheck.trim().length === 0 || emailCheck.trim().length === 0 || telCheck.trim().length === 0) {
      setFormAlert(true);
      return
    } else if (pwCheck !== pw2Check) {
      setPwAlert(true);
      return;
    }
    // console.log(idCheck, pwCheck, pw2Check, nameCheck, birthCheck, emailCheck, telCheck);
    axios.post('http://127.0.0.1:8000/user/signup/',{
      userId:idCheck,
      password:pwCheck,
      userName:nameCheck,
      birth:birthCheck,
      email:emailCheck,
      phone_number:telCheck,
    }).then((res)=>{
      console.log(res)
      const access_token = res.data.token.access_token
      const refresh_token = res.data.token.refresh_token
      const user_uuid = res.data.user.uuid
      setCookie("access_token", access_token, {path:"/"})
      setCookie("refresh_token", refresh_token, {path:"/"})
      setCookie("user_uuid", user_uuid, {path:"/"})
      navigate('/');
    }).catch((err)=>{
      console.log(err)
      console.log("sign up error!")
    })
  };

  return (
    <div>
      <Topbar/>
      <div className={styles.signup_container}>
        <h1 style={{fontSize:'2.4rem'}}>Economys<span>Times</span></h1>
        <h1>회원가입</h1>
        <form onSubmit={signUpHandler}>
          <div className={styles.signup_box}>
            <div className={styles.signup_form}>
              <div className={styles.form_label}>
                <label htmlFor="id">아이디</label>
              </div>
              <div className={styles.form_input1}>
                <input onChange={idChecking} type="text" id="id"/>
              </div>
              <button>중복확인</button>
            </div>
            <div className={styles.signup_form}>
              <div className={styles.form_label}>
                <label htmlFor="pw">비밀번호</label>
              </div>
              <div className={styles.form_input}>
                <input onChange={pwChecking} type="password" id="pw"/>
              </div>
            </div>
            <div className={styles.signup_form}>
              <div className={styles.form_label}>
                <label htmlFor="pwcheck">비밀번호 확인</label>
              </div>
              <div className={styles.form_input}>
                <input onChange={pw2Checking} type="password" id="pwcheck"/>
              </div>
            </div>
            <div className={styles.signup_form}>
              <div className={styles.form_label}>
                <label htmlFor="name">이름</label>
              </div>
              <div className={styles.form_input}>
                <input onChange={nameChecking} type="text" id="name"/>
              </div>
            </div>
            <div className={styles.signup_form}>
              <div className={styles.form_label}>
                <label htmlFor="birth">생년월일</label>
              </div>
              <div className={styles.form_input}>
                <input onChange={birthChecking} type="date" id="birth"/>
              </div>
            </div>
            <div className={styles.signup_form}>
              <div className={styles.form_label}>
                <label htmlFor="email">이메일</label>
              </div>
              <div className={styles.form_input}>
                <input onChange={emailChecking} type="email" id="email"/>
              </div>
            </div>
            <div className={styles.signup_form}>
              <div className={styles.form_label}>
                <label htmlFor="tel">전화번호</label>
              </div>
              <div className={styles.form_input}>
                <input onChange={telChecking} type="tel" id="tel"/>
              </div>
            </div>
          </div>
          {pwAlert && <div className={styles.signup_alert}>비밀번호를 다시 확인해주세요</div>}
          {formAlert && <div className={styles.signup_alert}>모든 정보를 기입해주세요</div>}
          <div className={styles.signup_button}>
            <button>회원가입</button>
          </div>
        </form>
      </div>
    </div>
  )
};

export default SignUp;