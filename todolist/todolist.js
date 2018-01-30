// jshint esversion: 6
$(document).ready(() => {
  let app = {};

  app.parts = {
    KEEP_IMG: {},
    todo_area: $('.todo_area'),
    list: $('.list'),
    date: $('.today_date'),
    add_m: $('#iadd_m'),
    add_m_button: $('.add_mission_button'),
    output_area: $('.output_area'),
    input_item: $('.input_item'),
    input_result: $('.input_result'),
    add_item: $('#icreate_item'),
    list_li: $('.list li'),
    delete_link: $('.delete_link'),
  };

  app.fn = {
    getDate: (function() {
      let localDate = new Date(),
        year = localDate.getFullYear(),
        month = localDate.getMonth() + 1,
        date = localDate.getDate(),
        day = localDate.getDay(),
        now = /\d\d:\d\d:\d\d/.exec(localDate);
      cnDay = ['日', '一', '二', '三', '四', '五', '六'];
      day = cnDay[day];
      let output = year + "年" + month + "月" + date + "日" + " 星期" + day;
        app.parts.date.append(output);
      return now[0];
    })(),

    createEle: function(event) {
      if (event.target.firstElementChild.classList[0] === 'color_point') {
        let cEle_li = $('<li>'),
          cEle_span = $("<span class='color_point'>"),
          cEle_spans = $("<span class='li_item'>"),
          cEle_a = $("<a href='javascript:;' class='delete_link'>...</a>");
        cEle_spans.text(app.parts.add_item.val());
        cEle_li.append(cEle_span);
        cEle_li.append(cEle_spans);
        cEle_li.append(cEle_a);
        app.parts.input_item.before(cEle_li);
        // 更新 list_li
        app.parts.list_li = $('.list li');
        let obj = app.parts.list_li[app.parts.list_li.length - 3];
        app.fn.addHandler(obj, function(event) {
          app.fn.hover.call(app.parts.list_li, event,this.children[2]);
        }, 2); // 排除一个按钮一个隐藏输入框
      }

      if (event.target.children[1].classList[0] === 'add_mission') {
        let iEle_div = $("<div class='input_result'>"),
          iEle_p = $('<p>');
        iEle_a = $("<a href='javascript:;' class='delete_link'>...</a>");
        iEle_p.text(app.parts.add_m.val());
        iEle_div.append(iEle_p);
        iEle_div.append(iEle_a);
        app.parts.output_area.prepend(iEle_div);
        app.fn.testImg();
        app.parts.input_result = $('.input_result');

        app.fn.addHandler(app.parts.input_result.first()[0], function(event) {
          app.fn.hover.call(app.parts.input_result, event, this.children[1]);
        });

      }
    },

    // obj 要添加事件的元素(非jQuery)
    // fn 监听程序
    addHandler: function(obj, fn) {
      obj.addEventListener('mouseenter', fn, false);
      obj.addEventListener('mouseleave', fn, false);
    },

    hover: function(event, obj) {
      switch (event.type) {
        case 'mouseenter':
          if (obj) {
            obj.classList.add('on');
          }
          break;
        case 'mouseleave':
          if (obj) {
            obj.classList.remove('on');
          }
          break;
      }
    },

    showInput: function(obj, event) {
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

    hidden: function(obj) {
      obj.hide(200);
    },

    testValue: function(obj, event) {
      if (obj.val() != '') {
        app.fn.createEle(event);
        for (let i = 0, len = $('form').length; i < len; i++) {
          $('form')[i].reset(); // reset mission form
        }
      } else {
        obj.blur();
      }
    },

    testImg: function(event) {
      let tag_name = app.parts.output_area.children(':last')[0];
      if (tag_name) {
        tag_name = tag_name.tagName;
      }
      if (!app.parts.output_area.children().length) {
        app.parts.output_area.append(app.parts.KEEP_IMG);
        app.parts.KEEP_IMG = null;
      } else if (tag_name === 'IMG') {
        // 将要删除的图片保存起来
        app.parts.KEEP_IMG = app.parts.output_area.children('img');
        app.parts.output_area.children('img').remove();
      }
    },

  };

  app.parts.list.click(function(event) {
    switch (event.target.classList[0]) {
      case 'create_item':
        // if 用于防止过多点击按钮导致输入框弹跳
        if (event.target.tagName != 'LI' && app.parts.input_item.css('display') === 'none') {
          app.fn.showInput(app.parts.input_item, event);
        }
        break;
      case 'delete_link':
        // remove item
        event.target.parentNode.outerHTML = '';
        break;
    }
  });

  //  新建元素li在创建时添加监听程序【line 49】
  app.parts.list_li.mouseenter(function(event) {
    app.fn.hover.call(app.parts.list_li, event, this.children[2]);
  });

  app.parts.list_li.mouseleave(function(event) {
    app.fn.hover.call(app.parts.list_li, event,this.children[2]);
  });

  app.parts.list.submit((event) => {
    app.fn.testValue(app.parts.add_item, event);
  });

  app.parts.list.focusout((event) => {
    if (event.target.id === 'icreate_item') {
      app.fn.hidden(app.parts.input_item);
    }
  });

  app.parts.todo_area.click((event) => {
    switch (event.target.classList[0]) {
      case 'add_mission_button':
        if (app.parts.add_m.css('display') === 'none') {
          app.fn.showInput(app.parts.add_m, event);
        }
        break;
      case 'delete_link':
        event.target.parentNode.outerHTML = '';
        app.fn.testImg(event);
        break;
    }
  });

  app.parts.todo_area.focusout((event) => {
    if (event.target.id === 'iadd_m') {
      app.fn.hidden(app.parts.add_m);
    }
  });

  app.parts.todo_area.submit((event) => {
    app.fn.testValue(app.parts.add_m, event);
  });

});
