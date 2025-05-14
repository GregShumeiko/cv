/* Основные стили */
.panel-content {
  position: relative;
  width: 80%;
  max-width: 800px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: 100%;
  padding-top: 15vh; /* Заголовок в первой трети */
  box-sizing: border-box;
}

.typing-text {
  font-size: 3rem;
  margin-bottom: 2rem;
  min-height: 4rem;
  border-right: 3px solid white;
  white-space: nowrap;
  overflow: hidden;
  opacity: 0;
}

.text-content {
  opacity: 0;
  transform: translateY(20px);
  width: 100%;
  margin: 2rem 0;
}

.text-content p {
  text-align: left;
  font-size: 1.2rem;
  line-height: 1.8;
  max-width: 100%;
}

.slide-up-btn {
  position: absolute;
  bottom: 20vh; /* Кнопка в нижней трети */
  left: 0;
  opacity: 0;
  transform: translateY(50px);
}

/* Анимации */
@keyframes blink-caret {
  from, to { border-color: transparent }
  50% { border-color: white; }
}

@keyframes typing {
  0% { width: 0; opacity: 1; }
  99% { border-right-color: white; }
  100% { width: 100%; border-right-color: transparent; }
}

@keyframes fade-in {
  to { opacity: 1; transform: translateY(0); }
}

@keyframes slide-up {
  to { opacity: 1; transform: translateY(0); }
}

/* Анимация появления для активного блока */
.panel.active .typing-text {
  animation: typing 2s ease forwards, blink-caret 0.75s step-end infinite;
}

.panel.active .text-content {
  animation: fade-in 1s ease 2s forwards; /* Начинается после печати */
}

.panel.active .slide-up-btn {
  animation: slide-up 1s ease 3s forwards; /* Начинается после текста */
}
