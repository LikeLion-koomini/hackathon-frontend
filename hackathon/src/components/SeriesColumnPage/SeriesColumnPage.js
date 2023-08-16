import React, { useEffect, useState } from 'react';
import styles from '../SeriesColumnPage/SeriesColumnPage.module.css'
import Topbar from '../Topbar/Topbar';
import axios from 'axios';
const SeriesColumnPage = ()=>{
  const [seriesData, setSeriesData] = useState({})
  const [columnJSXList, setColumnJSXList] = useState([])
  const [page, setPage] = useState(1)

  // 시리즈 정보 받아옴
  useEffect(()=>{
    const series_id = '0c62500b-f191-4fcb-ad3e-5b6db9506731'
    // 시리즈 정보 받아옴.
    axios.get(`http://127.0.0.1:8000/series/${series_id}/`)
    .then((res)=>{
      console.log(res)
      setSeriesData(()=>res.data)
    }).catch((err)=>{
      console.log(err)
    })
    // 시리즈 관련 칼럼 정보 받아옴
    axios.get(`http://127.0.0.1:8000/series/${series_id}/column/`)
    .then((res)=>{
      console.log(res)
      let newColumnJSXList = []
      const columnDataList = res.data;
      for(let i=0; i<columnDataList.length; i++){
        if(i>0 && i%6===0){
          setColumnJSXList((prev)=>[...prev, newColumnJSXList])
          newColumnJSXList = []
        }
        const date = new Date(columnDataList[i].created_at)
        const formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`;
        newColumnJSXList.push(
          <div className={styles.columnListContent}>
            <div className={styles.columnNumber}>{i+1}</div>
            <div className={styles.columnTitle}>{columnDataList[i].title}</div>
            <div className={styles.columnCreatedAt}>{formatDate}</div>
            <div className={styles.columnPrefer}>{columnDataList[i].prefer}</div>
          </div>
        )
      }
      setColumnJSXList((prev)=>[...prev, newColumnJSXList])
    }).catch((err)=>{
      console.log(err)
    })
  },[])

  // JSX 반환
  return(
    <div>
      <Topbar current="short"/>
      <div className={styles.background}>
        <div className={styles.seriesTitle}>{seriesData.title}</div>
        <div className={styles.seriesContent}>{seriesData.content}</div>
        <div className={styles.seriesColumnListBox}>
          <div className={styles.seriesColumnTool}>
            <button className={styles.sortButton}>최신순</button>
            <button className={styles.sortButton}>추천수</button>
          </div>
          <div className={styles.seriesColumnList}>
            <div className={styles.columnListHeader}>
              <div className={styles.columnNumber}>번호</div>
              <div className={styles.columnTitle}>제목</div>
              <div className={styles.columnCreatedAt}>작성일</div>
              <div className={styles.columnPrefer}>추천수</div>
            </div>
            {columnJSXList[0]}
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeriesColumnPage