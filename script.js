/* ============================================================
   Wedding Congratulations — script.js (upgraded)
   ============================================================ */

/* ---------- Config ---------- */
const WEDDING_DATE = new Date('May 15, 2026 00:00:00').getTime();

const CONFETTI_COLORS = [
  '#c8a84b', '#d4b860', '#f5e0a0',
  '#ffffff', '#e8d08a', '#b8922e', '#f0c040',
  '#ffe5a0', '#ffd700'
];

const SPARKLE_SYMBOLS = ['✦', '✧', '⋆', '★', '✸', '✺', '✼', '❋', '⚘'];

/* ============================================================
   GOLD DUST PARTICLES
   ============================================================ */
(function spawnGoldDust() {
  const container = document.getElementById('goldDust');
  const count = 28;

  for (let i = 0; i < count; i++) {
    const p = document.createElement('div');
    p.className = 'dust-particle';

    const size  = 1.5 + Math.random() * 3;
    const delay = (Math.random() * 10).toFixed(2) + 's';
    const dur   = (6 + Math.random() * 8).toFixed(2) + 's';

    p.style.cssText = [
      `width: ${size}px`,
      `height: ${size}px`,
      `left: ${Math.random() * 100}vw`,
      `top: ${Math.random() * 100}vh`,
      `--dur: ${dur}`,
      `--delay: ${delay}`,
      `animation-delay: ${delay}`,
      `animation-duration: ${dur}`
    ].join('; ');

    container.appendChild(p);
  }
})();

/* ============================================================
   COUNTDOWN TIMER
   ============================================================ */
const cdDays  = document.getElementById('cd-d');
const cdHours = document.getElementById('cd-h');
const cdMins  = document.getElementById('cd-m');
const cdSecs  = document.getElementById('cd-s');
const countdownRow = document.getElementById('countdownRow');

function updateCountdown() {
  const now  = Date.now();
  const diff = WEDDING_DATE - now;

  if (diff <= 0) {
    const firstBox = countdownRow.querySelector('.count-box:first-child .count-label');
    if (firstBox && firstBox.textContent !== 'Days Married') {
      firstBox.textContent = 'Days Married';
    }

    const elapsed = Math.abs(diff);
    cdDays.textContent  = Math.floor(elapsed / 86400000);
    cdHours.textContent = Math.floor((elapsed % 86400000) / 3600000);
    cdMins.textContent  = Math.floor((elapsed % 3600000) / 60000);
    cdSecs.textContent  = Math.floor((elapsed % 60000) / 1000);
  } else {
    cdDays.textContent  = Math.floor(diff / 86400000);
    cdHours.textContent = Math.floor((diff % 86400000) / 3600000);
    cdMins.textContent  = Math.floor((diff % 3600000) / 60000);
    cdSecs.textContent  = Math.floor((diff % 60000) / 1000);
  }
}

updateCountdown();
setInterval(updateCountdown, 1000);

/* ============================================================
   FLOATING BUBBLES (Canvas)
   ============================================================ */
const canvas = document.getElementById('bubblesCanvas');
const ctx    = canvas.getContext('2d');
let bubbles  = [];

function resizeCanvas() {
  canvas.width  = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

for (let i = 0; i < 32; i++) {
  bubbles.push({
    x:           Math.random() * window.innerWidth,
    y:           Math.random() * window.innerHeight + window.innerHeight,
    r:           2.5 + Math.random() * 8,
    speed:       0.25 + Math.random() * 0.65,
    opacity:     0.1 + Math.random() * 0.2,
    wobble:      Math.random() * Math.PI * 2,
    wobbleSpeed: 0.005 + Math.random() * 0.01
  });
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach(b => {
    b.y      -= b.speed;
    b.wobble += b.wobbleSpeed;
    const x = b.x + Math.sin(b.wobble) * 20;

    if (b.y < -20) {
      b.y = canvas.height + 20;
      b.x = Math.random() * canvas.width;
    }

    ctx.beginPath();
    ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200,168,75,${b.opacity})`;
    ctx.lineWidth   = 1;
    ctx.stroke();

    /* Highlight glint */
    ctx.beginPath();
    ctx.arc(x - b.r * 0.32, b.y - b.r * 0.32, b.r * 0.22, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.9})`;
    ctx.fill();
  });

  requestAnimationFrame(animateBubbles);
}

animateBubbles();

/* ============================================================
   CELEBRATE BUTTON
   ============================================================ */
document.getElementById('celebrateBtn').addEventListener('click', function () {
  launchConfetti();
  launchSparkles();

  this.innerHTML = '🎉 &nbsp; Cheers to the Couple!';
  setTimeout(() => { this.innerHTML = '🥂 &nbsp; Celebrate with Us'; }, 3000);
});

function launchConfetti() {
  const count = 120;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el    = document.createElement('div');
      el.className = 'confetti-piece';

      const color  = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const dur    = (1.8 + Math.random() * 1.8).toFixed(2) + 's';
      const spin   = (Math.random() * 720 - 360).toFixed(0) + 'deg';
      const w      = 5  + Math.random() * 8;
      const h      = 5  + Math.random() * 10;
      const isPill = Math.random() > 0.5;

      el.style.cssText = [
        `left: ${5 + Math.random() * 90}vw`,
        `top: -12px`,
        `background: ${color}`,
        `--dur: ${dur}`,
        `--spin: ${spin}`,
        `border-radius: ${isPill ? '50%' : '2px'}`,
        `width: ${w}px`,
        `height: ${h}px`,
        `opacity: 0.9`
      ].join('; ');

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3600);
    }, i * 15);
  }
}

function launchSparkles() {
  for (let i = 0; i < 22; i++) {
    setTimeout(() => {
      const el    = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = SPARKLE_SYMBOLS[Math.floor(Math.random() * SPARKLE_SYMBOLS.length)];

      el.style.left  = (3 + Math.random() * 94) + 'vw';
      el.style.top   = (3 + Math.random() * 50) + 'vh';
      el.style.color = CONFETTI_COLORS[Math.floor(Math.random() * 4)];
      el.style.fontSize = (12 + Math.random() * 14) + 'px';
      el.style.animationDuration = (2 + Math.random() * 1.8).toFixed(1) + 's';

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3200);
    }, i * 60);
  }
}

/* ============================================================
   MUSIC TOGGLE
   ============================================================ */
let muted   = true;
const musicBtn = document.getElementById('musicToggle');
const audio    = document.getElementById('bgMusic');

musicBtn.addEventListener('click', () => {
  muted = !muted;

  if (muted) {
    audio.pause();
    musicBtn.textContent = '🔇';
  } else {
    audio.volume = 0.2;
    audio.play().catch(() => {});
    musicBtn.textContent = '🎵';
  }
});