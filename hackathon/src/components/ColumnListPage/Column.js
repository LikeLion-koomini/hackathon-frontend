import React, { useEffect, useState } from 'react';
import styles from './Column.module.css';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const Column = ({data})=>{
  const [columnType, setColumnType] = useState("none")
  const {state} = useLocation()
  const navigate = useNavigate()
  useEffect(()=>{
    const type = state
    if(type==="normal"){
      setColumnType(()=>"단편 칼럼")
    }else if(type==="short"){
      setColumnType(()=>"3분 칼럼")
    }
  }, [state, data])

  const columnClickHandler = ()=>{
    navigate('detail/',{state:data.column_id})
  }

  return(
    <div className={styles.columnBox} onClick={columnClickHandler}>
      <div className={styles.columnHeader}>
        <div className={styles.columnInfoBox}>
          <span className={styles.columnMainText}>{columnType}</span>
          <span className={styles.columnSubText}>추천수 : {data.prefer}</span>
        </div>
      </div>
      <div className={styles.columnFooter}>
        <div className={styles.columnMainText}>{data.title}</div>
        <span className={styles.columnSubText}>작성자 : {data.userName}</span>
      </div>
    </div>
  )
}

export default Column