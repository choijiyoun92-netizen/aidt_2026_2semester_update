(() => {
  const assets = document.querySelectorAll('.asset[data-src]');

  /* =========================================================
     원본 화면 보기 모달 생성
  ========================================================= */

  const viewer = document.createElement('div');
  viewer.className = 'original-viewer';
  viewer.setAttribute('aria-hidden', 'true');

  viewer.innerHTML = `
    <div
      class="original-viewer__content"
      role="dialog"
      aria-modal="true"
      aria-label="원본 화면 보기"
    >
      <button
        type="button"
        class="original-viewer__close"
        aria-label="원본 화면 닫기"
      >
        ×
      </button>

      <div class="original-viewer__media"></div>

      <div class="original-viewer__caption"></div>
    </div>
  `;

  document.body.appendChild(viewer);

  const viewerMedia = viewer.querySelector('.original-viewer__media');
  const viewerCaption = viewer.querySelector('.original-viewer__caption');
  const viewerClose = viewer.querySelector('.original-viewer__close');


  /* =========================================================
     원본 화면 열기
  ========================================================= */

  const openViewer = (src, ext, title) => {
    viewerMedia.innerHTML = '';

    let media;

    if (ext === 'mp4' || ext === 'webm') {
      media = document.createElement('video');

      media.src = src;
      media.autoplay = true;
      media.loop = true;
      media.muted = true;
      media.playsInline = true;
      media.controls = true;
    } else {
      media = document.createElement('img');

      media.src = src;
      media.alt = title || '원본 화면';
    }

    viewerMedia.appendChild(media);

    viewerCaption.textContent = title || '원본 화면';

    viewer.classList.add('is-open');
    viewer.setAttribute('aria-hidden', 'false');

    document.body.classList.add('viewer-open');
  };


  /* =========================================================
     원본 화면 닫기
  ========================================================= */

  const closeViewer = () => {
    viewer.classList.remove('is-open');
    viewer.setAttribute('aria-hidden', 'true');

    document.body.classList.remove('viewer-open');

    /* GIF / 동영상 재생 정리 */
    setTimeout(() => {
      viewerMedia.innerHTML = '';
    }, 200);
  };

  viewerClose.addEventListener('click', closeViewer);

  /* 검은 배경 클릭 시 닫기 */
  viewer.addEventListener('click', (event) => {
    if (event.target === viewer) {
      closeViewer();
    }
  });

  /* ESC 키로 닫기 */
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && viewer.classList.contains('is-open')) {
      closeViewer();
    }
  });


  /* =========================================================
     실제 이미지/GIF 파일 로드
  ========================================================= */

  assets.forEach(box => {
    const src = box.dataset.src;
    const ext = src.split('.').pop().toLowerCase();

    /*
      Placeholder 안의 제목을
      원본 보기 모달의 제목으로 활용
    */
    const placeholder = box.querySelector('.placeholder');
    const placeholderTitle = placeholder
      ?.querySelector('b')
      ?.textContent
      ?.trim();

    const title = placeholderTitle || '원본 화면';


    /*
      PNG / JPG / GIF → img
      MP4 / WEBM → video
    */
    const media =
      ext === 'mp4' || ext === 'webm'
        ? document.createElement('video')
        : document.createElement('img');


    if (media.tagName === 'VIDEO') {
      media.autoplay = true;
      media.loop = true;
      media.muted = true;
      media.playsInline = true;
    }


    /* 파일 정상 로드 */
    const mediaLoaded = () => {
      /*
        Placeholder 제거
      */
      placeholder?.remove();

      /*
        실제 미디어가 있다는 상태값
      */
      box.classList.add('has-media');

      /*
        키보드 접근도 가능하게 설정
      */
      box.setAttribute('role', 'button');
      box.setAttribute('tabindex', '0');
      box.setAttribute(
        'aria-label',
        `${title} 원본 화면 보기`
      );


      /*
        Hover 오버레이 생성
      */
      const overlay = document.createElement('div');
      overlay.className = 'asset-preview-overlay';

      overlay.innerHTML = `
        <div class="asset-preview-button">
          <span class="asset-preview-icon">⌕</span>
          <span>원본 화면 보기</span>
        </div>
      `;

      box.appendChild(overlay);


      /*
        클릭하면 원본 화면 열기
      */
      box.addEventListener('click', () => {
        openViewer(src, ext, title);
      });


      /*
        Enter / Space 키도 지원
      */
      box.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          openViewer(src, ext, title);
        }
      });
    };


    if (media.tagName === 'VIDEO') {
      media.addEventListener(
        'loadeddata',
        mediaLoaded,
        { once: true }
      );
    } else {
      media.addEventListener(
        'load',
        mediaLoaded,
        { once: true }
      );
    }


    /*
      파일이 없는 경우에는 기존 Placeholder 유지
    */
    media.onerror = () => {
      media.remove();
    };


    media.src = src;

    box.prepend(media);
  });


  /* =========================================================
     우측 내비게이션
  ========================================================= */

  const navItems = [
    ...document.querySelectorAll('.nav-item')
  ];

  navItems.forEach(btn =>
    btn.addEventListener('click', () => {
      document
        .getElementById(btn.dataset.target)
        ?.scrollIntoView({
          behavior: 'smooth'
        });
    })
  );


  const tracked = [
    ...document.querySelectorAll('.tracked')
  ];

  const observer = new IntersectionObserver(
    entries => {
      const visible = entries
        .filter(entry => entry.isIntersecting)
        .sort(
          (a, b) =>
            b.intersectionRatio -
            a.intersectionRatio
        )[0];

      if (!visible) return;

      const key =
        visible.target.dataset.nav;

      navItems.forEach(nav =>
        nav.classList.toggle(
          'active',
          nav.dataset.target === key
        )
      );
    },
    {
      threshold: [
        0.35,
        0.55,
        0.7
      ]
    }
  );

  tracked.forEach(el =>
    observer.observe(el)
  );


  /* =========================================================
     CLOSE / 다시 보지 않기
  ========================================================= */

  const dontShow =
    document.getElementById('dontShow');

  document
    .querySelectorAll('.js-close')
    .forEach(btn =>
      btn.addEventListener('click', () => {

        if (dontShow?.checked) {
          localStorage.setItem(
            'aidt_2026_2semester_hide',
            'true'
          );
        }

        if (window.opener) {
          window.close();
          return;
        }

        alert(
          '목업입니다. 실제 AIDT 연동 시 이 버튼을 페이지 닫기 동작으로 연결하면 됩니다.'
        );
      })
    );
})();