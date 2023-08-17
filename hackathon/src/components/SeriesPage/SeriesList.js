import React ,{useState, useEffect} from "react";
import styles from './SeriesList.module.css';
import { useNavigate } from "react-router-dom";
import Series from "./Series";
import axios from 'axios'

const SeriesList = () => {

  const [series,setSeries] = useState([])
  const [currentPageSeriesList, setCurrentPageSeriesList] = useState([])
  const [paginationJSX, setPaginationJSX] = useState([])
  const [page, setPage] = useState(0)
  const [maxPage, setMaxPage] = useState(10)

  // navigate
  const navigate = useNavigate();
  const createSeriestHandler = () => {
    navigate('/seriesList/create');
  };

  //series 정보 받아오기 : 서버에서 객체를 리스트로 받아온다음 map함수로 리스트안의 객체를 분배
  useEffect(()=> {
    axios.get('http://127.0.0.1:8000/series/').then(response => {
      console.log(response)
      const allSeriesData = response.data
      const newSeriesData = [];
      const seriesPerPage = 6;
      for(let i=0; i<allSeriesData.length; i++){
        let currentPage = Math.floor(i/seriesPerPage)
        setMaxPage(()=>{
          return Math.ceil(allSeriesData.length/seriesPerPage)
        })
        if(!newSeriesData[currentPage]){
          newSeriesData[currentPage] = []
        }
        newSeriesData[currentPage].push(allSeriesData[i])
      }
      console.log(newSeriesData)
      setSeries(()=>newSeriesData)
    }).catch((error) => {
      console.log(error);
    })
  }, []);

  const pageHandler = (e)=>{
    const pageNumber = Number(e.target.innerText)-1
    setPage(()=>pageNumber)
  }

  useEffect(()=>{
    if(!series[page]){
      return;
    }
    //현재 페이지 시리즈 목록 재생성
    setCurrentPageSeriesList(()=>[])
    series[page].map((data)=>{
      setCurrentPageSeriesList((prev)=>[
        ...prev,
         <Series series={data} key={data.series_id}/>
      ])
    })
    // 페이지네이션 재생성
    const paginationStart = Math.floor(page/3)+1
    setPaginationJSX(()=>{
      return(
        <div className="flex flex-row w-full justify-center gap-4">
          <div className={styles.paginationMover}>&lt;</div>
          {paginationStart<=maxPage && <div className={paginationStart-1===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart}</div>}
          {paginationStart+1<=maxPage && <div className={paginationStart===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart+1}</div>}
          {paginationStart+2<=maxPage && <div className={paginationStart+1===page?styles.currentpage:styles.paginationIndex} onClick={pageHandler}>{paginationStart+2}</div>}
          <div className={styles.paginationMover}>&gt;</div>
        </div>
      )
    })
  }, [series,page])

  return (
    <div className={styles.series_container}>
      <div className={styles.series_search}>
        <input type="search" />
      </div>
      <div className={styles.series_tags}>
        tags, tags, tags
      </div>
      <div className={styles.series_box}>
        {currentPageSeriesList}
      </div>
      <div className={styles.series_footer}>
        <div className={styles.footer_button} style={{visibility:'hidden'}}>
          <button>시리즈 생성</button>
        </div>
        <div>{paginationJSX}</div>
        <div className={styles.footer_button}>
          <button onClick={createSeriestHandler}>시리즈 생성</button>
        </div>
      </div>
    </div>
  )
};

export default SeriesList;