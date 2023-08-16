/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import styles from "./CategoryModal.module.css";
import images from "../../assets/images/images";

const categoryNameList = [
  "tag1",
  "tag2",
  "tag3",
  "tag4",
  "tag5"
]

// props로 모달창 관리 state(boolean)의 setter를 넘겨준다. :
// 예시 : <CategoryModal setModalActive={모달창 관리 state의 setter}/>

const CategoryModal = ({setModalActive, setCategory, categoryNameList})=>{
  const [addedCategory, setAddedCategory] = useState([])
  const [addedCategoryJSX, setAddedCategoryJSX] = useState([])
  const [notAddedCategoryJSX, setNotaddedCategoryJSX] = useState([])
  const [input, setInput] = useState("")

  const categoryBoxHandler = async (e) => {
    let newAddedCategory = [];
    await (() => {
      const content = e.target.innerText;
      if (addedCategory.includes(content)) {
        newAddedCategory = addedCategory.filter((data) => {
          return data !== content;
        });
        setAddedCategory(() => newAddedCategory);
      } else {
        setAddedCategory((prev) => [...prev, content]);
        newAddedCategory = addedCategory;
        newAddedCategory.push(content);
      }
    })();
  };

  const inputBoxHandler = (e) => {
    const inputBoxContent = e.target.value;
    console.log(inputBoxContent);
    setInput(() => inputBoxContent);
  };

  const modalActiveHandler = (e) => {
    console.log(addedCategory)
    setCategory(()=>{
      const resultCategoryList = []
      for(let i=0; i<categoryNameList.length; i++){
        if(addedCategory.includes(categoryNameList[i])){
          resultCategoryList.push(i)
        }
      }
      return resultCategoryList
    })
    setModalActive((prev) => !prev)
  }

  useEffect(() => {
    const newAddedCategoryJSX = [];
    const newNotAddedCategoryJSX = [];
    for(let i=0; i<categoryNameList.length; i++){
      const categoryName = categoryNameList[i]
      if(addedCategory.includes(categoryName)){
        newAddedCategoryJSX.push(<div className={styles.categoryAdded} onClick={categoryBoxHandler} key={i}>{categoryName}</div>)
      }else if(categoryName.includes(input)){
        newNotAddedCategoryJSX.push(<div className={styles.categoryNotAdded} onClick={categoryBoxHandler} key={i}>{categoryName}</div>)
      }
    }
    setAddedCategoryJSX(() => newAddedCategoryJSX);
    setNotaddedCategoryJSX(() => newNotAddedCategoryJSX);
  }, [addedCategory, input]);

  return (
    <div className={styles.background}>
      <div className={styles.modalContainer}>
        <img
          src={images.cancel}
          alt="cancel"
          className={styles.cancelImage}
          onClick={modalActiveHandler}
        />
        <span className={styles.modalTitle}>카테고리 추가 / 삭제</span>
        <input
          type="text"
          placeholder="# 추가할 태그 이름 입력하기"
          className={styles.inputBox}
          onChange={inputBoxHandler}
        />
        <div className={styles.categoryEditBox}>
          <div className={styles.categoryBoxAdded}>
            <div className={styles.categoryBoxTitle}>
              # 추가할 태그를 클릭하세요
            </div>
            <div className={styles.categoryBoxContent}>{addedCategoryJSX}</div>
          </div>
          <div className={styles.categoryBoxNotAdded}>
            <div className={styles.categoryBoxTitle}>
              # 제거할 태그를 클릭하세요
            </div>
            <div className={styles.categoryBoxContent}>
              {notAddedCategoryJSX}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
