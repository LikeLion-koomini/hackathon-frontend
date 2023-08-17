import React, { useEffect, useState } from 'react';
import styles from '../SeriesColumnPage/SeriesColumnPage.module.css'
import Topbar from '../Topbar/Topbar';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';

const SeriesColumnPage = ()=>{
  const [seriesData, setSeriesData] = useState({})
  const [columnJSXList, setColumnJSXList] = useState([])
  const [paginationJSX, setPaginationJSX] = useState([])
  const [columnList, setColumnList] = useState([])
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(0)
  const [cookie]= useCookies(["user_uuid"])
  const navigate = useNavigate()
  const {state} = useLocation()
  // 시리즈 정보 받아옴
  useEffect(() => {
    const series_id = state?state:'59480e71-cddd-46dc-a76e-bd50cbf1301e';
    // 시리즈 정보 받아옴.
    axios.get(`http://127.0.0.1:8000/series/${series_id}/`)
      .then((res) => {
        console.log(res.data)
        const seriesData = res.data;
        setSeriesData(seriesData);
      })
      .catch((err) => {
        console.log(err);
      });
    // 시리즈 관련 칼럼 정보 받아옴
    axios.get(`http://127.0.0.1:8000/series/${series_id}/column/`)
      .then((res) => {
        const columnDataList = res.data;
        const maxPage = Math.ceil(columnDataList.length / 6);
        setMaxPage(maxPage);
        // 칼럼 정보를 저장할 배열
        const newColumnList = [];
        // 칼럼 정보 받아오기
        for (let i = 0; i < columnDataList.length; i++) {
          // 날짜 양식 변경
          const date = new Date(columnDataList[i].created_at);
          const formatDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          // 칼럼 정보 추가
          const currentPage = Math.floor(i / 6);
          if (!newColumnList[currentPage]) {
            newColumnList[currentPage] = [];
          }
          newColumnList[currentPage].push({
            number: i + 1,
            column_id : columnDataList[i].column_id,
            title: columnDataList[i].title,
            date: formatDate,
            prefer: columnDataList[i].prefer,
          });
        }
        // 최종 칼럼 정보를 설정
        setColumnList(()=>newColumnList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columnDetailHandler = (e)=>{
    const column_id = e.target.id;
    navigate("/column/detail/", {state:column_id})
  }
  const pageHandler = (e)=>{
    const pageNumber = Number(e.target.innerText)
    setPage(()=>pageNumber)
  }
  useEffect(()=>{
    // 새로운 칼럼 목록 불러오기
    setColumnJSXList(()=>[])
    if(!columnList[page]){
      return;
    }
    for(let i=0; i<columnList[page].length; i++){
      const column = columnList[page][i]
      setColumnJSXList((prev)=>[
        ...prev,
        <div className={styles.columnListContent} key={column.column_id} id={column.column_id} onClick={columnDetailHandler}>
          <div className={styles.columnNumber} id={column.column_id}>{column.number}</div>
          <div className={styles.columnTitle} id={column.column_id}>{column.title}</div>
          <div className={styles.columnCreatedAt} id={column.column_id}>{column.createdAt}</div>
          <div className={styles.columnPrefer} id={column.column_id}>{column.prefer}</div>
        </div>
      ])
    }
    // 페이지네이션 재생성
    const paginationStart = Math.floor(page/3)
    setPaginationJSX(()=>{
      return(
        <div className="flex flex-row w-full justify-center gap-4">
          <div className={styles.paginationMover}>&lt;</div>
          <div className={paginationStart===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart}</div>
          <div className={paginationStart+1===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart+1}</div>
          <div className={paginationStart+2===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart+2}</div>
          <div className={styles.paginationMover}>&gt;</div>
        </div>
      )
    })

  }, [columnList, page])
  // 칼럼 생성 핸들러
  const createColumnHandler = (e)=>{
    navigate('/column/create', {state:seriesData.series_id})
  }

  return(
    <div style={{display:"flex",flexDirection:"column",alignItems:"center",}}>
      <div className="flex h-fit fixed w-full z-50">
        <Topbar current="series"/>
      </div>
      <div className={styles.background} style={{marginTop:100}}>
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
            {columnJSXList}
            <div className={styles.paginationAndCreateColumn}>
              {paginationJSX}
              {seriesData.writer===cookie.user_uuid && 
                <button className={styles.createColumnButton} onClick = {createColumnHandler}>
                  칼럼 작성하기
                </button>
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SeriesColumnPage