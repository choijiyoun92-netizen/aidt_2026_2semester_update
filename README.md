# AIDT 2026년 2학기 업데이트 통합 목업

이 폴더 하나만 VS Code에서 열어 사용하면 됩니다.

## 폴더 구조

```text
aidt_2026_2semester_update/
├─ index.html              # 통합 시작점 → popup/index.html로 이동
├─ popup/
│  ├─ index.html           # AIDT 진입용 2학기 업데이트 팝업
│  ├─ style.css
│  ├─ script.js
│  └─ README.txt
└─ reveal/
   ├─ index.html           # 15개 개선 사항 상세 안내 웹페이지
   ├─ css/style.css
   ├─ js/script.js
   ├─ assets/
   │  └─ README_이미지_가이드.txt
   └─ README.md
```

## 실행 방법

1. VS Code에서 `aidt_2026_2semester_update` 폴더를 엽니다.
2. 최상위 `index.html`을 Live Server로 실행합니다.
3. AIDT 진입 팝업이 표시됩니다.
4. 팝업의 `[확인]`을 누르면 `reveal/index.html`이 새 창으로 열립니다.

## 이미지/GIF 적용

상세 페이지의 이미지 영역은 현재 Placeholder로 되어 있습니다.
`reveal/assets/README_이미지_가이드.txt`에 적힌 파일명 그대로 실제 PNG/GIF를 넣으면 자동으로 표시됩니다.

예:

```text
reveal/assets/update08-continue-learning.gif
reveal/assets/update10-responsive-popup.gif
reveal/assets/update02-home-teacher.png
```

## 참고

- 팝업의 `다시 보지 않기`는 현재 목업 확인용 `localStorage` 방식입니다.
- 실제 AIDT 적용 시에는 서비스의 쿠키/사용자 설정 정책에 맞게 변경하면 됩니다.
- 상세 페이지 CLOSE 역시 현재 목업용이며, 실서비스 연동 시 창 닫기 정책에 맞게 연결하면 됩니다.
