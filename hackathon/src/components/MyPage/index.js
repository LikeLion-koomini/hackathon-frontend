import React from "react";
import Topbar from "../Topbar/Topbar";

const ProfileContainer = ({ username, phoneNumber, dob, email, money }) => {
  return (
    <div
      className="mt-24 ml-12 rounded-lg w-96 h-full shadow-md grow-0 flex flex-col justify-center items-center"
      style={{ paddingTop: 20, paddingBottom: 20 }}
    >
      <div
        style={{
          width: 247,
          height: 274,
          display: "flex",
          justifyContent: "center",
          backgroundColor: "#E1F1FA",
          borderRadius: 16,
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: 20,
          width: 247,
        }}
      >
        <p style={{ marginTop: 37 }}>이름 : {username}</p>
        <p>전화번호 : {phoneNumber}</p>
        <p>생년월일 : {dob}</p>
        <p>이메일 : {email}</p>
        <p>현재 보유 금액 : {money}원</p>
      </div>
    </div>
  );
};
const CustomRow = ({ number, title, date, views }) => {
  return (
    <div className="flex-grow-1 border-[#DFDFDF] text-[#767676] border-solid border-b flex items-center h-[50px]">
      <p className="w-[100px] leading-[25px] text-xl uppercase">{number}</p>
      <p className="w-[400px] leading-[25px] text-xl uppercase">{title}</p>
      <p className="w-[150px] leading-[25px] ml-[49px] text-xl uppercase">
        {date}
      </p>
      <p className="w-[150px] leading-[25px] ml-[49px] text-xl uppercase">
        {views}
      </p>
    </div>
  );
};

const ColumnContainer = () => {
  return (
    <>
      <div style={{ display: "flex", marginTop: 70 }}>
        <div
          className={`w-[922px] h-[628px] pb-[79px] font-[700] relative flex justify-center`}
        >
          <div className="gap-[0] flex flex-col items-end h-full w-full text-center">
            <div className="w-[177px] px-[17px] gap-2.5 flex justify-end items-center py-2.5">
              <div
                className="w-[63px] leading-[30px] text-xl text-black"
                style={{ cursor: "pointer" }}
                onClick={() => {}}
              >
                최신순
              </div>
              <div
                className="[flex-grow:1] leading-[30px] text-[#A1A1A1] w-[70px] text-xl"
                style={{ cursor: "pointer" }}
                onClick={() => {}}
              >
                추천순
              </div>
            </div>
            <div className="flex flex-col">
              <div
                className="border-[#818181] border-solid border-t border-b flex text-black justify-center items-center h-[50px]"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <p className="w-[100px] leading-[25px] text-xl uppercase">
                  번호
                </p>
                <p className=" w-[413px] leading-[25px] text-xl uppercase">
                  내가 쓴 칼럼
                </p>
                <p className="w-[150px] leading-[25px] text-xl uppercase ml-9">
                  작성일
                </p>
                <p className=" w-[150px] leading-[25px] ml-[49px] text-xl uppercase">
                  추천 수
                </p>
              </div>
            </div>
            <CustomRow
              number={1}
              title="누가 봐도 끌릴만한 금융 관련 칼럼 제목"
              date={"2023-08-08"}
              views={111}
            />
            <CustomRow
              number={2}
              title="누가 봐도 끌릴만한 금융 관련 칼럼 제목"
              date={"2023-08-08"}
              views={111}
            />
          </div>
        </div>
      </div>
    </>
  );
};
const MyPage = () => {
  return (
    <div className="flex flex-col ">
      <div className="flex h-fit fixed w-full z-50">
        <Topbar />
      </div>
      <div className="flex fixed" style={{ columnGap: 30 }}>
        <ProfileContainer
          username="Lyu"
          phoneNumber="010-0000-1234"
          dob="1999-09-21"
          email="root@r.com"
          money={500}
        />
        <div className="h-screen">
          <ColumnContainer />
        </div>
      </div>
    </div>
  );
};

export default MyPage;
