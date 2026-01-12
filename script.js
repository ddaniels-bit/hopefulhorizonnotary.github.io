(() => {
  const host = document.getElementById("construction-worker");
  if (!host) return;

  host.innerHTML = `
    <div class="w">
      <div class="hat"></div>
      <div class="head"></div>
      <div class="body"></div>
      <div class="arm l"></div>
      <div class="arm r"></div>
      <div class="leg l"></div>
      <div class="leg r"></div>
      <div class="hammer"></div>
    </div>
  `;

  const legL = host.querySelector(".leg.l");
  const legR = host.querySelector(".leg.r");
  const armR = host.querySelector(".arm.r");
  const hammer = host.querySelector(".hammer");

  let x = -90;
  let dir = 1; // 1 = right, -1 = left
  let t = 0;

  // “work zones” where he stops to hammer
  const stops = [0.25, 0.55, 0.8].map(p => Math.floor(p * window.innerWidth));
  let stopIndex = 0;
  let hammering = false;
  let hammerCount = 0;

  function step() {
    t += 0.08;

    const speed = hammering ? 0 : 1.6;
    x += dir * speed;

    // Flip when going left
    host.style.transform = `translateX(${x}px) scaleX(${dir})`;

    // Legs swing when walking
    const swing = Math.sin(t) * 18;
    legL.style.transform = `rotate(${swing}deg)`;
    legR.style.transform = `rotate(${-swing}deg)`;

    // Hammer animation when stopped
    if (hammering) {
      const hit = Math.sin(t * 4) * 55; // faster
      armR.style.transform = `rotate(${-25 - Math.max(0, hit)}deg)`;
      hammer.style.transform = `rotate(${-20 - Math.max(0, hit)}deg)`;

      // count “hits” near the peak
      if (Math.cos(t * 4) > 0.98) {
        hammerCount++;
        // tiny “spark”
        spark(host, 58, 50);
      }
      if (hammerCount > 18) {
        hammering = false;
        hammerCount = 0;
        stopIndex++;
      }
    } else {
      armR.style.transform = `rotate(-20deg)`;
      hammer.style.transform = `rotate(-20deg)`;
    }

    // boundary wrap + reverse
    const maxX = window.innerWidth + 90;
    if (x > maxX) { dir = -1; x = maxX; stopIndex = 0; }
    if (x < -90)  { dir =  1; x = -90; stopIndex = 0; }

    // stop logic (only when moving right)
    if (!hammering && dir === 1 && stopIndex < stops.length) {
      if (x >= stops[stopIndex]) hammering = true;
    }

    requestAnimationFrame(step);
  }

  function spark(root, px, py) {
    const s = document.createElement("div");
    s.style.position = "absolute";
    s.style.left = px + "px";
    s.style.top = py + "px";
    s.style.width = "6px";
    s.style.height = "6px";
    s.style.borderRadius = "50%";
    s.style.background = "gold";
    s.style.opacity = "0.9";
    s.style.pointerEvents = "none";
    s.style.transform = "scale(1)";
    root.appendChild(s);

    const dx = (Math.random() * 24 - 12);
    const dy = -(Math.random() * 18 + 6);

    let a = 1, i = 0;
    (function anim(){
      i++;
      a *= 0.92;
      s.style.opacity = a.toFixed(2);
      s.style.transform = `translate(${dx*i/14}px, ${dy*i/14}px) scale(${1 - i/30})`;
      if (i < 30) requestAnimationFrame(anim);
      else s.remove();
    })();
  }

  step();
})();

