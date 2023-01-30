(function () {
  var clientWidth = document.documentElement ? document.documentElement.clientWidth : document.body.clientWidth;
  if (clientWidth > 750) clientWidth = 750;
  document.documentElement.style.fontSize = clientWidth * 1 / 7.5 + "px"; // 这里设置倍数
  return clientWidth * 1 / 3.75;
})();