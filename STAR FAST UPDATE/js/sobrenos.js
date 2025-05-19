let currentIndex = 0;
let autoSlideInterval;

function moveSlide(direction) {
  const slides = document.querySelector('.carrossel');
  const totalSlides = document.querySelectorAll('.card').length;

  currentIndex += direction;

  if (currentIndex < 0) {
    currentIndex = totalSlides - 1;
  } else if (currentIndex >= totalSlides) {
    currentIndex = 0;
  }

  const offset = -currentIndex * 300; // Ajuste conforme a largura do card
  slides.style.transform = `translateX(${offset}px)`;
}

// Função para iniciar o movimento automático
function startAutoSlide() {
  autoSlideInterval = setInterval(() => {
    moveSlide(1);
  }, 3000); // Troca de imagem a cada 3 segundos
}

// Função para parar o movimento automático
function stopAutoSlide() {
  clearInterval(autoSlideInterval);
}

// Pausar ao passar o cursor sobre um card
const cards = document.querySelectorAll('.card');
cards.forEach(card => {
  card.addEventListener('mouseenter', stopAutoSlide); // Para ao passar o mouse
  card.addEventListener('mouseleave', startAutoSlide); // Reinicia ao sair do card
});

// Inicia o carrossel automaticamente
startAutoSlide();
