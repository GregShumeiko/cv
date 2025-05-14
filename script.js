document.addEventListener('DOMContentLoaded', () => {
  const panels = document.querySelectorAll('.panel');
  const dots = document.querySelectorAll('.dot');
  let currentIndex = 0;
  let isAnimating = false;

  // Тексты для анимации печати
  const panelTexts = [
    "Потрясающий параллакс",
    "О нашей компании",
    "Наши проекты",
    "Наши услуги",
    "Контакты"
  ];

  // Длинные тексты для каждого блока
  const panelDescriptions = [
    "Компания 'Параллакс' - ведущий разработчик инновационных цифровых решений с 2010 года. Мы специализируемся на создании уникальных веб-приложений с использованием современных технологий. Наша команда состоит из 50+ профессионалов, которые уже реализовали более 200 успешных проектов для клиентов по всему миру. Мы гордимся каждым проектом и стремимся к совершенству во всех аспектах нашей работы.",
    "Наша компания была основана в 2010 году группой энтузиастов, которые верили в силу технологий. Сегодня мы - это сплоченная команда профессионалов, работающая над созданием цифровых решений будущего. Наши ценности: инновации, качество и клиентоориентированность. Мы постоянно развиваемся и внедряем новые технологии, чтобы оставаться на передовой цифровой трансформации.",
    "Среди наших проектов: корпоративные порталы для крупных компаний, мобильные приложения с миллионной аудиторией, сложные веб-приложения для финансового сектора. Каждый проект - это уникальный вызов и возможность создать что-то действительно значимое. Мы работаем с клиентами из различных отраслей, предлагая индивидуальные решения для каждого бизнеса.",
    "Мы предлагаем полный цикл разработки: от анализа бизнес-процессов и проектирования UX/UI до реализации и поддержки. Наши услуги включают веб-разработку, мобильные приложения, интеграцию систем, аналитику данных и консалтинг. Мы используем Agile-подход, что позволяет нам быть гибкими и оперативно реагировать на изменения требований.",
    "Свяжитесь с нами для обсуждения вашего проекта. Наш офис находится в Москве, но мы работаем с клиентами по всему миру. Телефон: +7 (495) 123-45-67, email: info@parallax.ru. Мы открыты для сотрудничества и всегда рады новым вызовам. Давайте создавать будущее вместе!"
  ];

  // Обработчик свайпа с ограничением
  let touchStartY = 0;
  let isScrolling = false;

  window.addEventListener('touchstart', (e) => {
    touchStartY = e.touches[0].clientY;
  }, { passive: true });

  window.addEventListener('touchend', (e) => {
    if (isScrolling || isAnimating) return;
    isScrolling = true;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    if (diff > 50 && currentIndex < panels.length - 1) {
      goToPanel(currentIndex + 1);
    } else if (diff < -50 && currentIndex > 0) {
      goToPanel(currentIndex - 1);
    }
    
    setTimeout(() => {
      isScrolling = false;
    }, 1000);
  }, { passive: true });

  // Навигация по точкам и ссылкам
  document.querySelectorAll('[data-index]').forEach(el => {
    el.addEventListener('click', (e) => {
      e.preventDefault();
      const index = parseInt(el.getAttribute('data-index'));
      if (!isAnimating && index !== currentIndex) {
        goToPanel(index);
      }
    });
  });

  // Функция перехода с анимацией
  function goToPanel(index) {
    isAnimating = true;
    
    // Сброс анимаций текущей панели
    resetAnimations(panels[currentIndex]);
    
    panels[currentIndex].classList.remove('active');
    dots[currentIndex].classList.remove('active');
    
    // Установка нового контента
    const panel = panels[index];
    const typingElement = panel.querySelector('.typing-text');
    const textElement = panel.querySelector('.text-content p');
    
    typingElement.textContent = panelTexts[index];
    typingElement.style.width = '0';
    textElement.textContent = panelDescriptions[index];
    
    panel.classList.add('active');
    dots[index].classList.add('active');
    
    currentIndex = index;
    
    setTimeout(() => {
      isAnimating = false;
    }, 3500); // Общее время всех анимаций
  }

  function resetAnimations(panel) {
    const elements = panel.querySelectorAll('.typing-text, .text-content, .slide-up-btn');
    elements.forEach(el => {
      el.style.animation = 'none';
      el.style.opacity = '0';
      if (el.classList.contains('typing-text')) {
        el.style.width = '0';
      }
      if (el.classList.contains('slide-up-btn')) {
        el.style.transform = 'translateY(50px)';
      }
      if (el.classList.contains('text-content')) {
        el.style.transform = 'translateY(20px)';
      }
      
      // Принудительный рефлоу
      void el.offsetWidth;
    });
  }

  // Инициализация первого блока
  const firstPanel = panels[0];
  const firstTyping = firstPanel.querySelector('.typing-text');
  const firstText = firstPanel.querySelector('.text-content p');
  
  firstTyping.textContent = panelTexts[0];
  firstTyping.style.width = '0';
  firstText.textContent = panelDescriptions[0];
});
