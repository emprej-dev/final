import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Faq.css";

function Faq() {
  const navigate = useNavigate();

  const [activeIndex, setActiveIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const faqs = [
    {
      question: "외국어 지원이 되나요?",
      answer: "현재는 한국어만 지원되며 언어 확대를 검토중입니다.",
    },
        {
      question: "질문이 있을 때 어디에 문의하나요?",
      answer: "바로 여기 FAQ 게시판의 질의응답을 적극 이용해주세요.",
    },
        {
      question: "학습 진도가 저장되나요?",
      answer: "학습 진도는 따로 저장되지 않습니다.",
    },
    {
      question: "회원가입해야 이용할 수 있나요?",
      answer: "따로 회원가입이나 로그인 절차가 없이도 이용 가능합니다.",
    },
    {
      question: "학습 시간은 얼마나 걸리나요?",
      answer: "학습자 개인에 따라 다릅니다. 시간에 구애받지 않고 자유롭게 학습해보세요!",
    },
    {
      question: "모바일에서도 학습이 가능한가요?",
      answer: "현재까지는 웹 서비스를 겨냥하여 만들어졌지만, 모바일 환경에서의 학습환경 확대도 검토 중입니다.",
    },
        {
      question: "실제 키오스크처럼 연습할 수 있나요?",
      answer: "실제 키오스크 화면을 기반으로 구성되었기 때문에 유사한 환경에서 연습할 수 있습니다.",
    },
    {
      question: "고령자도 쉽게 따라할 수 있는 수준인가요?",
      answer: "네, 해당 서비스의 버튼을 클릭하며 자유롭게 조작해 보세요!",
    },
    {
      question: "어떤 종류의 키오스크를 배울 수 있나요?",
      answer: "본 서비스는 카페 키오스크 환경 기반으로 구성되었습니다.",
    },
    {
      question: "해당 서비스는 무료인가요?",
      answer: "네, 사용자 누구나 무료로 본 서비스 사용이 가능합니다.",
    },

  ];

  const toggleFaq = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="faq-wrapper">
      {/* 상단 초록색 배너 영역 */}
      <div className="faq-banner">
        <button className="back-btn" onClick={() => navigate(-1)}>
          ⬅ 뒤로
        </button>
        <div className="faq-banner-text">
          <h1>FAQ 게시판</h1>
          <p>자주 묻는 질문을 모아놓은 게시판이에요.</p>
        </div>
      </div>


      {/* 검색창 */}
        <div className="faq-search">
          <input
            type="text"
            placeholder="찾아보기"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>


      {/* FAQ 테이블 */}
      <div className="faq-table">
        <table>
          <thead>
            <tr>
              <th className="faq-th-number">번호</th>
              <th className="faq-th-title">제목</th>
            </tr>
          </thead>
          <tbody>
            {filteredFaqs.map((faq, index) => {
              const number = filteredFaqs.length - index; // 번호 거꾸로
              return (
                <React.Fragment key={index}>
                  <tr
                    className={`faq-question-row ${activeIndex === index ? "active" : ""
                      }`}
                    onClick={() => toggleFaq(index)}
                  >
                    <td className="faq-number">{number}</td>
                    <td className="faq-title">{faq.question}</td>
                  </tr>
                  {activeIndex === index && (
                    <tr className="faq-answer-row">
                      <td className="faq-a">A</td>
                      <td className="faq-answer" colSpan="2">
                        {faq.answer}
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Faq;
