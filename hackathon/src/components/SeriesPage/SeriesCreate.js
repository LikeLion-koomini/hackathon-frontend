import React, {useState} from "react";
import styles from './SeriesCreate.module.css';
import { useNavigate } from "react-router-dom";
import { useCookies } from 'react-cookie';
import axios from 'axios'

const SeriesCreate = () => {
  const [cookie] = useCookies(["access_token"])
  const [title,setTitle] = useState('');
  const [detail,setDetail] = useState('');

  // navigate
  const navigate = useNavigate();

  const seriesTitle = event => {
    setTitle(event.target.value)
  }

  const seriesDetail = event => {
    setDetail(event.target.value)
  }

  const seriesCreateHandler = async (event) => {
    event.preventDefault();
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/series/create/", {
        title: title,
        content: detail,
      },{
        headers:{ Authorization: `Bearer ${cookie.access_token}` },
      }).then((res)=>{
        console.log(res)
      });
      navigate('/seriesList');
    } catch (error) {
      console.error("error", error);
    }

  };
  
  return (
    <div>
      <form onSubmit={seriesCreateHandler}>
        <div className={styles.create_container}>
          <h1>시리즈 제목</h1>
          <div className={styles.create_title}>
            <input onChange={seriesTitle} type="text" />
          </div>
          <h1>시리즈 설명</h1>
          <div className={styles.create_textarea}>
            <textarea onChange={seriesDetail} name="" id="" cols="30" rows="10" ></textarea>
          </div>
          <h1>카테고리</h1>
          <div className={styles.create_tags}>
            tags, tags, tags
          </div>
          <div className={styles.create_button}>
            <button>발행하기</button>
          </div>
        </div>
      </form>
    </div>
  )
};

export default SeriesCreate;