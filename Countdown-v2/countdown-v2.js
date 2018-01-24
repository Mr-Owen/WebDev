/* jshint esversion: 6 */
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
];

let runTime = (time, number) => {
  let part = time.querySelectorAll('.part'),
    current = parseInt(time.getAttribute('data-value'));
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
  time.setAttribute('data-value', number);
};

let trigger = function(event) {
  let hour = document.querySelector('#myHour').value,
    min = document.querySelector('#myMin').value,
    sec = document.querySelector('#mySec').value,
    last = parseInt(3600 * hour) + parseInt(60 * min) + parseInt(sec);
  if (isNaN(last)) {     // 化整数的第二计划
    last = Number(3600 * hour) + Number(60 * min) + Number(sec);
  }

  let _hour = document.querySelectorAll('.hour'),
    _min = document.querySelectorAll('.min'),
    _sec = document.querySelectorAll('.sec'),
    outputarea = document.querySelector('.outputarea');
  if (event.key == 'Enter') {
    outputarea.innerText = '';
    let countdown = (function() {
      if (hour || min || sec) {
        // Math.floor()方法、乘法、除法、取余数运算对空字符串返回0，故不强制填写 hour 和 min
        runTime(_hour[0], Math.floor(hour / 10));
        runTime(_hour[1], hour % 10);
        runTime(_min[0], Math.floor(min / 10));
        runTime(_min[1], min % 10);
        runTime(_sec[0], Math.floor(sec / 10));
        runTime(_sec[1], sec % 10);
        last -= 1;
        hour = Math.floor(last / 3600);
        min = Math.floor((last - hour * 3600) / 60);
        sec = last - 3600 * hour - 60 * min;
        setTimeout(arguments.callee, 1000);
        document.body.removeEventListener('keypress', trigger, false); // 屏蔽输入
      } else {
        runTime(_sec[1], sec % 10);
        document.body.addEventListener('keypress', trigger, false); // 恢复输入
        outputarea.innerText = 'Time\'s up !';
      }
    })();
  }
};
document.body.addEventListener('keypress', trigger, false);


// 总结:
// 1.取值document.querySelector('#myHour').value是字符串，在将他们转换为number类型之前不能相加
// 2.一般使用parseInt转换为数值，但parseInt('')等于NaN，Number()用于转换特殊值''，Number('')等于0
// 3.在函数表达式内不能调用自身,函数声明可在函数体内调用自身
// 4.在倒计时进行时移除事件监听器可屏蔽后续提交，倒计时结束后添加删除的监听器，恢复提交
