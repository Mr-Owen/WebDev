var list = document.querySelector('.list');
var inputArea = document.querySelector('#search');

// ==================================菜单显示================================
function getList(event) {
  list.style.visibility = 'visible'; //值为字符串
}

function outList(event) {
  list.style.visibility = 'hidden';
}
inputArea.addEventListener('focusin', getList, false);
inputArea.addEventListener('focusout', outList, false);
// 总结：
// 1.给输入框添加两个事件处理程序，分别是获得焦点时展开菜单、失去焦点时获得菜单
// 2.focusin事件和focusout事件均可冒泡
// 为了性能及后期维护，冒泡可使用事件委托(此处没有使用事件委托)

// ==================================回车输入================================
function getKey(event) {
  var inputValue = inputArea.value; //值为字符串
  if (event.key == 'Enter') { //注意'Enter'大小写
    if (inputValue != '') {
      alert('你输入的是：' + inputValue);
    } else {
      alert('输入内容为空，请输入正确内容');
    }
  }
}
inputArea.addEventListener('keypress', getKey, false);
// 总结：
// 1.用key或char代替keyCode和charCode
// 2.使用keypress事件和textInput事件的差异：
// 2.1keypress：在按下能够插入或删除字符的键（包括回车、退格键）都会触发该事件。
// 2.2textInput：只有用户按下能够输入实际字符的键时才触发（不包括回车、退格键）

// ===============================beforeunload事件==========================
function beforeunload(event) {
  var text = 'Are you sure ?';
  event.returnValue = text;
  return text;
}
window.addEventListener('beforeunload', beforeunload, false);
// 总结：
// beforeunload事件：在浏览器卸载页面之前触发
// beforeunload事件的对象必须是window对象
