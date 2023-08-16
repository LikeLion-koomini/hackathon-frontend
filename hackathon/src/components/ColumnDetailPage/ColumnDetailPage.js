import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from "./ColumnDetailPage.module.css";
import "../ColumnDetailPage/ReactQuillStyle.css"
import axios from 'axios';

const ColumnDetailPage = ()=>{
  const [editButtonVisible, setEditButtonVisible] = useState(true)
  const [purchaseButtonVisible, setPurchaseButtonVisible] = useState(true)
  const [columnData, setColumnData] = useState({});
  const [writer, setWriter] = useState()
  const [cookie] = useCookies(['access_token', 'user_uuid'])

  useEffect(()=>{
    const columnId = '8fb6072f-a9fb-47a4-95ea-344857e71d05'
    //cbc692a1-658a-423a-a628-2b08bcb5859e
    axios.get(`http://127.0.0.1:8000/column/${columnId}/`)
    .then((res)=>{
      setColumnData(()=>res.data.column)
      setWriter(()=>res.data.writer)
    })
  }, [])
  return(
    <div className={styles.background}>
      <div className={styles.columnHeader}>
        <span className={styles.columnTItle}>{columnData.title}</span>
        <span className={styles.columnInfoContainer}>
          <span className={styles.columnInfo}>{writer}</span>
          <span className={styles.columnInfo}>{columnData.created_at}</span>
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