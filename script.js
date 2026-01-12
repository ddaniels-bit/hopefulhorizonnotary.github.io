(() => {
  const chuck = {
    "icon_url": "https://api.chucknorris.io/img/avatar/chuck-norris.png",
    "id": "aybvxdnmr82jc_jssvkegw",
    "url": "",
    "value": "When Chuck Norris throws exceptions, it's across the room."
  };

  const el = document.getElementById("chuck-norris");
  if (!el) return;

  el.innerHTML = `
    <img src="${chuck.icon_url}" alt="Chuck Norris">
    <div class="quote">${chuck.value}</div>
    <span class="label">Chuck Norris Fact</span>
  `;
})();
