import React from "react";
import styles from './Series.module.css'
import { useNavigate } from 'react-router-dom';

const Series = (props) => {
  const navigate = useNavigate()

  const seriesClickHandler = (e)=>{
    const series_id = props.series.series_id;
    console.log(series_id)
    navigate('/seriesList/column/', {state:series_id})
  }

  return(
    <div key={props.series.series_id} className={styles.series} onClick={seriesClickHandler}>
      <div className={styles.series_color}></div>
      <div className={styles.series_context_box}>
        <div className={styles.series_context}>
          <div className={styles.context1}>
            <h2>{props.series.user}</h2>
          </div>
          <h1>{props.series.title}</h1>
          <p>{props.series.content}</p>
          <div className={styles.context2}>
            <h3>게시물 : {}개</h3>
            <h3>{props.series.created_at}</h3>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Series;