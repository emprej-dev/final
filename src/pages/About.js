// // About.js
// import React from "react";
// import { useNavigate } from "react-router-dom";
// import "./About.css";

// function About() {
//   const navigate = useNavigate();

//   return (
//     <div className="about-wrapper">

//       {/* 상단 배너 */}
//       <div className="about-banner">
//         <h1>서비스 소개</h1>
//       </div>

//       {/* 부분스크롤 적용 영역 */}
//       <div className="about-scroll-area">
//         <div className="about-content">
//           <h2>어떤 서비스인가요?</h2>
//           <p>
//             “키오스크(무인 단말기), 사용하기에 복잡해요." <br/>
//             "어떻게 써야 할지 모르겠어요…” <br/>
//             "주문할 때 시간이 오래 걸려서, 뒷 사람에게 눈치 보여요." <br/>
//             어느 식당이나 카페에 가도 있는 키오스크를 마주하며 <br/>
//             혹시 한 번이라도 이런 어려움을 겪으신 적이 있나요? <br/>
//             그렇다면, 이제 걱정하지 마세요! <br/>
//             키오누리는 키오스크가 어려운 분들을 위해 <br/>
//             처음부터, 천천히, 친절하게 알려드립니다. <br/>
//             보고 따라하고, 손으로 직접 다뤄보며 익히는 친절하고 똑똑한 연습 공간! <br/>
//             지금, 키오누리를 통해 키오스크와 조금 더 가까워져 보세요. <br/>
//           </p>

//           <h2>도움말 및 세부 안내사항</h2>
//           <p>
//             <h4>홈 화면 </h4>
//             • 서비스 소개 : 지금 보고계신 이 화면이에요. 우리 서비스가 어떠한 서비스인지 소개하는 페이지랍니다. <br/>
//             <h4>학습 시작하기</h4>
//             • 알아보기: 카드형 정보로 키오스크를 학습할 수 있어요. <br />
//             • 연습하기: 실제와 거의 흡사한 키오스크 화면으로 조작 연습이 가능해요. <br />
//             • 퀴즈풀기: 간단한 퀴즈로 학습 내용을 점검해볼 수 있어요. <br />
//             • 문의하기: 모르는 부분이 있다면 해당 페이지의 FAQ 게시판을 참고해보세요. <br/>
//           </p>
//         </div>
//       </div>

//         <button className="back-btn" onClick={() => navigate(-1)}>
//           ⬅ 뒤로
//         </button>
//     </div>

//   );
// }

// export default About;

// About.js
import React from "react";
import { useNavigate } from "react-router-dom";
import "./About.css";

function About() {
  const navigate = useNavigate();

  return (
    <div className="page-container">

      {/* 뒤로가기 버튼 (페이지 최상위·왼쪽 상단 고정) */}
      <button className="back-btn" onClick={() => navigate(-1)}>
        ⬅ 뒤로
      </button>

      {/* 전체 About 레이아웃 */}
      <div className="about-wrapper">

        {/* 상단 배너 */}
        <div className="about-banner">
          <h1>서비스 소개</h1>
        </div>

        {/* 부분 스크롤 영역 */}
        <div className="about-scroll-area">
          <div className="about-content">

            <h2>어떤 서비스인가요?</h2>
            <p>
              “키오스크(무인 단말기), 사용하기에 복잡해요." <br/>
              "어떻게 써야 할지 모르겠어요…” <br/>
              "주문할 때 시간이 오래 걸려서, 뒷 사람에게 눈치 보여요." <br/>
              어느 식당이나 카페에 가도 있는 키오스크를 마주하며 <br/>
              혹시 한 번이라도 이런 어려움을 겪으신 적이 있나요? <br/>
              그렇다면, 이제 걱정하지 마세요! <br/>
              키오누리는 키오스크가 어려운 분들을 위해 <br/>
              처음부터, 천천히, 친절하게 알려드립니다. <br/>
              보고 따라하고, 손으로 직접 다뤄보며 익히는 친절하고 똑똑한 연습 공간! <br/>
              지금, 키오누리를 통해 키오스크와 조금 더 가까워져 보세요. <br/>
            </p>

            <h2>도움말 및 세부 안내사항</h2>
            <p>
              <h4>홈 화면</h4>
              • 서비스 소개 : 지금 보고계신 이 화면이에요. 우리 서비스가 어떠한 서비스인지 소개하는 페이지랍니다.<br/>
              <h4>학습 시작하기</h4>
              • 알아보기: 카드형 정보로 키오스크를 학습할 수 있어요. <br />
              • 연습하기: 실제와 거의 흡사한 키오스크 화면으로 조작 연습이 가능해요. <br />
              • 퀴즈풀기: 간단한 퀴즈로 학습 내용을 점검해볼 수 있어요. <br />
              • 문의하기: 모르는 부분이 있다면 해당 페이지의 FAQ 게시판을 참고해보세요. <br/>
            </p>

          </div>
        </div>

      </div>
    </div>
  );
}

export default About;
