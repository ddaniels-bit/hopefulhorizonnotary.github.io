// script.js
const layer = document.getElementById("workers");
const emojis = ["👷", "🦺", "🔧", "🧰", "🚧", "⚙️"];
const jokes = [
  "Installing more pixels…",
  "Tightening the internet…",
  "Calibrating the vibes…",
  "Downloading coffee…",
  "Turning it off and on…",
  "Sweeping loose bugs… 🐛",
  "Adding extra sparkle ✨",
];

const workers = [];
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

function spawn(x, y) {
  const el = document.createElement("div");
  el.className = "worker";
  el.textContent = emojis[Math.floor(Math.random() * emojis.length)];

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = jokes[Math.floor(Math.random() * jokes.length)];
  el.appendChild(bubble);

  layer.appendChild(el);

  const w = {
    el,
    x,
    y,
    vx: (Math.random() * 2 - 1) * 2.4,
    vy: (Math.random() * 2 - 1) * 2.2,
    spin: (Math.random() * 2 - 1) * 0.06,
    rot: Math.random() * Math.PI,
    life: 0,
    ttl: 1400 + Math.random() * 1600,
  };

  workers.push(w);

  // fade bubble out after a moment
  setTimeout(() => {
    if (bubble) bubble.style.opacity = "0";
  }, 1100);

  return w;
}

function tick() {
  const W = window.innerWidth;
  const H = window.innerHeight;

  for (let i = workers.length - 1; i >= 0; i--) {
    const w = workers[i];
    w.life += 16;

    // gravity-ish + gentle wobble
    w.vy += 0.03;
    w.vx += Math.sin((w.life / 200) + i) * 0.005;

    w.x += w.vx;
    w.y += w.vy;
    w.rot += w.spin;

    // bounce off edges
    if (w.x < 10 || w.x > W - 10) w.vx *= -0.98;
    if (w.y < 10 || w.y > H - 10) w.vy *= -0.98;

    w.x = clamp(w.x, 10, W - 10);
    w.y = clamp(w.y, 10, H - 10);

    w.el.style.transform = `translate(${w.x}px, ${w.y}px) rotate(${w.rot}rad)`;

    // remove after TTL
    if (w.life > w.ttl) {
      w.el.remove();
      workers.splice(i, 1);
    }
  }

  requestAnimationFrame(tick);
}

// initial sprinkle
for (let i = 0; i < 10; i++) {
  spawn(Math.random() * window.innerWidth, Math.random() * window.innerHeight);
}

document.addEventListener("click", (e) => {
  for (let i = 0; i < 6; i++) spawn(e.clientX + (Math.random()*40-20), e.clientY + (Math.random()*40-20));
});

tick();
