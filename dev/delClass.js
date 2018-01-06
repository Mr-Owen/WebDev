// 元素和要删除的类名参数为字符串
function delClass(element, deleteClass) {
  var myEle = document.querySelector(element);
  var myClass = myEle.className.split(/\s+/);
  var i,
    len,
    num;

  for (i = 0, len = myClass.length; i < len; i++) {
    if (myClass[i] == deleteClass) {
      num = i;
      break;
    }
  }
  myClass.splice(i, 1);
  if (myClass.length != 0) {
    myEle.className = myClass.join(' ');
  } else {
    myEle.removeAttribute('class');
  }
  return myEle;
}
