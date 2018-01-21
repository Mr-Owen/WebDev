/* jshint esversion: 6 */
let outputarea = document.querySelector('.outputarea');
let leftin = document.querySelector('.leftin');
let leftout = document.querySelector('.leftout');
let rightin = document.querySelector('rightin');
let rightout = document.querySelector('rightout');

// insertBefore
let setValue = (event) => {
  let getValue = parseInt(document.querySelector('#textarea').value);
  //test value
  if (!getValue) {
    alert('只限数字');
  } else {
    if (event.target.className == 'leftin') {
      let insertNode = document.createElement('a');
      insertNode.innerText = getValue;
      outputarea.insertBefore(insertNode, outputarea.childNodes[0]);
    }
    if (event.target.className == 'rightin') {
      let insertNode = document.createElement('a');
      insertNode.innerText = getValue;
      outputarea.appendChild(insertNode);
    }
  }
};
document.querySelector('.getbutton').addEventListener('click', setValue, false);

// delete
let deleteValue = (event) => {
  if (event.target.tagName == 'A') {
    let num = event.target.parentNode.removeChild(event.target); // 点击删除
    alert(num.innerText); // 删除后弹窗显示删除的文本内容
  }
  if (event.target.className == 'leftout') {
    outputarea.removeChild(outputarea.firstChild);
  }
  if (event.target.className == 'rightout') {
    outputarea.removeChild(outputarea.lastChild);
  }
};
document.querySelector('.getbutton').addEventListener('click', deleteValue, false);
document.querySelector('.outputarea').addEventListener('click', deleteValue, false); // 点击删除

// 总结：
// 1.队列的每个元素是一个数字(用number表单控件或自己过滤)，初始队列为空
// 2.点击 "左/右侧插入"，将 input 中输入的数字从左/右侧插入队列中
// 3.点击 "左/右侧删除"，读取并删除队列左/右侧第一个元素，并弹窗显示元素中数值
// 4.点击队列中任何一个元素，则该元素会被从队列中删除
//  4.1 event.target.parentNode.removeChild(event.target) 删除自身元素
