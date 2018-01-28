// jshint esversion: 6
let app = {};

app.parts = {
  _todo_area: document.querySelector('.todo_area'),
  _list: document.querySelector('.list'),
  _form: document.querySelectorAll('form'),
  _date: document.querySelector('.today_date'),
  _add_m_button: document.querySelector('.add_mission_button'),
  _add_m: document.querySelector('#iadd_m'),
  _out_area: document.querySelector('.output_area'),
  _input_item: document.querySelector('.input_item'),
  _add_item:document.querySelector('#icreate_item')
};

app.fn = {
  _get_date: (function() {
    let localDate = new Date(),
      year = localDate.getFullYear(),
      month = localDate.getMonth() + 1,
      date = localDate.getDate(),
      day = localDate.getDay(),
      now = /\d\d:\d\d:\d\d/.exec(localDate);
      cnDay = ['日', '一', '二', '三', '四', '五', '六'];
    day = cnDay[day];
    let output = year + "年" + month + "月" + date + "日" + " 星期" + day;
    let clock =
    app.parts._date.innerText = output;
    return now[0];
  })(),

  _create_ele: function() {
    if (event.target.firstElementChild.classList[0] === 'color_point') {
      let cEle_li = document.createElement('li'),
        cEle_span = document.createElement('span'),
        cEle_spans = document.createElement('span'),
        cText_Node = document.createTextNode(app.parts._add_item.value);
      cEle_span.className = 'color_point';
      cEle_spans.className = 'li_item';
      cEle_spans.appendChild(cText_Node);
      cEle_li.appendChild(cEle_span);
      cEle_li.appendChild(cEle_spans);
      let insertedNode = app.parts._list.lastElementChild.previousElementSibling;
      app.parts._list.insertBefore(cEle_li, insertedNode);
    }

    if (event.target.firstElementChild.classList[0] === 'add_mission') {
      let iEle_div = document.createElement('div'),
        iEle_p = document.createElement('p'),
        iText_Node = document.createTextNode(app.parts._add_m.value);
      iEle_div.className = 'input_result';
      iEle_p.appendChild(iText_Node);
      iEle_div.appendChild(iEle_p);
      app.parts._out_area.insertBefore(iEle_div, app.parts._out_area.firstChild);
      // 只删除图像
      if (app.parts._out_area.lastChild.tagName === 'IMG') {
        app.parts._out_area.removeChild(app.parts._out_area.lastChild);
      }
    }
  },

  _show_input: function(obj) {
    if (event.type === 'click') {
      obj.style.visibility = 'visible';
      if (event.target === app.parts._add_m_button) {
        obj.style.width = 300 + 'px';   // mission area
        obj.focus();
      }
      if (event.target.classList[0] === 'create_item') {
        obj.style.width = 240 + 'px';    // item area
        document.querySelector('#icreate_item').focus();
      }
    }
  },

  _hidden: function(obj) {
    obj.style.visibility = 'hidden';
    obj.style.width = 0;
  },

  _test_value:function(obj) {
    if (obj.value != '') {
      app.fn._create_ele();
      app.parts._form.forEach((form)=>form.reset());  // reset mission form
    } else {
      obj.blur(); // 空输入主动失去焦点
    }
  }
};

app.parts._list.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'create_item') {
    app.fn._show_input(app.parts._input_item);
  }
}, false);

app.parts._list.addEventListener('submit', (event) => {
  app.fn._test_value(app.parts._add_item);
},false);

app.parts._list.addEventListener('focusout', (event) => {
  if (event.target.id === 'icreate_item') {
    app.fn._hidden(app.parts._input_item);
  }
}, false);

app.parts._todo_area.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'add_mission_button') {
    app.fn._show_input(app.parts._add_m);
  }
}, false);

app.parts._todo_area.addEventListener('focusout', (event) => {
  if (event.target.id === 'iadd_m') {
    app.fn._hidden(app.parts._add_m);
  }
}, false);

app.parts._todo_area.addEventListener('submit', (event) => {
  app.fn._test_value(app.parts._add_m);
}, false);
