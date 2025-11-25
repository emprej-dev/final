import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../src/styles/KioskScreen.css';

function KioskScreen({ guideMode, closeKiosk }) {
  const location = useLocation();
  const navigate = useNavigate();

  const showInfoDefault = location.state?.from === 'infoButton';
  const showQuizDefault = location.state?.from === 'quizButton';

  const [showInfo, setShowInfo] = useState(showInfoDefault || false);
  const [showQuizModal, setShowQuizModal] = useState(showQuizDefault || false);
  const [quizMode, setQuizMode] = useState(false);
  const [quizResultModal, setQuizResultModal] = useState(null);
  const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
  const [arrowPos, setArrowPos] = useState({ top: '0px', left: '0px' });

  const [selectedItems, setSelectedItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState('coffee');
  const [showPaymentOptions, setShowPaymentOptions] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [cartPage, setCartPage] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState(null);

  // 옵션 모달 상태
  const [showOptionModal, setShowOptionModal] = useState(false);
  const [selectedMenu, setSelectedMenu] = useState(null);
  const [optionTemp, setOptionTemp] = useState('HOT');
  const [optionSize, setOptionSize] = useState('M');
  const [optionQty, setOptionQty] = useState(1);

  useEffect(() => {
    // 알아보기 모드 → info 모달 자동 오픈
    if (guideMode === "arrow") {
      setShowInfo(true);
    }

    // 퀴즈 풀기 → quiz 모달 자동 오픈
    if (guideMode === "quiz") {
      setShowQuizModal(true);
    }
  }, [guideMode]);


  const quizAnswerList = [
    { name: '아메리카노', price: 4000 },
    { name: '아메리카노', price: 4000 },
    { name: '마카롱', price: 2500 },
    { name: '마카롱', price: 2500 },
    { name: '마카롱', price: 2500 },
    { name: '레몬에이드', price: 4000 }
  ];


  const checkQuizCorrect = () => {
    // 정답 조건
    const quizAnswer = [
      { name: '아메리카노', temp: 'HOT', size: 'M', qty: 2 },
      { name: '마카롱', qty: 3 },
      { name: '레몬에이드', temp: 'ICE', size: 'S', qty: 1 }
    ];

    // 사용자의 장바구니 데이터를 분석
    const userItems = {};

    selectedItems.forEach(item => {
      const key = item.name + (item.temperature || '') + (item.size || '');
      userItems[key] = (userItems[key] || 0) + item.quantity;
    });

    // 정답 조건 확인
    for (const answer of quizAnswer) {
      const key = answer.name + (answer.temp || '') + (answer.size || '');

      if (!userItems[key] || userItems[key] !== answer.qty) {
        return false;
      }
    }

    // 불필요한 추가 아이템이 있는 경우(=정답 외의 메뉴) 오답
    const validKeys = quizAnswer.map(a => a.name + (a.temp || '') + (a.size || ''));
    for (const key of Object.keys(userItems)) {
      if (!validKeys.includes(key)) return false;
    }

    return true;
  };

  const infoSteps = [
    {
      text: "여기는 카테고리를 선택하는 공간이에요.\n커피, 음료, 디저트 중 원하는 메뉴 종류를 바꿔볼 수 있어요.",
      highlight: ".category-buttons"
    },
    {
      text: "여기에는 선택한 카테고리에 해당하는 메뉴들이 표시돼요.\n주문하고 싶은 메뉴를 클릭해 옵션을 선택해보세요.",
      highlight: ".menu-list"
    },
    {
      text: "여기는 장바구니입니다.\n담은 메뉴와 옵션, 수량을 확인하고 \n필요하면 수정하거나 삭제할 수 있어요.",
      highlight: ".cart"
    },
    {
      text: "장바구니에서 확인까지 마쳤다면,\n하단의 ‘결제하기’ 버튼을 클릭해 결제를 진행하면 됩니다.",
      highlight: ".pay-button"
    }
  ];


  useEffect(() => {
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    if (showInfo) {
      const step = infoSteps[currentInfoIndex];
      if (!step) return;
      const el = document.querySelector(step.highlight);
      if (el) el.classList.add('highlight');
    }
  }, [showInfo, currentInfoIndex]);

  const handleNextInfo = () => {
    if (currentInfoIndex < infoSteps.length - 1) setCurrentInfoIndex(currentInfoIndex + 1);
    else {
      setShowInfo(false);
      setCurrentInfoIndex(0);
    }
  };

  useEffect(() => {
    if (!showInfo) document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
  }, [showInfo]);

  const itemsPerPage = 5;

  const menu = {
    coffee: [
      { name: '아메리카노', price: 4000, img: '/images/keopiwa-keopi-kong-eulo-gadeug-yuli.jpg' },
      { name: '카페라떼', price: 4500, img: '/images/mas-issneun-pumjil-ui-keopi-keob.jpg' },
      { name: '카푸치노', price: 4500, img: '/images/has-latte-keopi-keob.jpg' },
      { name: '에스프레소', price: 3500, img: '/images/espresso.jpg' },
      { name: '바닐라라떼', price: 5000, img: '/images/vanillalatte.jpg' },
      { name: '카라멜마끼아또', price: 5000, img: '/images/caramelmacchiato.jpg' },
      { name: '카페모카', price: 5000, img: '/images/coffee-6274506_640.jpg' },
      { name: '콜드브루', price: 4500, img: '/images/coldbrew.jpg' }
    ],
    beverage: [
      { name: '초코라떼', price: 4500, img: '/images/chocolatte.jpg' },
      { name: '녹차라떼', price: 4500, img: '/images/green-tea-latte-2647523_1280.jpg' },
      { name: '레몬에이드', price: 4000, img: '/images/lemonade-6210157_1280.jpg' },
      { name: '자몽에이드', price: 4000, img: '/images/grapefruit-9715105_1280.jpg' },
      { name: '밀크티', price: 4500, img: '/images/hongwei-fan-2kkxilGY8GA-unsplash.jpg' },
      { name: '청포도에이드', price: 4000, img: '/images/KakaoTalk_20251123_143053439.jpg' }
    ],
    dessert: [
      { name: '치즈케이크', price: 5000, img: '/images/new-york-cheese-cake-7500156_1280.jpg' },
      { name: '쿠키', price: 2000, img: '/images/cookie-7736938_1280.jpg' },
      { name: '마카롱', price: 2500, img: '/images/macarons-1850216_1280.jpg' },
      { name: '브라우니', price: 3000, img: '/images/brownie-548591_1280.jpg' },
      { name: '타르트', price: 4000, img: '/images/tart-1283822_1280.jpg' },
      { name: '푸딩', price: 3500, img: '/images/berries-6514669_1280.jpg' },
      { name: '젤라또', price: 4500, img: '/images/ice-cream-5928048_1280.jpg' },
      { name: '와플', price: 4000, img: '/images/waffles-7007465_1280.jpg' }
    ]
  };

  const totalPrice = selectedItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // 메뉴 클릭 → 옵션 모달 띄우기 (디저트는 옵션 없음)
  const handleMenuClick = (item) => {
    setSelectedMenu(item);
    setOptionQty(1);
    if (currentCategory === 'coffee' || currentCategory === 'beverage') {
      setOptionTemp('HOT');
      setOptionSize('M');
      setShowOptionModal(true);
    } else {
      // 디저트는 바로 장바구니
      setSelectedItems(prev => [...prev, { ...item, quantity: 1 }]);
    }
  };

  // 옵션 적용 → 장바구니 추가
  const applyOption = () => {
    const newItem = {
      ...selectedMenu,
      temperature: optionTemp,
      size: optionSize,
      quantity: optionQty
    };
    setSelectedItems(prev => [...prev, newItem]);
    setShowOptionModal(false);
  };

  const updateQty = (index, newQty) => {
    if (newQty < 1) return;
    setSelectedItems(prev =>
      prev.map((item, i) =>
        i === index ? { ...item, quantity: newQty } : item
      )
    );
  };

  const handleRemoveItem = (index) => {
    setSelectedItems(selectedItems.filter((_, i) => i !== index));
  };

  const handlePay = () => {
    if (selectedItems.length === 0) {
      alert('장바구니가 비어있습니다.');
      return;
    }
    setShowPaymentOptions(true);
  };

  const handlePayment = (method) => {
    setShowPaymentOptions(false);
    setPaymentMethod(method); // ← 여기 추가!

    if (quizMode) {
      const correct = checkQuizCorrect();
      setQuizResultModal(correct ? 'success' : 'fail');
      return;
    }

    // ⭐⭐⭐ 여기부터 서버로 주문 저장하는 코드 추가 ⭐⭐⭐
    fetch("https://final-backend-gj0d.onrender.com/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: selectedItems,
        totalPrice: totalPrice
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log("✅ 주문이 서버에 저장됨:", data);
      })
      .catch(err => {
        console.error("❌ 주문 저장 실패:", err);
      });
    // ⭐⭐⭐ 여기까지 추가 ⭐⭐⭐

    alert(`${method === 'card' ? '💳 카드' : '🟡 카카오페이'} 결제 완료!`);
    setShowPaymentModal(true);
  };

  const handleCloseModal = () => {
    setShowPaymentModal(false);
    setSelectedItems([]);
    setCartPage(0);
  };

  const startIdx = cartPage * itemsPerPage;
  const paginatedItems = selectedItems.slice(startIdx, startIdx + itemsPerPage);

  return (
    <div className="kiosk-container">

      {/* 상단 버튼 */}
      <div className="top-buttons">
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ 뒤로</button>
        <div className="right-buttons">
          <button onClick={() => alert('음성 기능 준비 중')}>🔊</button>
          <button onClick={() => navigate('/')}>🏠 홈</button>
          <button onClick={() => navigate('/faq')}>❓ 문의하기</button>
          <button onClick={() => navigate('/kiosk', { state: { from: 'infoButton' } })}>ℹ️ 알아보기</button>
          <button
            onClick={() => {
              // setSelectedItems([]);   // ← 장바구니 초기화
              setQuizMode(true);
              setShowQuizModal(true);
            }}
          >
            📝 퀴즈풀기
          </button>
        </div>
      </div>

      <h1 className="kiosk-title">키오스크 주문하기</h1>

      {/* 안내 모드 */}
      {showInfo && (
        <div className="info-box">
          <p>{infoSteps[currentInfoIndex].text}</p>
          <div className="info-buttons">
            <button className="info-btn" onClick={handleNextInfo}>다음 ➡</button>
            <button className="info-btn" onClick={() => setShowInfo(false)}>닫기</button>
          </div>
        </div>
      )}

      {/* 카테고리 버튼 */}
      <div className="category-buttons">
        {Object.keys(menu).map(cat => (
          <button key={cat} className={currentCategory === cat ? 'active' : ''} onClick={() => setCurrentCategory(cat)}>
            {cat === 'coffee' ? '커피' : cat === 'beverage' ? '음료' : '디저트'}
          </button>
        ))}
      </div>

      {/* 메뉴 리스트 */}
      <div className="menu-list">
        {menu[currentCategory].map(item => (
          <div key={item.name} className="menu-item" onClick={() => handleMenuClick(item)}>
            <img src={item.img} alt={item.name} />
            <div className="menu-name">{item.name}</div>
            <div className="menu-price">{item.price}원</div>
          </div>
        ))}
      </div>

      {/* 장바구니 */}
      <div className="cart">
        <h3>🛒 장바구니</h3>
        {selectedItems.length === 0 ? (
          <p>선택한 메뉴가 없습니다.</p>
        ) : (
          <>
            <ul>
              {paginatedItems.map((item, i) => (
                // <li key={i}>
                //   {item.name} ({item.price}원)
                //   {item.temperature && <> | {item.temperature}</>}
                //   {item.size && <> | {item.size}</>}
                //   <button onClick={() => updateQty(startIdx + i, item.quantity - 1)}>-</button>
                //   {item.quantity}
                //   <button onClick={() => updateQty(startIdx + i, item.quantity + 1)}>+</button>
                //   <button onClick={() => handleRemoveItem(startIdx + i)}>✕</button>
                // </li>

                <li className="cart-item" key={i}>

                  {/* 왼쪽: 메뉴명 + 옵션 */}
                  <div className="cart-left">
                    {item.name}
                    {item.temperature && <> | {item.temperature}</>}
                    {item.size && <> | {item.size}</>}
                  </div>

                  {/* 수량 버튼 */}
                  <div className="cart-qty">
                    <button onClick={() => updateQty(startIdx + i, item.quantity - 1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(startIdx + i, item.quantity + 1)}>+</button>
                  </div>

                  {/* 가격 */}
                  <div className="cart-price">
                    {item.price * item.quantity}원
                  </div>

                  {/* 삭제 버튼 */}
                  <div className="cart-remove">
                    <button onClick={() => handleRemoveItem(startIdx + i)}>✕</button>
                  </div>

                </li>

              ))}
            </ul>

            {/* 합계 표시 영역 */}
            <div className="cart-total">
              <span>합계</span>
              <span className="cart-total-price">{totalPrice.toLocaleString()}원</span>
            </div>


            <div className="pagination-buttons">
              <button onClick={() => setCartPage(Math.max(cartPage - 1, 0))} disabled={cartPage === 0}>◀ 이전</button>
              <button
                onClick={() =>
                  setCartPage(
                    Math.min(cartPage + 1, Math.ceil(selectedItems.length / itemsPerPage) - 1)
                  )
                }
                disabled={startIdx + itemsPerPage >= selectedItems.length}
              >
                다음 ▶
              </button>
            </div>
          </>
        )}

        {selectedItems.length > 0 && (
          <button className="pay-button" onClick={handlePay}>
            결제하기
          </button>
        )}
      </div>

      {/* 결제 수단 선택 */}
      {showPaymentOptions && (
        <div className="modal">
          <div className="modal-content">
            <h2>결제 수단을 선택하세요.</h2>
            <button className="card-btn" onClick={() => handlePayment('card')}>💳 카드 결제</button>
            <button className="kakao-btn" onClick={() => handlePayment('kakao')}>🟡 카카오페이</button>
            <button className="undo-btn" onClick={() => setShowPaymentOptions(false)}>취소</button>
          </div>
        </div>
      )}

      {/* 결제 완료 */}
      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>결제가 완료되었습니다.</h2>

            {paymentMethod === "card" ? (
              <p>카드를 제거해주세요.</p>
            ) : (
              <p>영수증을 가져가주세요.</p>
            )}
            <button className="payment-ok-btn" onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}

      {/* 옵션 모달 */}
      {showOptionModal && (
        <div className="modal">
          <div className="modal-content">
            <h2 className="option-menu-title">{selectedMenu.name}</h2>

            <h3 className="option-section-title">온도 선택</h3>
            <div className="option-row">
              <button
                className={`option-btn ${optionTemp === 'HOT' ? 'selected' : ''}`}
                onClick={() => setOptionTemp('HOT')}
              >
                HOT
              </button>
              <button
                className={`option-btn ${optionTemp === 'ICE' ? 'selected' : ''}`}
                onClick={() => setOptionTemp('ICE')}
              >
                ICE
              </button>
            </div>

            <h3 className="option-section-title">사이즈 선택</h3>
            <div className="option-row">
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  className={`option-btn ${optionSize === size ? 'selected' : ''}`}
                  onClick={() => setOptionSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <h3 className="option-section-title">수량</h3>
            <div className="option-row">
              <button className="qty-btn" onClick={() => setOptionQty((q) => Math.max(1, q - 1))}>-</button>
              {optionQty}
              <button className="qty-btn" onClick={() => setOptionQty((q) => q + 1)}>+</button>
            </div>

            <button className="apply-btn option-apply-btn" onClick={applyOption}>장바구니 담기</button>
            <button className="cancel-btn option-cancel-btn" onClick={() => setShowOptionModal(false)}>취소</button>
          </div>
        </div>
      )}

      {/* 퀴즈 모달 */}
      {showQuizModal && (
        <div className="modal">
          <div className="modal-content">

            {/* ✖ 닫기 버튼 */}
            <button className="close-modal-btn" onClick={() => setShowQuizModal(false)}>
              ✕
            </button>

            <h2 className="quiz-title">퀴즈 풀기</h2>
            <p>
              친구들과 음료를 포장주문하려고 합니다.<br />
              아래 메뉴를 <strong>정확한 옵션까지 선택해서 결제</strong>하세요.
              <br /><br />
              1. 아메리카노  |  HOT | M 사이즈 | 2잔<br />
              2. 마카롱 | 3개<br />
              3. 레몬에이드 | ICE | S 사이즈 | 1잔
            </p>


            <button className="quiz-start-btn" onClick={() => setShowQuizModal(false)}>
              시작하기
            </button>

          </div>
        </div>
      )}

      {/* 퀴즈 정답 모달 */}
      {quizResultModal && (
        <div className="modal">
          <div className="modal-content">
            {quizResultModal === 'success' ? (
              <>
                <h2> 정답입니다!🎉 </h2>
                <p>모두 맞게 주문하셨어요.</p>
                <button className="quiz-result-btn" onClick={() => {
                  setQuizResultModal(null);
                  setQuizMode(false);
                  setSelectedItems([]);
                }}>확인</button>
              </>
            ) : (
              <>
                <h2>다시 시도해보세요.</h2>
                <p>퀴즈와 다른 메뉴입니다. 다시 주문해볼까요?</p>
                <button className="quiz-result-btn" onClick={() => setQuizResultModal(null)}>확인</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default KioskScreen;
