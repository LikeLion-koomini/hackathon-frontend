import React, { useState, useEffect } from 'react';
import { useCookies } from 'react-cookie';
import styles from "./ColumnDetailPage.module.css";
import Topbar from '../Topbar/Topbar';
import "../ColumnDetailPage/ReactQuillStyle.css"
import { useLocation } from "react-router";
import axios from 'axios';
import { BASE_URL } from '../../utils/config';

const ColumnDetailPage = ()=>{
  const [columnData, setColumnData] = useState({});
  const [date, setDate] = useState()
  const [writer, setWriter] = useState()
  const [cookie] = useCookies(['access_token', 'user_uuid'])
  const [purchase, setPurchase] = useState(true)
  const {state} = useLocation();

  useEffect(()=>{
    const columnId = state?state:'903a17da-cb7a-4395-803b-8108c6ae52f4';
    console.log(columnId)
    axios.get(`${BASE_URL}/column/${columnId}/`)
    .then((res)=>{
      const date = new Date(res.data.column.created_at)
      const formatDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDay()}`
      setDate(()=>formatDate)
      setColumnData(()=>res.data.column)
      setWriter(()=>res.data.writer)
      console.log(res.data.column)
      console.log(cookie.user_uuid + "\n" + columnData.user)
    })
  }, [])
  useEffect(()=>{
    axios.get(`${BASE_URL}/column/isPurchase/`,{
      params:{column_id:state}
    },{
      headers:{ Authorization: `Bearer ${cookie.access_token}` },
    }).then((res)=>{
      console.log(res)
      if(columnData.price<=0){
        setPurchase(()=>true)
      }else{
        setPurchase(()=>res.data.purchase)
      }
    })
  }, [state])
  const preferHandler = (e)=>{
    axios.patch(`${BASE_URL}/column/${columnData.column_id}/likes/`,{},{
      headers:{ Authorization: `Bearer ${cookie.access_token}` },
    }).then((res)=>{
      console.log(res)
    }).catch((err)=>{
      console.error(err)
    })
  }
  const purchaseHandler = (e)=>{
    axios.patch(`${BASE_URL}/column/purchase/`,{
      column_id:columnData.column_id
    },{
    headers:{ Authorization: `Bearer ${cookie.access_token}` },
    }).then((res)=>{
      console.log(res)
      if(res.data.success===true){
        setPurchase(()=>true)
      }else if(res.data.success===false){
        alert("보유 금액이 충분하지 않습니다.")
      }
    }).catch((err)=>{

    })
  }
  return(
    <div>
      <Topbar current="normal"/>
      <div className={styles.background}>
        <div className={styles.columnHeader}>
          <span className={styles.columnTItle}>{columnData.title}</span>
          <span className={styles.columnInfoContainer}>
            <span className={styles.columnInfo}>{writer}</span>
            <span className={styles.columnInfo}>{date}</span>
          </span>
            <div className={styles.editButtonBox}>
              {!purchase && columnData.price>0 && <button className={styles.editButton} onClick={purchaseHandler}>{columnData.price}원</button>}
              {cookie.user_uuid===columnData.user && <button className={styles.editButton}>수정하기</button>}
              {cookie.isLogin==="true" && cookie.user_uuid!==columnData.user && <button onClick={preferHandler} className={styles.editButton}>추천</button>}
            </div>
        </div>
        <div
          dangerouslySetInnerHTML={{__html:columnData.content}}
          className="ql-editor"
          style={purchase?{}:{filter:"blur(5px)"}}
        />
      </div>
    </div>
  )
}

export default ColumnDetailPage;