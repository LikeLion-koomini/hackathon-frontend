import React, {useRef, useState, useEffect, useMemo} from 'react';
import styles from "./ColumnCreatePage.module.css"
import CategoryModal from "../CategoryModal/CategoryModal"
import Topbar from '../Topbar/Topbar';
import ReactQuill from 'react-quill';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const categoryNameList = [
  "tag1",
  "tag2",
  "tag3",
  "tag4",
  "tag5"
]

const ColumnCreatePage = ()=>{
  // 기본 상태들
  const [categoryJsxList, setCategoryJsxList] = useState([]);
  const [category, setCategory] = useState([])
  const [content, setContent] = useState();
  const titleRef = useRef()
  const [categoryModalActive, setCategoryModalActive] = useState(false)
  const quillRef = useRef()
  const [price, setPrice] = useState(0)

  // cookies
  const [cookie] = useCookies(["access_token", "refresh_token", "user_uuid"])
  //navigateor
  const navigate = useNavigate()
  //location
  const {state} = useLocation()

  // 기본 설정
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
      setCategoryJsxList((prev)=>{
        return [...prev,<div className={styles.category} key={++key}>{categoryNameList[i]}</div>]
      })
    }
  }, [category]);

  const imageHandler = () => {
    const input = document.createElement("input");
    input.setAttribute("type", "file");
    input.setAttribute("accept", "image/*");
    input.click();

    input.addEventListener("change", async () => {
      if (input.files) {
        const file = input.files[0];
        try {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            const imgUrl = fileReader.result;
            console.log(typeof imgUrl);
            const editor = quillRef.current.getEditor();
            const range = editor.getSelection();
            editor.insertEmbed(range.index, "image", imgUrl);
            editor.setSelection(range.index + 1);
          };
          fileReader.readAsDataURL(file);
        } catch (error) {
          console.log(error);
        }
      }
    });
  };

  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          [{ header: "1" }, { header: "2" }],
          [{ size: [] }],
          ["bold", "italic", "underline"],
          [{ list: "ordered" }, { list: "bullet" }, { align: [] }],
          ["image"],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    []
  );

  const handleSubmitButton = (event)=>{
    const title = titleRef.current.value;
    const columnPrice = price>0?price:0;
    console.log(title, columnPrice)
    console.log(state)
    const submitAPI = state?
      `http://127.0.0.1:8000/series/${state}/column/create/`:
      'http://127.0.0.1:8000/column/register/'
    axios.post(
      submitAPI,
      {
        title:title,
        content:content,
        category:category
      },
      {
        headers:{ Authorization: `Bearer ${cookie.access_token}` },
      }
    ).then((res)=>{
      console.log(res)
      navigate('/')
    }).catch((err)=>{
      console.log(err)
    })
  }
  const handleQuillChange = (elements)=>{
    setContent(()=>elements)
  }
  const handlePriceRadio = (e)=>{
    if(e.target.value==="free" && price>=0){
      setPrice(() => -1)
    }else if(e.target.value==="pay" && price<0){
      setPrice(() => 0)
    }
  }
  return(
    <div style={{display:"flex", flexDirection:"column",alignItems:"center",}}>
      <div className="flex h-fit fixed w-full z-50">
        <Topbar current="normal"/>
      </div>
      {categoryModalActive && 
        <CategoryModal setModalActive={setCategoryModalActive} setCategory={setCategory} categoryNameList={categoryNameList}/>
      }
      <div className={styles.background} style={{marginTop:100,}}>
        <input type="text" className={styles.columnName} placeholder='칼럼 제목 입력하기'  ref={titleRef}/>
        <div className={styles.contentInputBox}>
          <span className={styles.inputBoxTitle}>칼럼 내용</span>
          <div>
            <ReactQuill
              onChange={handleQuillChange}
              modules={modules}
              ref={quillRef}
              theme="snow"
            />
          </div>
        </div>
        <div className={styles.contentInputBox}>
          <span className={styles.inputBoxTitle}>카테고리</span>
          <div className={styles.categoryList}>{categoryJsxList}</div>
        </div>
        <div className={styles.contentInputBox}>
          <span className={styles.inputBoxTitle}>가격</span>
          <div className={styles.priceCheckBoxContainer}>
            <div className={styles.priceCheckBox}>
              <div className={styles.checkBox}>
                <input type="radio" id="free" name="price" value="free" onClick={handlePriceRadio}/>
                <label htmlFor='free'>무료</label>
              </div>
            </div>
            <div className={styles.priceCheckBox}>
              <div className={styles.checkBox}>
                <input type="radio" name="price" id="free" value="pay" onClick={handlePriceRadio}/>
                <label htmlFor="pay">유료</label>
              </div>
              {
                price>=0 &&
                <div className={styles.priceBox}>
                  <label htmlFor="price">가격</label>
                  <input type="text" onChange={
                    (e)=>{setPrice(()=>e.target.value)}
                  }/>
                </div>
              }
            </div>
          </div>
        </div>
        <button className={styles.submitButton} onClick={handleSubmitButton}>
          발행하기
        </button>
      </div>
    </div>
  );
};

export default ColumnCreatePage;
