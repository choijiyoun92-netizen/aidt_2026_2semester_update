(() => {
  const layer = document.getElementById('updateLayer');
  const confirmButton = document.getElementById('confirmButton');
  const skipCheck = document.getElementById('skipToday');

  // TODO: 상세 안내 웹페이지 주소가 확정되면 아래 URL만 교체하세요.
  const UPDATE_PAGE_URL = '../reveal/index.html';

  // 데모용 로컬 저장 키입니다.
  // 실제 서비스 연동 시 쿠키/사용자 설정 API 정책에 맞게 변경하면 됩니다.
  const HIDE_KEY = 'aidt-2026-2semester-update-hide';

  const shouldHide = localStorage.getItem(HIDE_KEY) === 'true';
  if (shouldHide) {
    layer.classList.add('is-hidden');
  }

  confirmButton.addEventListener('click', () => {
    if (skipCheck.checked) {
      localStorage.setItem(HIDE_KEY, 'true');
    }

    // 상세 안내 페이지 새 창 오픈
    window.open(UPDATE_PAGE_URL, '_blank', 'noopener,noreferrer');

    // 현재 진입 팝업 닫기
    layer.classList.add('is-hidden');
  });

  // ESC로 닫기: 실제 정책상 닫기 허용 여부에 따라 제거 가능
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      layer.classList.add('is-hidden');
    }
  });
})();
