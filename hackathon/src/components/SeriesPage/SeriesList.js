import React from "react";
import styles from './SeriesList.module.css';
import { useNavigate } from "react-router-dom";

const SeriesList = () => {

  // navigate
  const navigate = useNavigate();
  const createSeriestHandler = () => {
    navigate('/seriesList/create');
  };

  return (
    <div className={styles.series_container}>
      <div className={styles.series_search}>
        <input type="search" />
      </div>
      <div className={styles.series_tags}>
        tags, tags, tags
      </div>
      <div className={styles.series_box}>
        <div className={styles.series}>
          <div className={styles.series_color}></div>
          <div className={styles.series_context_box}>
            <div className={styles.series_context}>
              <div className={styles.context1}>
                <h2>작성자 이름</h2>
                <h2 style={{fontWeight:'700'}}>무료</h2>
              </div>
              <h1>시리즈 제목</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur omnis alias exercitationem sit deleniti. Suscipit laudantium eius, doloremque unde optio inventore laborum quos, placeat sit atque, voluptas numquam accusantium consectetur?</p>
              <div className={styles.context2}>
                <h3>게시물 : 100개</h3>
                <h3>2023.08.08</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.series}>
          <div className={styles.series_color}></div>
          <div className={styles.series_context_box}>
            <div className={styles.series_context}>
              <div className={styles.context1}>
                <h2>작성자 이름</h2>
                <h2 style={{fontWeight:'700'}}>무료</h2>
              </div>
              <h1>시리즈 제목</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur omnis alias exercitationem sit deleniti. Suscipit laudantium eius, doloremque unde optio inventore laborum quos, placeat sit atque, voluptas numquam accusantium consectetur?</p>
              <div className={styles.context2}>
                <h3>게시물 : 100개</h3>
                <h3>2023.08.08</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.series}>
          <div className={styles.series_color}></div>
          <div className={styles.series_context_box}>
            <div className={styles.series_context}>
              <div className={styles.context1}>
                <h2>작성자 이름</h2>
                <h2 style={{fontWeight:'700'}}>무료</h2>
              </div>
              <h1>시리즈 제목</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur omnis alias exercitationem sit deleniti. Suscipit laudantium eius, doloremque unde optio inventore laborum quos, placeat sit atque, voluptas numquam accusantium consectetur?</p>
              <div className={styles.context2}>
                <h3>게시물 : 100개</h3>
                <h3>2023.08.08</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.series}>
          <div className={styles.series_color}></div>
          <div className={styles.series_context_box}>
            <div className={styles.series_context}>
              <div className={styles.context1}>
                <h2>작성자 이름</h2>
                <h2 style={{fontWeight:'700'}}>무료</h2>
              </div>
              <h1>시리즈 제목</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur omnis alias exercitationem sit deleniti. Suscipit laudantium eius, doloremque unde optio inventore laborum quos, placeat sit atque, voluptas numquam accusantium consectetur?</p>
              <div className={styles.context2}>
                <h3>게시물 : 100개</h3>
                <h3>2023.08.08</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.series}>
          <div className={styles.series_color}></div>
          <div className={styles.series_context_box}>
            <div className={styles.series_context}>
              <div className={styles.context1}>
                <h2>작성자 이름</h2>
                <h2 style={{fontWeight:'700'}}>무료</h2>
              </div>
              <h1>시리즈 제목</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur omnis alias exercitationem sit deleniti. Suscipit laudantium eius, doloremque unde optio inventore laborum quos, placeat sit atque, voluptas numquam accusantium consectetur?</p>
              <div className={styles.context2}>
                <h3>게시물 : 100개</h3>
                <h3>2023.08.08</h3>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.series}>
          <div className={styles.series_color}></div>
          <div className={styles.series_context_box}>
            <div className={styles.series_context}>
              <div className={styles.context1}>
                <h2>작성자 이름</h2>
                <h2 style={{fontWeight:'700'}}>무료</h2>
              </div>
              <h1>시리즈 제목</h1>
              <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Aspernatur omnis alias exercitationem sit deleniti. Suscipit laudantium eius, doloremque unde optio inventore laborum quos, placeat sit atque, voluptas numquam accusantium consectetur?</p>
              <div className={styles.context2}>
                <h3>게시물 : 100개</h3>
                <h3>2023.08.08</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.series_footer}>
        <div className={styles.footer_button} style={{visibility:'hidden'}}>
          <button>시리즈 생성</button>
        </div>
        <div>pagination</div>
        <div className={styles.footer_button}>
          <button onClick={createSeriestHandler}>시리즈 생성</button>
        </div>
      </div>
    </div>
  )
};

export default SeriesList;