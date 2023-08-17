import React ,{useState, useEffect} from "react";
import styles from './SeriesList.module.css';
import { useNavigate } from "react-router-dom";
import Series from "./Series";
import axios from 'axios'

//연습용 seriesList
const initialList = [
  {series_id: 1, user : '홍길동',  title : '타이틀', content : 'lorem', created_at : '2023-08-08'}, 
  {series_id: 2, user : '홍길동',  title : '타이틀', content : 'lorem', created_at : '2023-08-08'},
  {series_id: 3, user : '홍길동',  title : '타이틀', content : 'lorem', created_at : '2023-08-08'}, 
  {series_id: 4, user : '홍길동',  title : '타이틀', content : 'lorem', created_at : '2023-08-08'},
]

const SeriesList = () => {

  const [series,setSeries] = useState(initialList)

  // navigate
  const navigate = useNavigate();
  const createSeriestHandler = () => {
    navigate('/seriesList/create');
  };

  //series 정보 받아오기 : 서버에서 객체를 리스트로 받아온다음 map함수로 리스트안의 객체를 분배
  useEffect(()=> {
    axios.get('http://127.0.0.1:8000/series/').then(response => {
      setSeries((prev)=>{
        return [...prev, response.data];
      });
      console.log('성공');
    }).catch((error) => {
      console.log(error);
    })
  });

  console.log(series);


  return (
    <div className={styles.series_container}>
      <div className={styles.series_search}>
        <input type="search" />
      </div>
      <div className={styles.series_tags}>
        tags, tags, tags
      </div>
      <div className={styles.series_box}>
        {series.map((seriesContent)=>(
          <Series series={seriesContent}/> //key속성에 {uuid} 삽입
        ))}
      </div>
      <div className={styles.series_footer}>
        <div className={styles.footer_button} style={{visibility:'hidden'}}>
          <button>시리즈 생성</button>
        </div>
        <div>pagination</div>
        <div className={styles.footer_button}>
          <button onClick={createSeriestHandler}>시리즈 생성</button>
        </div>
      </div>
    </div>
  )
};

export default SeriesList;