(() => {
  console.log("✅ script.js loaded");

  const el = document.getElementById("chuck-norris");
  if (!el) {
    console.error("❌ #chuck-norris not found in DOM");
    return;
  }
  console.log("✅ #chuck-norris found");

  // Force visibility even if CSS isn't loading
  el.style.position = "fixed";
  el.style.bottom = "20px";
  el.style.right = "20px";
  el.style.zIndex = "999999";
  el.style.background = "rgba(0,0,0,.85)";
  el.style.color = "#fff";
  el.style.padding = "16px 18px";
  el.style.borderRadius = "16px";
  el.style.maxWidth = "320px";
  el.style.boxShadow = "0 15px 40px rgba(0,0,0,.6)";
  el.style.fontFamily = "system-ui, -apple-system, Segoe UI, sans-serif";
  el.style.border = "2px solid #ffcc00"; // makes it obvious

  const chuck = {
    icon_url: "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    id: "aybvxdnmr82jc_jssvkegw",
    url: "",
    value: "When Chuck Norris throws exceptions, it's across the room."
  };

  el.innerHTML = `
    <div style="display:flex; gap:12px; align-items:flex-start;">
      <img src="${chuck.icon_url}" alt="Chuck Norris"
           style="width:48px;height:48px;border-radius:50%;border:2px solid #ffcc00;flex:0 0 auto;"
           onerror="this.style.display='none'">
      <div>
        <div style="font-size:14px;line-height:1.4;">${chuck.value}</div>
        <div style="font-size:11px;opacity:.7;margin-top:8px;">Chuck Norris Fact</div>
      </div>
    </div>
  `;

  console.log("✅ Chuck widget rendered");
})();
