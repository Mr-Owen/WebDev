/* jshint esversion: 6 */
let app = (function() {
  let num = [
      [0, 1, 2, 3, 4, 5],
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
    $ = document.querySelectorAll.bind(document),
    hour = 0,
    min = 0,
    sec = 0,
    sum_sec = 0,
    interval_code = 0,
    _body = document.body,
    _hour = $('.hour'),
    _min = $('.min'),
    _sec = $('.sec'),
    _outputarea = $('.outputarea')[0],
    _point = $('.point'),
    _time = [_hour[0], _hour[1], _min[0], _min[1], _sec[0], _sec[1]],
    floor = Math.floor;

  return {
    setTime: function(number) {
      let part = this.querySelectorAll('.part'),
        current = parseInt(this.getAttribute('data-value'));
      if (!isNaN(current) && current != number) {
        num[current].forEach(function(arr) {
          part[arr].classList.remove('on');
        });
      }
      if (isNaN(current) || current != number) {
        num[number].forEach(function(arr) {
          part[arr].classList.add('on');
        });
      }
      this.setAttribute('data-value', number);
    },

    countdown: function() {
      // Math.floor()方法、乘法、除法、取余数运算对空字符串返回0，故不强制填写 hour 和 min
      let now = [floor(hour / 10), hour % 10, floor(min / 10), min % 10, floor(sec / 10), sec % 10, ];
      if (hour || min || sec) {
        for (let i = 0, len = now.length; i < len; i++) {
          app.setTime.call(_time[i], now[i]);
        }
        sum_sec -= 1;
        hour = floor(sum_sec / 3600);
        min = floor((sum_sec - hour * 3600) / 60);
        sec = sum_sec - 3600 * hour - 60 * min;
      } else {
        app.setTime.call(_sec[1], sec % 10);
        _body.addEventListener('keypress', app.trigger, false); // 恢复输入
        _outputarea.innerText = 'Time\'s up !';
        clearInterval(interval_code);
        interval_code = 0;
      }

      if ((sec % 10) & 1) {
        [0, 1].forEach((number) => {
          _point[number].classList.add('on');
        });
      } else {
        [0, 1].forEach((number) => {
          _point[number].classList.remove('on');
        });
      }
    },

    trigger: function(evt) {

      let countdown = app.countdown;
      hour = $('#myHour')[0].value;
      min = $('#myMin')[0].value;
      sec = $('#mySec')[0].value;

      if (!/\d/.test(String.fromCharCode(evt.keyCode)) && evt.keyCode > 13) {
        evt.preventDefault();
      }

      sum_sec = parseInt(3600 * hour) + parseInt(60 * min) + parseInt(sec);
      if (isNaN(sum_sec)) { // 化整数的第二计划
        sum_sec = Number(3600 * hour) + Number(60 * min) + Number(sec);
      }
      if (evt.key == 'Enter' && !interval_code) {
        _body.removeEventListener('keypress', app.trigger, false); // 屏蔽输入
        _outputarea.innerText = '';
        app.countdown();
        interval_code = setInterval(countdown, 1000);
      }
    }

  };
})();
document.body.addEventListener('keypress', app.trigger, false);

// 总结:
// 1.取值document.querySelector('#myHour').value是字符串，在将他们转换为number类型之前不要相加，字符串相加和number类型相加是有区别的
// 2.一般使用parseInt转换为数值，但parseInt('')等于NaN，Number()用于转换特殊值''，Number('')等于0
// 3.在函数表达式内不能调用自身,函数声明可在函数体内调用自身
// 4.在倒计时进行时移除事件监听器可屏蔽后续提交，倒计时结束后添加删除的监听器，恢复提交
