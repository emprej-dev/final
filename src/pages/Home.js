//Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import logo from "../assets/kionuri_logo.svg";
import {Link} from "react-router-dom";

function Home() {
  const navigate = useNavigate(); // 페이지 이동용 훅

  return (
    <div className="app-container">
      <div className="content-box">
        <div className="logo-section">
          <img src={logo} alt="키오누리 로고" className="logo" />
        </div>

        <div className="button-group">

          {/* 여기 추가됨 */}
          <button
            className="main-button"
            onClick={() => navigate("/about")}
          >
            서비스 소개
          </button>

          <button
            className="main-button"
            onClick={() => navigate("/start")}
          >
            시작하기
          </button>
        </div>

      </div>
    </div>
  );
}


export default Home;


//고칠 부분 많음 - 원본은 메모장에 저장함, home.js1로 저장함
