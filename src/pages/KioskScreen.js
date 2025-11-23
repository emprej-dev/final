import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../src/styles/KioskScreen.css';

function KioskScreen() {
const location = useLocation();
const navigate = useNavigate();

// 홈 화면에서 "알아보기" 버튼 클릭 시만 true, 그 외는 false
const showInfoDefault = location.state?.from === 'infoButton';
const [showInfo, setShowInfo] = useState(showInfoDefault || false);

/** 홈에서 알아보기 버튼 클릭 시 자동으로 info 박스 열기 */
useEffect(() => {
if (location.state?.from === 'infoButton') {
setShowInfo(true);
}else if(location.state?.from === 'quizButton'){
  setShowQuizModal(true);
}
}, [location.state]);

/** 알아보기 기능 */
const [currentInfoIndex, setCurrentInfoIndex] = useState(0);
const [arrowPos, setArrowPos] = useState({ top: '0px', left: '0px' });

const [selectedItems, setSelectedItems] = useState([]);
const [currentCategory, setCurrentCategory] = useState('coffee');
const [showPaymentModal, setShowPaymentModal] = useState(false);
const [showPaymentOptions, setShowPaymentOptions] = useState(false);
const [cartPage, setCartPage] = useState(0);

const infoSteps = [
{ text: "여기는 카테고리 영역입니다! 커피 / 음료 / 디저트를 선택할 수 있어요.", highlight: ".category-buttons", arrow: { top: "270px", left: "50%" } },
{ text: "여기에는 선택한 카테고리의 메뉴가 표시돼요. 원하는 메뉴를 눌러 장바구니에 담을 수 있어요.", highlight: ".menu-list", arrow: { top: "450px", left: "50%" } },
{ text: "장바구니에서는 담긴 메뉴를 확인하고 삭제할 수 있어요.", highlight: ".cart", arrow: { top: "720px", left: "50%" } },
{ text: "여기서 결제하기 버튼을 눌러 결제를 진행할 수 있어요!", highlight: ".pay-button", arrow: { top: "850px", left: "50%" } }
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
else { setShowInfo(false); setCurrentInfoIndex(0); }
};

useEffect(() => {
if (!showInfo) document.querySelectorAll('.highlight').forEach(el => el.classList.remove('highlight'));
}, [showInfo]);

/** 메뉴 및 결제 */
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
{ name: '콜드브루', price: 4500, img: '/images/coldbrew.jpg' },
],
beverage: [
{ name: '초코라떼', price: 4500, img: '/images/chocolatte.jpg' },
{ name: '녹차라떼', price: 4500, img: '/images/green-tea-latte-2647523_1280.jpg' },
{ name: '레몬에이드', price: 4000, img: '/images/lemonade-6210157_1280.jpg' },
{ name: '자몽에이드', price: 4000, img: '/images/grapefruit-9715105_1280.jpg' },
{ name: '밀크티', price: 4500, img: '/images/hongwei-fan-2kkxilGY8GA-unsplash.jpg' },
{ name: '청포도에이드', price: 4000, img: '/images/KakaoTalk_20251123_143053439.jpg' },
],
dessert: [
{ name: '치즈케이크', price: 5000, img: '/images/new-york-cheese-cake-7500156_1280.jpg' },
{ name: '쿠키', price: 2000, img: '/images/cookie-7736938_1280.jpg' },
{ name: '마카롱', price: 2500, img: '/images/macarons-1850216_1280.jpg' },
{ name: '브라우니', price: 3000, img: '/images/brownie-548591_1280.jpg' },
{ name: '타르트', price: 4000, img: '/images/tart-1283822_1280.jpg' },
{ name: '푸딩', price: 3500, img: '/images/berries-6514669_1280.jpg' },
{ name: '젤라또', price: 4500, img: '/images/ice-cream-5928048_1280.jpg' },
{ name: '와플', price: 4000, img: '/images/waffles-7007465_1280.jpg' },
],
};

const totalPrice = selectedItems.reduce((sum, item) => sum + item.price, 0);
const handleAddItem = (item) => setSelectedItems([...selectedItems, item]);
const handleRemoveItem = (index) => { setSelectedItems(selectedItems.filter((_, i) => i !== index)); };

const handlePay = () => { if (selectedItems.length > 0) setShowPaymentOptions(true); };

