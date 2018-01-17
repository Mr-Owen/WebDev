let num = [
  [0, 1, 2, 3, 4, 5], // 0
  [1, 2],
  [0, 1, 6, 4, 3],
  [0, 1, 6, 2, 3],
  [5, 6, 1, 2],
  [0, 5, 6, 2, 3],
  [0, 5, 4, 3, 2, 6],
  [0, 1, 2],
  [0, 1, 2, 3, 4, 5, 6],
  [0, 5, 6, 1, 2, 3]
];

let setTime = function(digit, nowTime) {
  let part = digit.querySelectorAll('.part');
  let current = parseInt(digit.getAttribute('data-value'));
  if (!isNaN(current) && current != nowTime) {
    num[current].forEach(function(num) {
      part[num].classList.remove('on');
    });
  }
  if (isNaN(current) || current != nowTime) {
    num[nowTime].forEach(function(num) {
      part[num].classList.add('on');
    });
  }
  digit.setAttribute('data-value', nowTime);
};

// trigger
let trigger = function(event) {
  let _hour = document.querySelectorAll('.hour');
  let _min = document.querySelectorAll('.min');
  let _sec = document.querySelectorAll('.sec');
  let now;
  setInterval(function() {
    now = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
    setTime(_hour[0], now[1]);
    setTime(_hour[1], now[2]);
    setTime(_min[0], now[3]);
    setTime(_min[1], now[4]);
    setTime(_sec[0], now[5]);
    setTime(_sec[1], now[6]);
  }, 1000);

};
window.addEventListener('load', trigger, false);
