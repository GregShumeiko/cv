document.addEventListener('DOMContentLoaded', () => {
  // ... предыдущий код ...

  // Тексты для анимации печати
  const panelTexts = [
    "Потрясающий параллакс",
    "О нашей компании",
    "Наши проекты",
    "Наши услуги",
    "Контакты"
  ];

  // Обработчик касаний с ограничением
  let touchStartY = 0;
  let lastScrollTime = 0;
  const scrollDelay = 1000; // Задержка между скроллами

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    const now = Date.now();
    if (now - lastScrollTime < scrollDelay) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (diff > 50 && currentIndex < panels.length - 1) {
      goToPanel(currentIndex + 1);
      lastScrollTime = now;
    } else if (diff < -50 && currentIndex > 0) {
      goToPanel(currentIndex - 1);
      lastScrollTime = now;
    }
  }, { passive: true });

  // Функция перехода с анимацией текста
  function goToPanel(index) {
    if (isAnimating || index < 0 || index >= panels.length || index === currentIndex) return;
    
    isAnimating = true;
    
    // Сброс анимаций текущей панели
    resetAnimations(panels[currentIndex]);
    
    panels[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Установка нового текста
    const typingElement = panels[index].querySelector('.typing-text');
    typingElement.textContent = panelTexts[index];
    typingElement.style.width = '0';
    
    panels[index].classList.add('active');
    dots[index].classList.add('active');
    
    currentIndex = index;
    
    setTimeout(() => {
      isAnimating = false;
    }, 1000);
  }

  function resetAnimations(panel) {
    const typingElement = panel.querySelector('.typing-text');
    const textContent = panel.querySelector('.text-content');
    const button = panel.querySelector('.slide-up-btn');
    
    typingElement.style.animation = 'none';
    textContent.style.animation = 'none';
    button.style.animation = 'none';
    
    setTimeout(() => {
      typingElement.style.animation = '';
      textContent.style.animation = '';
      button.style.animation = '';
    }, 10);
  }

  // Инициализация первого блока
  const firstTyping = document.querySelector('.typing-text');
  firstTyping.textContent = panelTexts[0];
  firstTyping.style.width = '0';
});
