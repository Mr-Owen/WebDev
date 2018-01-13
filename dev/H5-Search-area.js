var list = document.querySelector('.list');
var inputArea = document.querySelector('#search');

// =============================事件监听器构建函数============================
UnitE = {
  addE: function(element, type, fn) {
    element.addEventListener(type, fn, false);
  }
};

// =================================事件委托================================
function clickStatus(event) {
  switch (event.target.className) {
    case 'Alibaba':
      location.href = 'http://tmall.com';
      break;
    case 'Baidu':
      location.href = 'http://baidu.com';
      break;
    case 'Tencent':
      location.href = 'http://qq.com';
      break;
    case 'Huawei':
      location.href = 'http://huawei.com';
      break;

  }
}
UnitE.addE(list, 'click', clickStatus);

// ==================================菜单显示================================
function getList(event) {
  list.style.visibility = 'visible'; //值为字符串
}

function outList(event) {
  setTimeout(function() {
    list.style.visibility = 'hidden';
  },100);
}
UnitE.addE(inputArea, 'focusin', getList);
UnitE.addE(inputArea, 'focusout', outList);
// 此处发现focusout事件和click事件冲突（事件委托处），导致click事件失效
// 只要设置focusout事件延迟执行，就可解决冲突，但有略微延迟感（只治标）

// 总结：
// 1.给输入框添加两个事件处理程序，分别是获得焦点时展开菜单、失去焦点时隐藏菜单
// 2.focusin事件和focusout事件均可冒泡，focus和blur不冒泡
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
UnitE.addE(inputArea, 'keyup', getKey);
// 总结：
// 1.侧重兼容性用event.keyCode，侧重标准化用event.key
// 2.DOM3不提倡使用keypress事件
// 2.使用keypress事件和textInput事件的差异：
// 2.1keypress：在按下能够插入或删除字符的键（包括回车、退格键）都会触发该事件。
// 2.2textInput：只有用户按下能够输入实际字符的键时才触发（不包括回车、退格键）

// ===============================beforeunload事件==========================
function beforeunload(event) {
  var text = 'Are you sure ?';
  event.returnValue = text;
  return text;
}
UnitE.addE(window, 'beforeunload', beforeunload);
// 总结：
// beforeunload事件：在浏览器卸载页面之前触发
// beforeunload事件的对象必须是window对象
