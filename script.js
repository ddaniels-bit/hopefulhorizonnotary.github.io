(() => {
  const host = document.getElementById("construction-worker");
  if (!host) return;

  host.innerHTML = `
    <div class="jg">
      <div class="hat"></div>
      <div class="head"></div>
      <div class="body"></div>

      <div class="arm left"></div>
      <div class="arm right"></div>

      <div class="legs"></div>

      <div class="jackhammer"></div>
      <div class="dust"></div>
    </div>
  `;

  const leftArm = host.querySelector(".arm.left");
  const rightArm = host.querySelector(".arm.right");
  const hammer = host.querySelector(".jackhammer");
  const dust = host.querySelector(".dust");

  let t = 0;

  function loop() {
    t += 0.18;

    // vibration + hits
    const vib = Math.sin(t * 10) * 2.2;
    const hit = Math.max(0, Math.sin(t * 8)) * 28; // only downward “hits”
    const arm = Math.sin(t * 8) * 18;

    // arms pump
    leftArm.style.transform = `rotate(${10 + arm}deg)`;
    rightArm.style.transform = `rotate(${-22 - arm}deg)`;

    // jackhammer rattles + moves down on "hit"
    hammer.style.transform = `translateY(${vib + hi
