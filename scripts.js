// Копирование IP
function copyIP() {
  navigator.clipboard.writeText("fox-smp.com").then(() => {
    alert('IP успешно скопирован!');
  }).catch(err => {
    console.error('Ошибка копирования:', err);
    alert("Не удалось скопировать IP");
  });
}

// Частицы (звёзды)
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");
let stars = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// Инициализация звезд
for (let i = 0; i < 150; i++) {
  stars.push({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    radius: Math.random() * 2 + 0.5,
    speed: Math.random() * 0.5 + 0.1,
    opacity: Math.random() * 0.5 + 0.3
  });
}

function drawStars() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let star of stars) {
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
    ctx.fill();
  }
}

function updateStars() {
  for (let star of stars) {
    star.y += star.speed;
    if (star.y > canvas.height) {
      star.y = 0;
      star.x = Math.random() * canvas.width;
    }
  }
}

function animate() {
  drawStars();
  updateStars();
  requestAnimationFrame(animate);
}

animate();

// Управление фоновой музыкой
document.addEventListener('DOMContentLoaded', function() {
  const audio = document.getElementById('background-music');
  const toggleButton = document.getElementById('music-toggle');
  const volumeSlider = document.getElementById('volume-slider');
  
  // Восстановление состояния из localStorage
  const savedVolume = localStorage.getItem('musicVolume');
  const isPlaying = localStorage.getItem('isMusicPlaying') === 'true';
  
  if (savedVolume !== null) {
    audio.volume = parseFloat(savedVolume);
    volumeSlider.value = savedVolume;
  } else {
    audio.volume = 0.15; // Базовая громкость 15%
    volumeSlider.value = 0.15;
  }
  
  if (isPlaying) {
    audio.play().catch(error => {
      console.log('Автовоспроизведение предотвращено. Нажмите play для запуска музыки.');
      toggleButton.textContent = '▶️';
    });
    toggleButton.textContent = '⏸️';
  }
  
  // Обработчик кнопки play/pause
  toggleButton.addEventListener('click', function() {
    if (audio.paused) {
      audio.play().then(() => {
        toggleButton.textContent = '⏸️';
        localStorage.setItem('isMusicPlaying', 'true');
      }).catch(error => {
        console.error("Воспроизведение не удалось. Возможно, нужно взаимодействие пользователя.");
      });
    } else {
      audio.pause();
      toggleButton.textContent = '▶️';
      localStorage.setItem('isMusicPlaying', 'false');
    }
  });
  
  // Обработчик изменения громкости
  volumeSlider.addEventListener('input', function() {
    audio.volume = volumeSlider.value;
    localStorage.setItem('musicVolume', volumeSlider.value);
  });
  
  // Попытка автоматического воспроизведения после взаимодействия с сайтом
  document.body.addEventListener('click', function firstInteraction() {
    if (localStorage.getItem('isMusicPlaying') === 'true' && audio.paused) {
      audio.play().then(() => {
        toggleButton.textContent = '⏸️';
      }).catch(error => {
        console.log('Автовоспроизведение после взаимодействия не удалось.');
      });
    }
    document.body.removeEventListener('click', firstInteraction);
  });
});