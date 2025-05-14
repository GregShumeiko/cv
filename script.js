document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.panel');
  const dots = document.querySelectorAll('.dot');
  const navLinks = document.querySelectorAll('.nav-links a');
  const btns = document.querySelectorAll('.btn');
  let currentIndex = 0;
  let isAnimating = false;

  // Инициализация
  panels[0].classList.add('active');

  // Навигация по точкам
  dots.forEach(dot => {
    dot.addEventListener('click', () => {
      const index = parseInt(dot.getAttribute('data-index'));
      goToPanel(index);
    });
  });

  // Навигация по ссылкам
  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(link.getAttribute('data-index'));
      goToPanel(index);
    });
  });

  // Навигация по кнопкам
  btns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      if (btn.hasAttribute('data-index')) {
        e.preventDefault();
        const index = parseInt(btn.getAttribute('data-index'));
        goToPanel(index);
      }
    });
  });

  // Обработчик колеса мыши
  window.addEventListener('wheel', (e) => {
    if (isAnimating) return;
    
    if (e.deltaY > 0) {
      if (currentIndex < panels.length - 1) {
        goToPanel(currentIndex + 1);
      }
    } else {
      if (currentIndex > 0) {
        goToPanel(currentIndex - 1);
      }
    }
  }, { passive: false });

  // Обработчик касаний
  let touchStartY = 0;
  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isAnimating) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (diff > 50 && currentIndex < panels.length - 1) {
      goToPanel(currentIndex + 1);
    } else if (diff < -50 && currentIndex > 0) {
      goToPanel(currentIndex - 1);
    }
  }, { passive: true });

  // Функция перехода к панели
  function goToPanel(index) {
    if (isAnimating || index < 0 || index >= panels.length || index === currentIndex) return;
    
    isAnimating = true;
    
    panels[currentIndex].classList.remove('active');
    panels[currentIndex].classList.add(index > currentIndex ? 'prev' : 'next');
    
    dots[currentIndex].classList.remove('active');
    dots[index].classList.add('active');
    
    panels[index].classList.add('active');
    panels[index].classList.remove('prev', 'next');
    
    currentIndex = index;
    
    setTimeout(() => {
      isAnimating = false;
    }, 1000);
  }
});