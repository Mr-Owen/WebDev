/* jslint esversion: 6 */
let num,
  valueButton = document.querySelector('.valueButton'),
  outputarea = document.querySelector('.outputarea');

// 回车触发确认输入
// 方案1.可使用表单的默认焦点回车提交事件
// 方案2，使用keyCode == 13或key == 'Enter'
// event submit
let runTime = (event) => {
  if (event.keyCode == '13') {
    let hou = document.querySelector('#hou').value,
      min = document.querySelector('#min').value,
      sec = document.querySelector('#sec').value,
      num = parseInt(3600 * hou,10) + parseInt(60 * min,10) + parseInt(sec,10);
      if(isNaN(num)){
        num = Number(3600 * hou)+Number(60*min)+Number(sec);
      }
    if (num) {
      // countdown
      let countdown = () => {
        if (num > 0) {
          hou = Math.floor(num / 3600);
          min = Math.floor((num - 3600 * hou) / 60);
          sec = num - 3600 * hou - 60 * min;
          outputarea.innerHTML = hou + '小时' + min + '分' + sec + '秒';
          setTimeout(countdown, 1000);
          num -= 1;
          document.body.removeEventListener('keypress', runTime, false); // 移除监听器，防止多次提交
        } else {
          document.body.addEventListener('keypress', runTime, false); // 恢复提交
          outputarea.innerHTML = hou + '小时' + min + '分' + sec + '秒' + '<br />' + 'Mission Completed';
        }
      };
      countdown(); // end countdown
    } else {
      outputarea.innerHTML = 'Oops!!There is nothing.';
    }
  }
};
document.body.addEventListener('keypress', runTime, false);

// 总结：
// 1.取得输入框的值必须在提交时取值，不能放在全局取值，否则一定为非用户输入值
// 2.若要将取值相加的话，在转换为number类型之前不要直接相加，'60'+'6'!='66'
