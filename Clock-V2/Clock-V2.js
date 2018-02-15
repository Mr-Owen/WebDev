/* jshint esversion: 6 */
let app = (function() {
  const $ = document.querySelectorAll.bind(document),
    num = [
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
    ],
    _hour = $('.hour'),
    _min = $('.min'),
    _sec = $('.sec'),
    time = [_hour[0], _hour[1], _min[0], _min[1], _sec[0], _sec[1]];
  let ticking;

  return {

    setTime: function(nowTime) {

      let part = this.querySelectorAll('.part'),
        current = parseInt(this.getAttribute('data-value'));
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
      this.setAttribute('data-value', nowTime);
    },

    // ES6 Generation函数具有惰性求值（有暂停态）的特点，在语义上更适合此处“闪烁圆点”
    tickingPoint: function* () {
      const point = $('.point');
      while (true) {
        for (let item of point) {
          item.classList.add('on');
        }
        yield;

        for (let item of point) {
          item.classList.remove('on');
        }
        yield;
      }
    },

    runTime: function() {

      let now = /(\d)(\d):(\d)(\d):(\d)(\d)/.exec(new Date());
      [0, 1, 2, 3, 4, 5].forEach((i) => {
        app.setTime.call(time[i], now[i + 1]);
      });

      if (!ticking) {
        // 每次更新时，ticking变量是不能更新的，否则永远到不了第二个yield
        ticking = app.tickingPoint();
      }
      ticking.next();

      // 方法二：闪烁圆点
      // 原理：位运算符速度快于普通数学运算符，这里判断奇偶数最低位是1或0
      // if (now[6] % 2 != 0) {
      //   [0, 1, 2, 3].forEach((number) => {
      //     $('.point')[number].classList.remove('on');
      //   });
      // } else {
      //   [0, 1, 2, 3].forEach((number) => {
      //     $('.point')[number].classList.add('on');
      //   });
      // }
    },

    // trigger
    trigger: function(evt) {

      const runTime = app.runTime; // 减少属性访问
      return new Promise((resolve, reject) => {
          resolve();
        })
        // Promise 类型用于解决“回调地狱”，此处后可使用then方法，用于未来补充回调函数
        .then(runTime)  // 填补循环计时开始时的1秒空白
        .then((evt) => setInterval(runTime, 1000))
        .catch((err) => {
          console.log('Oops!Something wrong!Plese check your function trigger!');
        });
    }

  };
})();
window.addEventListener('load', app.trigger, false);

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
