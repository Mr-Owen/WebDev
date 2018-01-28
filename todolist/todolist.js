// jshint esversion: 6
let app = {};

app.parts = {
  _todo_area: document.querySelector('.todo_area'),
  _list: document.querySelector('.list'),
  _date: document.querySelector('.today_date'),
  _new_mission: document.querySelector('span.add_mission'),
  _add_m_button: document.querySelector('.add_mission_button'),
  _add_m: document.querySelector('#iadd_m'),
  _out_area: document.querySelector('.output_area'),
  _out_area_img: document.querySelector('img')
};

app.fn = {
  _runDate: (function() {
    let localDate = new Date(),
      year = localDate.getFullYear(),
      month = localDate.getMonth() + 1,
      date = localDate.getDate(),
      day = localDate.getDay(),
      cnDay = ['日', '一', '二', '三', '四', '五', '六'];
    day = cnDay[day];
    let output = year + "年" + month + "月" + date + "日" + " 星期" + day;
    app.parts._date.innerText = output;
  })(),

  _create_ele: function() {
    if (event.target.classList[0] === 'create_item') {
      let cEle_li = document.createElement('li'),
        cEle_span = document.createElement('span'),
        cEle_spans = document.createElement('span'),
        cText_Node = document.createTextNode('新类别');
      cEle_span.className = 'color_point';
      cEle_spans.className = 'li_item';
      cEle_spans.appendChild(cText_Node);
      cEle_li.appendChild(cEle_span);
      cEle_li.appendChild(cEle_spans);
      app.parts._list.insertBefore(cEle_li, app.parts._list.lastElementChild);
    }

    if (event.target.tagName === 'FORM') {
      let iEle_div = document.createElement('div'),
        iEle_p = document.createElement('p'),
        iText_Node = document.createTextNode(app.parts._add_m.value);
      iEle_div.className = 'input_result';
      iEle_p.appendChild(iText_Node);
      iEle_div.appendChild(iEle_p);
      app.parts._out_area.insertBefore(iEle_div, app.parts._out_area.firstChild);
      if (app.parts._out_area.lastChild.tagName === 'IMG') {
        app.parts._out_area.removeChild(app.parts._out_area.lastChild);
      }
    }
  },

  _show_input: function() {
    if (event.type === 'click') {
      if (event.target === app.parts._add_m_button) {
        app.parts._add_m.style.visibility = 'visible';
        app.parts._add_m.style.width = 300 + 'px';
        app.parts._add_m.focus();
      }
    } else if (event.type === 'focusout') {
      app.parts._add_m.style.visibility = 'hidden';
      app.parts._add_m.style.width = 0;
    }
  }
};

app.parts._list.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'create_item') {
    app.fn._show_input();
    app.fn._create_ele();
  }
}, false);

app.parts._todo_area.addEventListener('click', (event) => {
  if (event.target.classList[0] === 'add_mission_button') {
    app.fn._show_input();
  }
}, false);

app.parts._todo_area.addEventListener('focusout', (event) => {
  if (event.target.id === 'iadd_m') {
    app.fn._show_input();
  }
}, false);

app.parts._todo_area.addEventListener('submit', (event) => {
  if (app.parts._add_m.value != '') {
    app.fn._create_ele();
    document.querySelector('form').reset(); // reset form
  } else {
    app.parts._add_m.blur(); // 空输入主动失去焦点
  }
}, false);
