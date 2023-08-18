import React from "react";
import styles from './MainPage.module.css';
import images from '../../assets/images/images';
import Topbar from '../Topbar/Topbar';
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
    <div>
      <div className="flex h-fit fixed bg-white w-full z-50">
      <Topbar current="main"/>
      </div>
      <div className={"flex w-full flex-col justify-center items-center"}>
        <div className={"flex mt-28 w-full bg-slate-300 h-96"}>
          <img src={images.mainBanner} alt="메인 배너" />
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
      </div>
    </div>
  );
};

export default MainPage;