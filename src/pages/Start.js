import React, { useState } from "react";
import "./Start.css";
import { useNavigate } from "react-router-dom";
import logo from "../assets/kionuri_logo.svg";
import KioskScreen from "./KioskScreen";

function Start() {
  const navigate = useNavigate();

  // KioskScreen을 보여줄지 여부
  const [showKiosk, setShowKiosk] = useState(false);

  // 안내 팝업 모드 (arrow / quiz / null)
  const [guideMode, setGuideMode] = useState(null);

  // ⭐ Kiosk 화면으로 열기
  const openKiosk = (mode) => {
    setGuideMode(mode);
    setShowKiosk(true);
  };

  // ⭐ Kiosk 화면 닫기
  const closeKiosk = () => {
    setShowKiosk(false);
    setGuideMode(null);
  };

  // 버튼 핸들러
  const handleLearnClick = () => openKiosk("arrow");
  const handlePracticeClick = () => openKiosk(null);
  const handleQuizClick = () => openKiosk("quiz");

  // ⭐ showKiosk면 바로 KioskScreen 렌더
  if (showKiosk) {
    return <KioskScreen guideMode={guideMode} closeKiosk={closeKiosk} />;
  }

  return (
    <div className="app-container">
      <div className="content-box">
        <div className="logo-section">
          <img src={logo} alt="키오누리 로고" className="logo" />
        </div>

        <div className="button-group">
          <button className="main-button" onClick={handleLearnClick}>
            알아보기
          </button>

          <button className="main-button" onClick={handlePracticeClick}>
            연습하기
          </button>

          <button className="main-button" onClick={handleQuizClick}>
            퀴즈풀기
          </button>

          <button className="main-button" onClick={() => navigate("/faq")}>
            문의하기
          </button>
        </div>
      </div>

      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ 뒤로
      </button>
    </div>
  );
}

export default Start;
