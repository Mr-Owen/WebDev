/* jslint esversion: 6 */
let userName = (event) => {
  let setInputName = document.getElementById("search-box").value;
  // real time simulator
  document.querySelector('.outputarea').innerText = setInputName.toString();
  // submit text value
  if (event.keyCode == 13) {
    if (!setInputName) {
      document.querySelector('.outputarea').innerText = 'Oops!!你什么也没有输入';
    } else {
      document.querySelector('.outputarea').innerText = '你输入的是：' + setInputName.toString();
    }
  }
};
document.body.addEventListener('keyup', userName, false);

// 实现效果：
// 1.实时显示输入字符
// 2.回车提交并显示输入的内容，若确认时无输入内容则提醒

// 总结：
// 1.keyup显示的是实时输入结果，无法过滤(阻止)输入
// 2.keydown和keypress显示的是上一步的结果，可用于过滤(阻止)输入
