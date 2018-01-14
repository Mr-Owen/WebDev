var form = document.querySelector('.form');
var text = document.querySelector('#textname');
var pass = document.querySelector('#textpass');
var pass1 = document.querySelector('#textpass1');
var textarea = document.querySelector('#comment-area');
var submit = document.querySelector('.button-s');
var sq1 = document.querySelector('select.sq1');
var sq2 = document.querySelector('select.sq2');
var button = document.querySelector('.button-s');

//building function

UnitEvent = {
  addHandler: function(element, type, fn) {
    element.addEventListener(type, fn, false);
  },
  removerHandler: function(element, type, fn) {
    element.removerListener(type, fn, false);
  }
};

//Event focusin and focusout

function getFocus(event) {
  switch (event.target.style.backgroundColor) {
    case '':
      event.target.style.backgroundColor = 'whitesmoke'; //此处使用#f3f3f3失效
      break;
    case 'whitesmoke':
      event.target.style.backgroundColor = '';
      break;
  }
}

function testPass(event) {
  if (pass.value != pass1.value) {
    // 最后submit事件验证不通过则阻止提交
    event.preventDefault();
    // innerText由浅入深的顺序包含操作元素的所有文本内容
    // 此处亦可使用innerHTML属性
    document.querySelector('span.warn').innerText = '两次密码输入不一致';
  } else {
    document.querySelector('span.warn').innerText = '';
  }
}
UnitEvent.addHandler(form, 'focusin', getFocus);
UnitEvent.addHandler(form, 'focusout', getFocus);
UnitEvent.addHandler(pass1, 'focusout', testPass);

//Event keypress or keydown in text

function inputNum(event) {
  if (event.target.value.length == event.target.maxLength) {
    //达到相应字符数自动转移焦点
    for (var i = 0; len = form.elements.length, i < len; i++) {
      if (form.elements[i] == event.target && form.elements[i + 1]) {
        form.elements[i + 1].focus();
      }
    }
  }
  if (!/\d/.test(String.fromCharCode(event.keyCode)) && event.keyCode != 13) {
    event.preventDefault();
    alert('Only support number');
  }
}
//此事件代码暂未支持firefox
// 设置监听keyup事件时无法阻止错误的输出，只能设置keypress或者keydown
// keypress在chrome中会忽略退格键；keypress的小键盘和字母区数字码一样，keydown和keyup他们的则不同
UnitEvent.addHandler(document.querySelector('.your-card'), 'keypress', inputNum);

// Event select

function Selected(event) {
  event.target.setSelectionRange(0, textarea.value.length);
  // or
  // evnet.target.selectionStart = 0;
  // event.target.selectionEnd = textarea.value.length;
  // or
  // event.target.select();
}
UnitEvent.addHandler(textarea, 'focusin', Selected);

// Event change
// 并不阻挡用户输入过多密码，等到失去焦点时提醒用户字符数超过限定值
function change(event) {
  if (pass.value.length > 6) {
    alert('Only support 6 number');
  }
}
UnitEvent.addHandler(pass, 'change', change);

//Event submit

UnitEvent.addHandler(form, 'submit', testPass);

// Event click

// 表单序列化
function getAll(form) {
  var output = [];
  for (var i = 0; len = form.elements.length, i < len; i++) {
    var field = form.elements[i];
    switch (field.type) {
      case 'select-one':
      case 'select-multiple':
        if (field.name.length) {
          for (var j = 0; optLen = field.options.length, j < optLen; j++) {
            if (field.options[j].selected) {
              output.push(field.name + ':' + field.options[j].value);
            }
          }
        }
        break;
      case 'submit':
        break;
      default:
        if (field.name.length) {
          output.push(field.name + ":" + field.value);
        }
    }
  }
  return output.join('\n');
}

function getAllValue(event) {
  alert(getAll(form));
}
// 检测能否取值
UnitEvent.addHandler(button, 'click', getAllValue);