/** 안전 결제 처리 */
const handlePayment = async (method) => {
try {
if (selectedItems.length === 0) {
alert('장바구니가 비어있습니다.');
return;
}

  const payload = {
    items: selectedItems.map(item => ({ name: item.name, price: item.price })),
    method,
    total: totalPrice
  };

  const response = await axios.post('http://localhost:5000/api/orders', payload);

  if (response.status === 201) {
    alert(`${method === 'card' ? '💳 카드' : '🟡 카카오페이'} 결제 완료!`);
    setShowPaymentOptions(false);
    setShowPaymentModal(true);
  } else {
    throw new Error('서버 응답 오류');
  }
} catch (err) {
  console.error('결제 오류', err);
  alert('결제 중 오류가 발생했습니다. 서버가 켜져 있는지 확인해주세요.');
}


};

const handleCloseModal = () => {
setShowPaymentModal(false);
setSelectedItems([]);
setCartPage(0);
};

const startIdx = cartPage * itemsPerPage;
const paginatedItems = selectedItems.slice(startIdx, startIdx + itemsPerPage);

/** 퀴즈 모달 상태 */
const [showQuizModal, setShowQuizModal] = useState(false);
const [quizCompleted, setQuizCompleted] = useState(false);

const handleQuizOpen = () => setShowQuizModal(true);
const handleQuizClose = () => { setShowQuizModal(false); setQuizCompleted(true); };
const handleHintClick = () => {
if (quizCompleted) setShowQuizModal(true);
else alert('퀴즈를 먼저 실행해주세요!');
};

return ( <div className="kiosk-container">

```
  {showInfo && (
    <img src="/images/arrow.png" className="arrow" style={{ top: arrowPos.top, left: arrowPos.left }} alt="arrow" />
  )}

  <div className="top-buttons">
    <button className="back-btn" onClick={() => navigate(-1)}>⬅ 뒤로</button>
    <div className="right-buttons">
      <button onClick={() => alert('음성 기능 준비 중')}>🔊</button>
      <button onClick={() => navigate('/')}>🏠 홈</button>
      <button onClick={() => navigate('/faq')}>❓ 문의</button>
      <button onClick={() => navigate('/kiosk', { state: { from: 'infoButton' } })}>ℹ️ 알아보기</button>
      <button onClick={() => navigate('/kiosk', {state: {from: 'quizButton'}})}>📝 퀴즈하기</button>
    </div>
  </div>

  <h1 className="kiosk-title">☕ 키오스크 주문하기</h1>

  {showInfo && (
    <div className="info-box">
      <p>{infoSteps[currentInfoIndex].text}</p>
      <div className="info-buttons">
        <button onClick={handleNextInfo}>다음 ▶</button>
        <button onClick={() => setShowInfo(false)}>닫기</button>
      </div>
    </div>
  )}

  <div className="category-buttons">
    {Object.keys(menu).map((cat) => (
      <button key={cat} className={currentCategory === cat ? 'active' : ''} onClick={() => setCurrentCategory(cat)}>
        {cat === 'coffee' ? '커피' : cat === 'beverage' ? '음료' : '디저트'}
      </button>
    ))}
  </div>

  <div className="menu-list">
    {menu[currentCategory].map((item) => (
      <div key={item.name} className="menu-item" onClick={() => handleAddItem(item)}>
        <img src={item.img} alt={item.name} />
        <div className="menu-name">{item.name}</div>
        <div className="menu-price">{item.price}원</div>
      </div>
    ))}
  </div>

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
              <button onClick={() => handleRemoveItem(startIdx + i)}>❌</button>
            </li>
          ))}
        </ul>

        <div className="pagination-buttons">
          <button onClick={() => setCartPage(Math.max(cartPage - 1, 0))} disabled={cartPage === 0}>◀ 이전</button>
          <button onClick={() => setCartPage(Math.min(cartPage + 1, Math.ceil(selectedItems.length / itemsPerPage) - 1))} disabled={startIdx + itemsPerPage >= selectedItems.length}>다음 ▶</button>
        </div>
      </>
    )}

    {selectedItems.length > 0 && (
      <button className="pay-button" onClick={handlePay}>
        결제하기 ({totalPrice}원)
      </button>
    )}
  </div>

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

  {showPaymentModal && (
    <div className="modal">
      <div className="modal-content">
        <h2>✅ 결제 완료!</h2>
        <p>감사합니다 😊</p>
        <button onClick={handleCloseModal}>확인</button>
      </div>
    </div>
  )}

  {showQuizModal && (
    <div className="modal">
      <div className="modal-content">
        <h2>퀴즈! 🎉</h2>
        <p>여기에 퀴즈 내용을 넣으세요.</p>
        <button onClick={handleQuizClose}>닫기</button>
      </div>
    </div>
  )}

</div>

);
}

export default KioskScreen;
