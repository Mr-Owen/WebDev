// jshint esversion: 6
$(document).ready(() => {
  let app = {};

  app.parts = {
    KEEP_IMG: {},
    KEEP_TARGET: {},
    todo_area: $('.todo_area'),
    list: $('.list'),
    date: $('.today_date'),
    add_m: $('#iadd_m'),
    output_area: $('.output_area'),
    input_item: $('.input_item'),
    input_result: $('.input_result'),
    icreate_item: $('#icreate_item'),
    list_li: $('.list li,.add_item li'),
    menu_ul: $('.menu_ul'),
    add_item_li: $('.add_item:last li'),
    add_mission_div: $('.add_mission_div .input_result'),
    item_editer: $('.list .item_editer')
  };

  app.fn = {
    // 事件处理程序应专注处理事件，然后将处理转交给应用逻辑(二者应分离)
    // 应用逻辑的函数不应存在event对象，而只传入event对象中所需的数据
    getDate: function() {
      let localDate = new Date(),
        year = localDate.getFullYear(),
        month = localDate.getMonth() + 1,
        date = localDate.getDate(),
        day = localDate.getDay(),
        now = /\d\d:\d\d:\d\d/.exec(localDate);
      cnDay = ['日', '一', '二', '三', '四', '五', '六'];
      day = cnDay[day];
      let output = year + "年" + month + "月" + date + "日" + " 星期" + day;
      app.parts.date.text(output);
      return now[0];
    },

    createEle: function(id) {
      if (id === 'icreate_item') {
        // 使用节点复制的方式创建新的item
        let cloneItem = app.parts.add_item_li.clone(true);
        cloneItem.find('.item_name').text(app.parts.icreate_item.val());
        app.parts.input_item.before(cloneItem);
        return;
      }

      if (id === 'iadd_m') {
        let cloneMission = app.parts.add_mission_div.clone(true);
        cloneMission.find('span:first').text(app.parts.add_m.val());
        cloneMission.find('.current_time').text(app.fn.getDate);
        app.parts.output_area.prepend(cloneMission);
        app.fn.testImg();
        app.parts.input_result = $('.input_result');
      }
      return;
    },

    hover: function(type, obj) {
      switch (type) {
        case 'mouseenter':
          if (obj) {
            obj.addClass('on');
          }
          break;
        case 'mouseleave':
          if (obj) {
            obj.removeClass('on');
          }
          break;
      }
    },

    hoverMenu: function(x, y, parent) {
      let ul = app.parts.menu_ul;
      ul.toggle();
      ul.css('left', x);
      ul.css('top', y);
      app.parts.KEEP_TARGET = $(parent)[0];
    },

    showInput: function(obj, target) {
      // if (event.type === 'click') {
      obj.toggle(200);
      if (target.classList[0] === 'add_mission_button') {
        obj.focus();
        return;
      }
      if (target.classList[0] === 'create_item') {
        app.parts.icreate_item.focus();
        return;
      }
      // }
    },

    itemEditer: function(type) {
      let input = {},
        form = {},
        insert_target = {},
        newValue = '';
      switch (type) {
        case "click":
          if (app.parts.KEEP_TARGET.classList[0] === 'input_result') {
            insert_target = $(app.parts.KEEP_TARGET).find('.li_mission');
          } else {
            insert_target = $(app.parts.KEEP_TARGET).find('.item_name');
          }
          app.parts.KEEP_TARGET = insert_target[0];
          form = app.parts.item_editer.clone(true);
          form.attr('id', 'iediter');
          form.attr('class', 'item_editer');
          input = form.children('input');
          input.attr('value', insert_target.text());
          input.attr('id', 'irevise_item');
          insert_target.replaceWith(form);
          input.select();
          break;
        case "focusout":
          if (app.parts.KEEP_TARGET.classList[0] === 'li_mission') {
            form = app.parts.input_result.find('#iediter');
          } else {
            form = app.parts.list.find('#iediter');
          }
          insert_target = $(app.parts.KEEP_TARGET);
          input = form.children('#irevise_item');
          newValue = input.val();
          insert_target.text(newValue);
          form.replaceWith(insert_target);
          break;
        case "submit":
          if (app.parts.KEEP_TARGET.classList[0] === 'li_mission') {
            form = app.parts.input_result.find('#iediter');
          } else {
            form = app.parts.list.find('#iediter');
          }
          input = form.children('#irevise_item');
          input.blur();
          break;
      }
    },

    testValue: function(id) {
      if (this.val() != '') {
        app.fn.createEle(id);
        for (let i = 0, len = $('form').length; i < len; i++) {
          $('form')[i].reset(); // reset form
        }
      } else {
        this.blur();
      }
    },

    testImg: function() {
      let output_area = app.parts.output_area,
        tag_name = output_area.find('.keep_img')[0];
      if (!output_area.children().length) {
        output_area.append(app.parts.KEEP_IMG);
        app.parts.KEEP_IMG = null;
      } else if (tag_name) {
        // 将要删除的图片指针保存起来
        app.parts.KEEP_IMG = output_area.children('.keep_img');
        output_area.find('.keep_img').remove();
      }
    },

    backToTop: () => {
      switch (document.documentElement.scrollTop) {
        case 0:
          $('.backtotop').hide();
          break;
        default:
          $('.backtotop').show();

      }
    },

  };
  // ===================== event listener ==========================
  app.fn.getDate();

  app.parts.menu_ul.on('click', function(event) {
    let target = event.target;
    switch (target.classList[0]) {
      case 'delete_link':
        // KEEP_TARGET保存的是指向点击元素(三个点)的父元素的指针
        app.parts.KEEP_TARGET.outerHTML = '';
        break;
      case 'edit_link':
        app.fn.itemEditer('click');
        break;
    }
    if ($(app.parts.KEEP_TARGET).attr('class') === 'input_result') {
      app.fn.testImg();
    }
  });

  //  新建元素li在创建时添加监听程序(clone(true))
  app.parts.list_li.not('.input_item,.create_item').on('mouseenter', function(event) {
    let type = event.type;
    app.fn.hover.call(app.parts.list_li, type, $(this).find('.menu_link'));
  });

  app.parts.list_li.not('.input_item,.create_item').on('mouseleave', function(event) {
    let type = event.type;
    app.fn.hover.call(app.parts.list_li, type, $(this).find('.menu_link'));
  });

  app.parts.input_result.on('mouseenter', function(event) {
    let type = event.type;
    app.fn.hover.call(app.parts.input_result, type, $(this).find('.menu_link'));
  });

  app.parts.input_result.on('mouseleave', function(event) {
    let type = event.type;
    app.fn.hover.call(app.parts.input_result, type, $(this).find('.menu_link'));
  });

  // ===================== 事件委托 ===============================

  app.parts.list.on('click', function(event) {
    let x = event.clientX,
      y = event.clientY,
      parent = event.target.parentNode,
      target = event.target;
    switch (event.target.classList[0]) {
      case 'create_item':
        // if 用于防止过多点击按钮导致输入框弹跳
        if (event.target.tagName != 'LI' && app.parts.input_item.css('display') === 'none') {
          app.fn.showInput(app.parts.input_item, target);
        }
        break;
      case 'menu_link':
        app.fn.hoverMenu(x, y, parent);
        break;
    }
  });

  app.parts.list.on('submit', (event) => {
    let id = $(event.target).children('input').attr('id');
    switch (id) {
      case 'icreate_item':
        app.fn.testValue.call(app.parts.icreate_item, id);
        break;
      case 'irevise_item':
        app.fn.itemEditer('submit');
        break;

    }
  });

  app.parts.list.on('focusout', (event) => {
    let target = $(event.target);
    if (target.attr('id') === 'icreate_item') {
      app.parts.input_item.hide(200);
      return;
    }
    if (target.attr('id') === 'irevise_item') {
      app.fn.itemEditer('focusout');
      return;
    }
    if (target.attr('class') === 'menu_link') {
      // 失去焦点事件先于点击事件，所以设置延迟
      app.parts.menu_ul.hide(400);
      return;
    }
  });

  app.parts.todo_area.on('click', (event) => {
    let x = event.clientX,
      y = event.clientY,
      parent = event.target.parentNode,
      target = event.target;
    switch (event.target.classList[0]) {
      case 'add_mission_button':
        if (app.parts.add_m.css('display') === 'none') {
          app.fn.showInput(app.parts.add_m, target);
        }
        break;
      case 'menu_link':
        app.fn.hoverMenu(x, y, parent);
        break;
    }
  });

  app.parts.todo_area.on('focusout', (event) => {
    let target = $(event.target);
    if (target.attr('id') === 'iadd_m') {
      app.parts.add_m.hide(200);
      return;
    }
    if (target.attr('id') === 'irevise_item') {
      app.fn.itemEditer('focusout');
      return;
    }
    if (target.attr('class') === 'menu_link') {
      app.parts.menu_ul.hide(200);
      return;
    }
  });

  app.parts.todo_area.on('submit', (event) => {
    let id = $(event.target).children('input').attr('id');
    switch (id) {
      case 'iadd_m':
        app.fn.testValue.call(app.parts.add_m, id);
        break;
      case 'irevise_item':
        app.fn.itemEditer('submit');
        break;
    }
  });

  $(window).on('scroll', (event) => {
    app.fn.backToTop();
  });

});
