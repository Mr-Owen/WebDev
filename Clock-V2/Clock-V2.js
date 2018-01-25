/* jshint esversion: 6 */
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

let setTime = (digit, nowTime) => {
  let part = digit.querySelectorAll('.part'),
    current = parseInt(digit.getAttribute('data-value'));
  if (!isNaN(current) && current != nowTime) {
    num[current].forEach((num) => {
      part[num].classList.remove('on');
    });
  }
  if (isNaN(current) || current != nowTime) {
    num[nowTime].forEach((num, index) => {
      part[num].classList.add('on');
    });
  }
  digit.setAttribute('data-value', nowTime);
};

// trigger
let trigger = (event) => {
  let _hour = document.querySelectorAll('.hour'),
    _min = document.querySelectorAll('.min'),
    _sec = document.querySelectorAll('.sec');
  setInterval(() => {
    let now = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
    setTime(_hour[0], now[1]);
    setTime(_hour[1], now[2]);
    setTime(_min[0], now[3]);
    setTime(_min[1], now[4]);
    setTime(_sec[0], now[5]);
    setTime(_sec[1], now[6]);
    if (now[6] % 2 != 0) {
      [0, 1, 2, 3].forEach((number) => {
        document.querySelectorAll('.point')[number].classList.remove('on');
      });
    } else {
      [0, 1, 2, 3].forEach((number) => {
        document.querySelectorAll('.point')[number].classList.add('on');
      });
    }
  }, 1000);

};
window.addEventListener('load', trigger, false);

// 思路：
// 关键点：每个数字由七个区域显示
// 1.建立显示数组
// 2.设置显示方式
//  2.1当存在显示的数（即data-value）且与实际要显示的数不同时，去掉小显示区域的opacity:1(即on类)，恢复原状。
//  2.2当不存在显示的数（初始化）或显示的数值与要显示的数值不同时，给小区域添加on类,并设置data-value，以方便后续判断
// 3.触发load事件时触发时钟循环函数
//  3.1取得各个数字的显示区域
//  3.2取得现在的时间的各个位上的数字
//  3.3将取得的显示区域和要显示的数字带入2中函数，一直循环下去
