[AIDT 2026년 2학기 업데이트 진입 팝업 목업]

구성
- index.html : 팝업 마크업 + 데모용 AIDT 배경
- style.css : 팝업 스타일
- script.js : 확인/다시 보지 않기/상세페이지 새 창 연결

실행 방법
1. 세 파일을 같은 폴더에 둡니다.
2. VS Code에서 index.html을 Live Server로 실행합니다.

상세 안내 페이지 연결
- script.js의 UPDATE_PAGE_URL 값을 실제 2학기 개선사항 안내 페이지 주소로 변경하세요.

실서비스 적용 시
- index.html의 .demo-background는 목업 확인용이므로 제거할 수 있습니다.
- .update-layer부터 기존 AIDT 화면 위에 삽입하면 됩니다.
- '다시 보지 않기' 저장 방식은 현재 localStorage 데모이며,
  서비스 정책에 따라 쿠키/계정 설정 API 등으로 교체할 수 있습니다.
