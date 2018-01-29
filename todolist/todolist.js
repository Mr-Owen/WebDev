// jshint esversion: 6
//$(document).ready(() => {
let app = {};

app.parts = {
  _todo_area: $('.todo_area'),
  _list: $('.list'),
  _form: $('form'),
  _date: $('.today_date'),
  _add_m_button: $('.add_mission_button'),
  _add_m: $('#iadd_m'),
  _out_area: $('.output_area'),
  _input_item: $('.input_item'),
  _add_item: $('#icreate_item'),
  _li_create_item: $('li.create_item')
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
      let cEle_li = $('<li>'),
        cEle_span = $("<span class='color_point'>"),
        cEle_spans = $("<span class='li_item'>");
      cEle_spans.text(app.parts._add_item.val());
      cEle_li.append(cEle_span);
      cEle_li.append(cEle_spans);
      let insertedNode = app.parts._list.last().prev();
      console.log(cEle_li);
      app.parts._li_create_item.before(cEle_li);
    }

    if (event.target.firstElementChild.classList[0] === 'add_mission') {
      let iEle_div = $("<div class='input_result'>"),
        iEle_p = $('<p>');
      iEle_p.text(app.parts._add_m.val());
      iEle_div.append(iEle_p);
      console.log(iEle_div[0]);
      app.parts._out_area.children(':first').before(iEle_div);
      // 没有值
      // 只删除图像
      // if (app.parts._out_area.children(':last')[0].tagName === 'IMG') {
      //   app.parts._out_area.empty();
      // }
    }
  },

  _show_input: function(obj) {
    if (event.type === 'click') {
      obj.css('visibility', 'visible');
      if (event.target.classList[0] === 'add_mission_button') {
        obj.css('width', 300 + 'px'); // mission area
        obj.focus();
      }
      if (event.target.classList[0] === 'create_item') {
        obj.css('width', 240 + 'px'); // item area
        $('#icreate_item').focus();
      }
    }
  },

  _hidden: function(obj) {
    obj.css('visibility', 'hidden');
    obj.css('width', 0);
  },

  _test_value: function(obj) {
    if (obj.val() != '') {
      app.fn._create_ele();
      for (let i = 0, len = $('form').length; i < len; i++) {
        $('form')[i].reset(); // reset mission form
      }
    } else {
      obj.blur(); // 空输入主动失去焦点
    }
  }
};

app.parts._list.click((event) => {
  if (event.target.classList[0] === 'create_item') {
    app.fn._show_input(app.parts._input_item);
  }
});

app.parts._list.submit((event) => {
  app.fn._test_value(app.parts._add_item);
});

app.parts._list.focusout((event) => {
  if (event.target.id === 'icreate_item') {
    app.fn._hidden(app.parts._input_item);
  }
});

app.parts._todo_area.click((event) => {
  if (event.target.classList[0] === 'add_mission_button') {
    app.fn._show_input(app.parts._add_m);
  }
});

app.parts._todo_area.focusout((event) => {
  if (event.target.id === 'iadd_m') {
    app.fn._hidden(app.parts._add_m);
  }
});

app.parts._todo_area.submit((event) => {
  app.fn._test_value(app.parts._add_m);
});
//});
