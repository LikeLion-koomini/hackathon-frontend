/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useRef, useState } from 'react';
import Topbar from '../Topbar/Topbar';
import CategoryModal from '../CategoryModal/CategoryModal';
import styles from './ColumnListPage.module.css';
import Column from './Column.js';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { useCookies } from 'react-cookie';
import { BASE_URL } from '../../utils/config';

const categoryNameList = [
  "tag1",
  "tag2",
  "tag3",
  "tag4",
  "tag5"
]

const ColumnListPage = ()=>{
  const [allColumnData, setAllColumnData] = useState([])
  const [columnList, setColumnList] = useState([])
  const [columnJSXList, setColumnJSXList] = useState([])
  const [paginationJSX, setPaginationJSX] = useState([])
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(10)
  const {state} = useLocation()
  const [categoryJsxList, setCategoryJsxList] = useState([]);
  const [category, setCategory] = useState([])
  const [categoryModalActive, setCategoryModalActive] = useState(false)
  const searchRef = useRef()
  const navigate = useNavigate()
  const [cookie] = useCookies(["access_token"])
  const categoryModalHandler = ()=>{
    setCategoryModalActive((prev)=>!prev)
    console.log(category)
  }
  // 카테고리 목록 추가
  useEffect(()=>{
    console.log(category)
    console.log(state)
    console.log(typeof(state))
    setCategoryJsxList((prev)=>{
      return [
        <button
          className={styles.categoryManager}
          key={0}
          onClick={categoryModalHandler}
        >
          카테고리 추가 / 삭제
        </button>,
      ];
    });
    let key = 0;
    for(let i=0; i<category.length; i++){
      // eslint-disable-next-line no-loop-func
      setCategoryJsxList((prev)=>{
        return [...prev,<div className={styles.category} key={++key}>{categoryNameList[i]}</div>]
      })
    }
  }, [category]);
  // const listset = [1]
  useEffect(()=>{
    axios.get(`${BASE_URL}/column/`)
    .then((res)=>{
      setAllColumnData(()=>res.data)
    }).catch((err)=>{
      console.error(err)
    })
  },[])
  useEffect(()=>{
    const newColumnData = [];
    const columnPerPage = 10;
    for(let i=0; i<allColumnData.length; i++){
      let currentPage = Math.floor(i/columnPerPage)
      setMaxPage(()=>Math.ceil(allColumnData.length/columnPerPage))
      if(!newColumnData[currentPage]){
        newColumnData[currentPage] = []
      }
      newColumnData[currentPage].push(allColumnData[i])
    }
    setColumnList(()=>newColumnData)
  }, [allColumnData])

  const renderCategory = () => {
    return(
      <button
        className={styles.categoryManager}
        key={0}
        onClick={categoryModalHandler}
      >
        카테고리 추가 / 삭제
      </button>
    )
  }
  const renderCategoryJSXList = ()=>{
    let key = 0;
    for(let i=0; i<category.length; i++){
      setCategoryJsxList((prev)=>
        [...prev,<div className={styles.category} key={++key}>{categoryNameList[i]}</div>]
      )
    }
  }
  useEffect(()=>{
    setCategoryJsxList(()=>renderCategory()
    );
    renderCategoryJSXList()
  }, [category]);
  const searchHandler = ()=>{
    axios.get('http://127.0.0.1:8000/column/search/',{
      params:{
        title:searchRef.current.value,
        category:category.join(),
      },
    }).then((res)=>{
      console.log(res.data)
      setAllColumnData(()=>res.data)
    }).catch((err)=>{
      console.error(err)
    })
  }

  const pageHandler = (e)=>{
    const pageNumber = Number(e.target.innerText)-1
    setPage(()=>pageNumber)
  }
  const nextPageHandler = (e)=>{
    const pageNumber = page+1<=maxPage ? page+1:page
    setPage(()=>pageNumber)
  }
  const prevPageHandler = (e)=>{
    const pageNumber = page-1>=0?page-1:page
    setPage(()=>pageNumber)
  }
  useEffect(()=>{
    if(columnList[page]){
      //현재 페이지 시리즈 목록 재생성
      setColumnJSXList(()=>[])
      columnList[page].map((data)=>{
        setColumnJSXList((prev)=>[
          ...prev,
          <Column key={data.column_id} data={data}/>
        ])
      })
      // 페이지네이션 재생성
      const paginationStart = Math.floor(page/3)+1
      setPaginationJSX(()=>
        (
          <div className="flex flex-row w-full justify-center gap-4">
            <div className={styles.paginationMover} onClick={prevPageHandler}>&lt;</div>
            {paginationStart<=maxPage && <div className={paginationStart-1===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart}</div>}
            {paginationStart+1<=maxPage && <div className={paginationStart===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart+1}</div>}
            {paginationStart+2<=maxPage && <div className={paginationStart+1===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart+2}</div>}
            <div className={styles.paginationMover} onClick={nextPageHandler}>&gt;</div>
          </div>
        )
      )
    }
  }, [columnList,page,state])
  const columnCreateHandler = (e)=>{
    window.location.reload()
    navigate("/column/create")
  }
  return(
    <div>
      {
        categoryModalActive && 
        <CategoryModal setModalActive={setCategoryModalActive} setCategory={setCategory} categoryNameList={categoryNameList}/>
      }
      <Topbar current={state}/>
      <div className={styles.background}>
        <div style={{display:"flex",alignItems:"center"}}>
          <input type='text' className={styles.searchBox} placeholder='칼럼 이름을 입력하세요' ref={searchRef}/>
          <button onClick={searchHandler} className={styles.searchButton}>검색</button>
        </div>
        <div className={styles.column_tags}>
          <div className={styles.categoryList}>{categoryJsxList}</div>
        </div>
        <div className={styles.columnBoxContainer} style={{marginTop:"2rem"}}>
          {columnJSXList}
        </div>
        <div className={styles.footer} style={{marginTop:"2rem"}}>
          {paginationJSX}
          {cookie.access_token && <button className={styles.columnCreateButton} onClick={columnCreateHandler}>칼럼 작성하기</button>}
        </div>
      </div>
    </div>
  )
}

export default ColumnListPage;