import React, {useRef, useState, useEffect, useMemo} from 'react';
import styles from "./ColumnCreatePage.module.css"
import CategoryModal from "../CategoryModal/CategoryModal"
import Topbar from '../Topbar/Topbar';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const categoryNameList = [
  "tag1",
  "tag2",
  "tag3",
  "long long tag",
  "very long tag",
  "so long tag",
]

const ColumnCreatePage = ()=>{
  const [categoryJsxList, setCategoryJsxList] = useState([]);
  const [content, setContent] = useState();
  const [categoryModalActive, setCategoryModalActive] = useState(false)
  const quillRef = useRef()

  // 기본 설정
  const categoryModalHandler = ()=>{
    setCategoryModalActive((prev)=>!prev)
  }
  useEffect(()=>{
    setCategoryJsxList((prev)=>{
      return [
        <button
          className={styles.categoryManager}
          key={0}
          onClick={categoryModalHandler}
        >
          카테고리 추가 / 삭제
        </button>
      ]
    })
    let key = 0;
    categoryNameList.forEach((item)=>{
      setCategoryJsxList((prev)=>{
        return [...prev,<div className={styles.category} key={++key}>{item}</div>]
      })
    })
  }, []);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.addEventListener('change', async () => {
      if(input.files){
        const file = input.files[0];
        try {
          const fileReader = new FileReader()
          fileReader.onload = (e) => {
            const imgUrl = fileReader.result;
            console.log(typeof(imgUrl))
            const editor = quillRef.current.getEditor(); 
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', imgUrl);
            editor.setSelection(range.index + 1);
          }
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
          [{ header: '1' }, { header: '2' }],
          [{ size: [] }],
          ['bold', 'italic', 'underline'],
          [{ list: 'ordered' }, { list: 'bullet' }, { align: [] }],
          ['image'],
        ],
        handlers: { image: imageHandler },
      },
      clipboard: {
        matchVisual: false,
      },
    }),
    [],
  );

  const handleSubmitButton = (event)=>{
    console.log(content)
  }
  const handleQuillChange = (elements)=>{
    setContent(()=>elements)
  }
  return(
    <div style={{display:"flex", flexDirection:"column",alignItems:"center",}}>
      <Topbar current="normal" isLogin={false}/>
      {categoryModalActive && 
        <CategoryModal setModalActive={setCategoryModalActive}/>
      }
      <div className={styles.background}>
        <input type="text" className={styles.columnName} placeholder='칼럼 제목 입력하기'/>
        <div className={styles.contentInputBox}>
          <span className={styles.inputBoxTitle}>
            칼럼 내용
          </span>
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
          <span className={styles.inputBoxTitle}>
            카테고리
          </span>
          <div className={styles.categoryList}>
            {categoryJsxList}
          </div>
        </div>
        <div className={styles.contentInputBox}>
          <span className={styles.inputBoxTitle}>
            가격
          </span>
          <div className={styles.priceCheckBoxContainer}>
            <div className={styles.priceCheckBox}>
              <div className={styles.checkBox}>
                <input type="radio" id="free" name="price" value="free" />
                <label htmlFor='free'>무료</label>
              </div>
            </div>
            <div className={styles.priceCheckBox}>
              <div className={styles.checkBox}>
                <input type="radio" name="price" id="free" value="pay" />
                <label htmlFor="pay">유료</label>
              </div>
              <div className={styles.priceBox}>
                <label htmlFor="price">가격</label>
                <input type="text"/>
              </div>
            </div>
          </div>
        </div>
        <button className={styles.submitButton} onClick={handleSubmitButton}>발행하기</button>
      </div>
    </div>
  )
}

export default ColumnCreatePage;