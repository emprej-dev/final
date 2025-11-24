import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import '../../src/styles/KioskScreen.css';

function KioskScreen({guideMode, closeKiosk}) {
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
  // 메뉴별 정답 수량
  const answerCount = {
    '아메리카노': 2,
    '마카롱': 3,
    '레몬에이드': 1
  };

  // 장바구니에서 메뉴별 수량 계산
  const userCount = {};
  selectedItems.forEach(item => {
    userCount[item.name] = (userCount[item.name] || 0) + item.quantity;
  });

  // 정답 비교
  for (const [name, qty] of Object.entries(answerCount)) {
    if (userCount[name] !== qty) return false;
  }

  // 추가로 장바구니에 다른 메뉴가 있으면 틀림
  for (const name of Object.keys(userCount)) {
    if (!answerCount[name]) return false;
  }

  return true;
};


  const infoSteps = [
    { text: "여기는 카테고리 영역입니다!", highlight: ".category-buttons", arrow: { top: "270px", left: "50%" } },
    { text: "여기에는 메뉴가 표시돼요!", highlight: ".menu-list", arrow: { top: "450px", left: "50%" } },
    { text: "장바구니에서는 담긴 메뉴를 확인!", highlight: ".cart", arrow: { top: "720px", left: "50%" } },
    { text: "여기서 결제하기 버튼을 눌러 결제!", highlight: ".pay-button", arrow: { top: "850px", left: "50%" } }
  ];

  useEffect(() => {
    document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
    if (showInfo) {
      const step = infoSteps[currentInfoIndex];
      if (!step) return;
      const el = document.querySelector(step.highlight);
      if (el) el.classList.add('highlight');
      setArrowPos(step.arrow);
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
      { name: '모카', price: 5000, img: '/images/coffee-6274506_640.jpg' },
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

    if (quizMode) {
      const correct = checkQuizCorrect();
      setQuizResultModal(correct ? 'success' : 'fail');
      return;
    }

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

      {/* 안내 화살표 */}
      {showInfo && (
        <img src="/images/arrow.png" className="arrow" style={{ top: arrowPos.top, left: arrowPos.left }} alt="arrow" />
      )}

      {/* 상단 버튼 */}
      <div className="top-buttons">
        <button className="back-btn" onClick={() => navigate(-1)}>⬅ 뒤로</button>
        <div className="right-buttons">
          <button onClick={() => alert('음성 기능 준비 중')}>🔊</button>
          <button onClick={() => navigate('/')}>🏠 홈</button>
          <button onClick={() => navigate('/faq')}>❓ 문의</button>
          <button onClick={() => navigate('/kiosk', { state: { from: 'infoButton' } })}>ℹ️ 알아보기</button>
          <button
            onClick={() => {
              setSelectedItems([]);
              setQuizMode(true);
              setShowQuizModal(true);
            }}
          >
            📝 퀴즈하기
          </button>
        </div>
      </div>

      <h1 className="kiosk-title">☕ 키오스크 주문하기</h1>

      {/* 안내 모드 */}
      {showInfo && (
        <div className="info-box">
          <p>{infoSteps[currentInfoIndex].text}</p>
          <div className="info-buttons">
            <button onClick={handleNextInfo}>다음 ▶</button>
            <button onClick={() => setShowInfo(false)}>닫기</button>
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
                <li key={i}>
                  {item.name} ({item.price}원)
                  {item.temperature && <> | {item.temperature}</>}
                  {item.size && <> | {item.size}</>}
                  <button onClick={() => updateQty(startIdx + i, item.quantity - 1)}>-</button>
                  {item.quantity}
                  <button onClick={() => updateQty(startIdx + i, item.quantity + 1)}>+</button>
                  <button onClick={() => handleRemoveItem(startIdx + i)}>❌</button>
                </li>
              ))}
            </ul>

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
            결제하기 ({totalPrice}원)
          </button>
        )}
      </div>

      {/* 결제 수단 선택 */}
      {showPaymentOptions && (
        <div className="modal">
          <div className="modal-content">
            <h2>결제 수단을 선택하세요</h2>
            <button className="card-btn" onClick={() => handlePayment('card')}>💳 카드 결제</button>
            <button className="kakao-btn" onClick={() => handlePayment('kakao')}>🟡 카카오페이</button>
            <button onClick={() => setShowPaymentOptions(false)}>취소</button>
          </div>
        </div>
      )}

      {/* 결제 완료 */}
      {showPaymentModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>✅ 결제 완료!</h2>
            <p>감사합니다 😊</p>
            <button onClick={handleCloseModal}>확인</button>
          </div>
        </div>
      )}

      {/* 옵션 모달 */}
      {showOptionModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>{selectedMenu.name}</h2>

            <h3>온도 선택</h3>
            <div className="option-row">
              <button
                className={optionTemp === 'HOT' ? 'active' : ''}
                onClick={() => setOptionTemp('HOT')}
              >
                HOT
              </button>
              <button
                className={optionTemp === 'ICE' ? 'active' : ''}
                onClick={() => setOptionTemp('ICE')}
              >
                ICE
              </button>
            </div>

            <h3>사이즈 선택</h3>
            <div className="option-row">
              {['S', 'M', 'L'].map((size) => (
                <button
                  key={size}
                  className={optionSize === size ? 'active' : ''}
                  onClick={() => setOptionSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>

            <h3>수량</h3>
            <div className="option-row">
              <button onClick={() => setOptionQty((q) => Math.max(1, q - 1))}>-</button>
              {optionQty}
              <button onClick={() => setOptionQty((q) => q + 1)}>+</button>
            </div>

            <button className="apply-btn" onClick={applyOption}>장바구니 담기</button>
            <button className="cancel-btn" onClick={() => setShowOptionModal(false)}>취소</button>
          </div>
        </div>
      )}

      {/* 퀴즈 모달 */}
      {showQuizModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>퀴즈! 🎉</h2>
            <p>
              친구들과 음료를 포장하려고 합니다!<br />
              아래 주문을 <strong>직접 선택해서 장바구니에 담고 결제</strong>하세요.
              <br /><br />
              1. 아메리카노 2잔<br />
              2. 마카롱 3개<br />
              3. 레몬에이드 1잔
            </p>

            <button onClick={() => setShowQuizModal(false)}>시작하기 ▶</button>
          </div>
        </div>
      )}

      {/* 퀴즈 정답 모달 */}
      {quizResultModal && (
        <div className="modal">
          <div className="modal-content">
            {quizResultModal === 'success' ? (
              <>
                <h2>🎉 정답입니다!</h2>
                <p>잘하셨어요! 퀴즈 성공 🎉</p>
                <button onClick={() => {
                  setQuizResultModal(null);
                  setQuizMode(false);
                  setSelectedItems([]);
                }}>확인</button>
              </>
            ) : (
              <>
                <h2>❌ 틀렸습니다</h2>
                <p>문제와 다릅니다. 다시 시도하세요!</p>
                <button onClick={() => setQuizResultModal(null)}>확인</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default KioskScreen;
