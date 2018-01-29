// jshint esversion: 6
$(document).ready(() => {
  let app = {};

  app.parts = {
    todo_area: $('.todo_area'),
    list: $('.list'),
    date: $('.today_date'),
    add_m: $('#iadd_m'),
    add_m_button: $('.add_mission_button'),
    out_area: $('.output_area'),
    input_item: $('.input_item'),
    add_item: $('#icreate_item'),
    list_li: $('.list li'),
    delete_link: $('.delete_link'),
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
        app.parts.date.innerText = output;
      return now[0];
    })(),

    _create_ele: function(event) {
      if (event.target.firstElementChild.classList[0] === 'color_point') {
        let cEle_li = $('<li>'),
          cEle_span = $("<span class='color_point'>"),
          cEle_spans = $("<span class='li_item'>"),
          cEle_a = $("<a href='javascript:;' class='delete_link'>删除</a>");
        cEle_spans.text(app.parts.add_item.val());
        cEle_li.append(cEle_span);
        cEle_li.append(cEle_spans);
        cEle_li.append(cEle_a);
        app.parts.input_item.before(cEle_li);
      }

      if (event.target.children[1].classList[0] === 'add_mission') {
        let iEle_div = $("<div class='input_result'>"),
          iEle_p = $('<p>');
        // iEle_a = $("<a href='javascript:;' class='delete_link'>删除</a>");
        iEle_p.text(app.parts.add_m.val());
        iEle_div.append(iEle_p);
        // iEle_div.append(iEle_a);
        app.parts.out_area.prepend(iEle_div);
        // 只删除图像
        if (app.parts.out_area.children(':last')[0].tagName === 'IMG') {
          app.parts.out_area.children(':last')[0].remove();
        }
      }
    },

    _show_input: function(obj, event) {
      if (event.type === 'click') {
        obj.toggle(200);
        if (event.target.classList[0] === 'add_mission_button') {
          obj.focus();
        }
        if (event.target.classList[0] === 'create_item') {
          $('#icreate_item').focus();
        }
      }
    },

    _hidden: function(obj) {
      obj.hide(200);
    },

    _test_value: function(obj, event) {
      if (obj.val() != '') {
        app.fn._create_ele(event);
        for (let i = 0, len = $('form').length; i < len; i++) {
          $('form')[i].reset(); // reset mission form
        }
      } else {
        obj.blur(); // 空输入主动失去焦点
      }
    }
  };

  app.parts.list.click(function(event) {
    if (event.target.tagName != 'LI' && app.parts.input_item.css('display') === 'none') {
      switch (event.target.classList[0]) {
        case 'create_item':
          app.fn._show_input(app.parts.input_item, event);
          break;
        case 'delete_link':
          // remove item
          event.target.parentNode.outerHTML = '';
          break;
      }
    }
  });

  //  待补 event mouseenter and mouseleave

  app.parts.list.submit((event) => {
    app.fn._test_value(app.parts.add_item, event);
  });

  app.parts.list.focusout((event) => {
    if (event.target.id === 'icreate_item') {
      app.fn._hidden(app.parts.input_item);
    }
  });

  app.parts.todo_area.click((event) => {
    if (event.target.classList[0] === 'add_mission_button' && app.parts.add_m.css('display') === 'none') {
      app.fn._show_input(app.parts.add_m, event);
    }
  });

  app.parts.todo_area.focusout((event) => {
    if (event.target.id === 'iadd_m') {
      app.fn._hidden(app.parts.add_m);
    }
  });

  app.parts.todo_area.submit((event) => {
    app.fn._test_value(app.parts.add_m, event);
  });
});
