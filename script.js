/* ============================================================
   Wedding Congratulations Page — Champagne Theme
   script.js
   ============================================================ */

/* ---------- Config ---------- */
const WEDDING_DATE = new Date('May 15, 2026 00:00:00').getTime();

const CONFETTI_COLORS = [
  '#c8a84b', '#d4b860', '#f5e0a0',
  '#ffffff', '#e8d08a', '#b8922e', '#f0c040'
];

const SPARKLE_SYMBOLS = ['✦', '✧', '⋆', '★', '✸', '✺'];

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
    /* Wedding has passed — show days married */
    const firstBox = countdownRow.querySelector('.count-box:first-child .count-label');
    if (firstBox) firstBox.textContent = 'Days Married';

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

/* Seed bubbles spread across the full height */
for (let i = 0; i < 28; i++) {
  bubbles.push({
    x:           Math.random() * window.innerWidth,
    y:           Math.random() * window.innerHeight + window.innerHeight,
    r:           3 + Math.random() * 7,
    speed:       0.3 + Math.random() * 0.7,
    opacity:     0.12 + Math.random() * 0.18,
    wobble:      Math.random() * Math.PI * 2,
    wobbleSpeed: 0.005 + Math.random() * 0.01
  });
}

function animateBubbles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  bubbles.forEach(b => {
    b.y      -= b.speed;
    b.wobble += b.wobbleSpeed;
    const x = b.x + Math.sin(b.wobble) * 18;

    /* Respawn at bottom when off-screen */
    if (b.y < -20) {
      b.y = canvas.height + 20;
      b.x = Math.random() * canvas.width;
    }

    /* Bubble outline */
    ctx.beginPath();
    ctx.arc(x, b.y, b.r, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(200,168,75,${b.opacity})`;
    ctx.lineWidth   = 1;
    ctx.stroke();

    /* Highlight glint */
    ctx.beginPath();
    ctx.arc(x - b.r * 0.3, b.y - b.r * 0.3, b.r * 0.2, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${b.opacity * 0.8})`;
    ctx.fill();
  });

  requestAnimationFrame(animateBubbles);
}

animateBubbles();

/* ============================================================
   CELEBRATE BUTTON — Confetti + Sparkles
   ============================================================ */
document.getElementById('celebrateBtn').addEventListener('click', function () {
  launchConfetti();
  launchSparkles();

  this.innerHTML = '🎉 Cheers!';
  setTimeout(() => { this.innerHTML = '🥂 &nbsp; Celebrate with Us'; }, 2500);
});

function launchConfetti() {
  const count = 90;

  for (let i = 0; i < count; i++) {
    setTimeout(() => {
      const el    = document.createElement('div');
      el.className = 'confetti-piece';

      const color = CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)];
      const dur   = (1.8 + Math.random() * 1.6).toFixed(2) + 's';
      const spin  = (Math.random() * 720 - 360).toFixed(0) + 'deg';
      const w     = 6  + Math.random() * 6;
      const h     = 6  + Math.random() * 8;
      const isPill = Math.random() > 0.5;

      el.style.cssText = [
        `left: ${10 + Math.random() * 80}vw`,
        `top: -10px`,
        `background: ${color}`,
        `--dur: ${dur}`,
        `--spin: ${spin}`,
        `border-radius: ${isPill ? '50%' : '2px'}`,
        `width: ${w}px`,
        `height: ${h}px`
      ].join('; ');

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3400);
    }, i * 18);
  }
}

function launchSparkles() {
  for (let i = 0; i < 16; i++) {
    setTimeout(() => {
      const el    = document.createElement('div');
      el.className = 'sparkle';
      el.textContent = SPARKLE_SYMBOLS[Math.floor(Math.random() * SPARKLE_SYMBOLS.length)];

      el.style.left  = (5 + Math.random() * 90) + 'vw';
      el.style.top   = (5 + Math.random() * 40) + 'vh';
      el.style.color = CONFETTI_COLORS[Math.floor(Math.random() * 3)];
      el.style.animationDuration = (2 + Math.random() * 1.5).toFixed(1) + 's';

      document.body.appendChild(el);
      setTimeout(() => el.remove(), 3000);
    }, i * 70);
  }
}

/* ============================================================
   MUSIC TOGGLE — Web Audio API (no external file needed)
   ============================================================ */

let muted = true;

const musicBtn = document.getElementById('musicToggle');
const audio = document.getElementById('bgMusic');

musicBtn.addEventListener('click', () => {
  muted = !muted;

  if (muted) {
    audio.pause();
    musicBtn.textContent = '🔇';
  } else {
    audio.volume = 0.2;
    audio.play();
    musicBtn.textContent = '🎵';
  }
});

