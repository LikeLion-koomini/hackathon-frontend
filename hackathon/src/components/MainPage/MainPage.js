import React from "react";
import styles from './MainPage.module.css';
import images from '../../assets/images/images';
import { useNavigate } from "react-router-dom";

const MainPage = () => {

  // navigate
  const navigate = useNavigate();

  const shortshortHandler = () => {
    navigate('#');
  };

  const shortHandler = () => {
    navigate('#');
  };

  const longHandler = () => {
    navigate('#');
  };

  return (
    <div className={styles.main_container}>
      <div className={styles.main_input}>
        <input type="search" />
      </div>
      <div className={styles.main_img}>
        <img src="" alt="" />
      </div>
      <div className={styles.main_section1}>
        <div className={styles.section1}>
          <div>
            <img src={images.mainPageImg1} alt="" />
          </div>
          <div className={styles.main_section1_context}>
            <h1>다양한 칼럼 제공</h1>
            <p>숏 칼럼부터 장편 칼럼까지!<br/>원하는 칼럼을 찾아보세요</p>
          </div>
        </div>
        <div className={styles.section1}>
          <div>
            <img src={images.mainPageImg2} alt="" />
          </div>
          <div className={styles.main_section1_context}>
            <h1>나만의 칼럼 제공</h1>
            <p>나만의 금융 칼럼으로<br/>수익을 얻어보세요!</p>
          </div>
        </div>
        <div className={styles.section1}>
          <div>
            <img src={images.mainPageImg3} alt="" />
          </div>
          <div className={styles.main_section1_context}>
            <h1>다양한 카테고리 제공</h1>
            <p>다양한 카테고리를 통해서<br/>검색기능을 제공합니다.</p>
          </div>
        </div>
      </div>
      <div className={styles.main_title}>
        <h1>다양한 카테고리의 금융 칼럼 제공</h1>
        <p>저희 서비스에서 제공하는 다양한 기능들로 <br />필요한 정보를 빠르게 확인해보세요</p>
      </div>
      <div className={styles.main_section2}>
        <div className={styles.main_section2_box}>
          <div>
            <img src={images.mainPageImg4} alt="" />
          </div>
          <h1>숏 칼럼</h1>
          <p>짧지만 알찬 정보가 있는<br />간단한 칼럼</p>
        </div>
        <div className={styles.main_section2_box}>
          <div>
            <img src={images.mainPageImg5} alt="" />
          </div>
          <h1>단편 칼럼</h1>
          <p>보다 자세한 정보가 있는<br />유익하고 알찬 칼럼</p>
        </div>
        <div className={styles.main_section2_box}>
          <div>
            <img src={images.mainPageImg6} alt="" />
          </div>
          <h1>장편 칼럼</h1>
          <p>특정 주제에 대해서<br />장기적으로 연재되는 칼럼</p>
        </div>
      </div>
      <div className={styles.main_footer}>
        <div className={styles.main_footer_img}>
          <img src="" alt="" />
        </div>
        <div className={styles.main_footer_context}>
          <div className={styles.footer_context1}>
            <h1>나만의 칼럼 작성하기</h1>
            <p>내가 알고 있는 유용한 금융 지식! <br />칼럼으로 작성해서 수익을 만들어보세요</p>
          </div>
          <div className={styles.footer_context1}>
            <h2>칼럼 작성하러 가기</h2>
            <div className={styles.footer_context2}>
              <div onClick={shortshortHandler} className={styles.context2}>
                <div>
                  <img src={images.mainPageImg7} alt="" />
                </div>
                <div className={styles.context3}>
                  <h3>숏 칼럼 작성하기</h3>
                </div>
              </div>
              <div onClick={shortHandler} className={styles.context2}>
                <div>
                  <img src={images.mainPageImg8} alt="" />
                </div>
                <div className={styles.context3}>
                  <h3>단편 칼럼 작성하기</h3>
                </div>
              </div>
              <div onClick={longHandler} className={styles.context2}>
                <div>
                  <img src={images.mainPageImg9} alt="" />
                </div>
                <div className={styles.context3}>
                  <h3>장편 칼럼 작성하기</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;