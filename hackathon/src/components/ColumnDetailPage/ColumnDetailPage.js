import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from "./ColumnDetailPage.module.css";
import "../ColumnDetailPage/ReactQuillStyle.css"
import { useLocation } from "react-router";
import axios from 'axios';

const ColumnDetailPage = ()=>{
  const [columnData, setColumnData] = useState({});
  const [date, setDate] = useState()
  const [writer, setWriter] = useState()
  const [cookie] = useCookies(['access_token', 'user_uuid'])
  const {state} = useLocation();
  useEffect(()=>{
    const columnId = state?state:'903a17da-cb7a-4395-803b-8108c6ae52f4';
    console.log(columnId)
    axios.get(`http://127.0.0.1:8000/column/${columnId}/`)
    .then((res)=>{
      const date = new Date(res.data.column.created_at)
      const formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
      setDate(()=>formatDate)
      setColumnData(()=>res.data.column)
      setWriter(()=>res.data.writer)
    })
  }, [state])
  return(
    <div className={styles.background}>
      <div className={styles.columnHeader}>
        <span className={styles.columnTItle}>{columnData.title}</span>
        <span className={styles.columnInfoContainer}>
          <span className={styles.columnInfo}>{writer}</span>
          <span className={styles.columnInfo}>{date}</span>
        </span>
          <div className={styles.editButtonBox}>
            {columnData.price>0 && <button className={styles.editButton}>{columnData.price}원</button>}
            {cookie.user_uuid!==columnData.user && <button className={styles.editButton}>수정하기</button>}
          </div>
      </div>
      <div
        dangerouslySetInnerHTML={{__html:columnData.content}}
        className="ql-editor"
      />
    </div>
  )
}

export default ColumnDetailPage;