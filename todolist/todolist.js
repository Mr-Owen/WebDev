// jshint esversion: 6
$(document).ready(() => {
  let app = {};

  app.parts = {
    KEEP_IMG: {}, // 保存mission区域图片的指针
    KEEP_TEXT: {}, // 暂存文本标签
    KEEP_TARGET: {}, // 暂存某一标签，该标签在某一时刻需要删除，在另一时刻需要重新启用
    DEL_TARGET: {}, // 与KEEP_TARGET功能相同
    todo_area: $('.todo_area'),
    list: $('.list'),
    date: $('.today_date'),
    add_m: $('#iadd_m'),
    output_area: $('.output_area'),
    input_item: $('.input_item'),
    input_result: $('.input_result'),
    icreate_item: $('#icreate_item'),
    list_li: $('.list li,.add_item li'), /////
    menu_ul: $('.menu_ul'),
    add_item_li: $('.add_item:last li'), ///////
    add_mission_div: $('.add_mission_div .input_result'),
    item_editer: $('.list .item_editer'),
    cancel_link: $('.cancel_link')
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
        now = /\d\d:\d\d:\d\d/.exec(localDate),
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

    //  控制修改框的出现于隐藏
    itemEditer: function(type) { // type 事件类型
      let input = {},
        form = {},
        insert_target = {},
        newValue = '',
        KEEP_TARGET = $(app.parts.KEEP_TARGET),
        // 以下两个变量(KEEP_TEXT and DEL_TARGET)不能在click中使用，即不能在更新值的事件中使用
        // 因为对象是按值传递的，在更新值的事件中无法更新此变量的值，KEEP_TEXT与app.parts.KEEP_TEXT二者指向不同对象，DEL_TARGET同理
        // 在click事件之后，变量销毁，下次非click事件时会重新声明，并得到上一次click事件中更新后的值
        KEEP_TEXT = $(app.parts.KEEP_TEXT),
        DEL_TARGET = app.parts.DEL_TARGET;
      switch (type) {

        case "mousedown":
          if (KEEP_TARGET.attr('class') === 'input_result') {
            insert_target = KEEP_TARGET.find('.li_mission');
          } else {
            insert_target = KEEP_TARGET.find('.item_name');
          }
          // 在编辑项目标签时需要删除点击元素（即三个点），故先存储点击元素的指针，在编辑完成后添加指针（在完成编辑后发生）
          app.parts.DEL_TARGET = KEEP_TARGET.find('.menu_link');
          app.parts.DEL_TARGET.replaceWith(app.parts.cancel_link.clone(true));
          app.parts.KEEP_TEXT = insert_target; // 保存指向文本标签的指针

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
          // 点击三点菜单选项时会必(先)发生mousedown、(后发生)focusout
          if (KEEP_TEXT.attr('class') === 'li_mission') {
            form = app.parts.input_result.find('#iediter');
          } else {
            form = app.parts.list.find('#iediter');
          }

          insert_target = KEEP_TEXT;
          input = form.children('#irevise_item');
          input.select();
          break;

        case "submit":
          if (KEEP_TEXT.attr('class') === 'li_mission') {
            form = app.parts.input_result.find('#iediter');
          } else {
            form = app.parts.list.find('#iediter');
          }

          insert_target = KEEP_TEXT;
          input = form.children('#irevise_item');
          newValue = input.val();

          insert_target.text(newValue);
          form.replaceWith(insert_target);
          KEEP_TARGET.find('.cancel_link').replaceWith(DEL_TARGET);
          break;

        case 'cancel_input':
          let oldValue = KEEP_TEXT.text(); // 编辑项目标签之前的旧值
          if (KEEP_TEXT.attr('class') === 'li_mission') {
            form = app.parts.input_result.find('#iediter');
          } else {
            form = app.parts.list.find('#iediter');
          }

          insert_target = KEEP_TEXT;
          input = form.children('#irevise_item');

          insert_target.text(oldValue);
          form.replaceWith(insert_target);
          KEEP_TARGET.find('.cancel_link').replaceWith(DEL_TARGET);
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
  // ===================== 监听程序 ==========================
  app.fn.getDate();

  app.parts.menu_ul.on('mousedown', function(event) {
    let target = event.target;
    switch (target.classList[0]) {
      case 'delete_link':
        let confirm = window.confirm('是否确认删除？');
        if (confirm) {
          // KEEP_TARGET保存的是指向点击元素(三个点)的父元素的指针『于hoverMenu中保存』
          app.parts.KEEP_TARGET.outerHTML = '';
        }
        break;
      case 'edit_link':
        app.fn.itemEditer('mousedown');
        break;
    }
    if ($(app.parts.KEEP_TARGET).attr('class') === 'input_result') {
      app.fn.testImg();
    }
  });

  app.parts.cancel_link.on('click', (event) => {
    app.fn.itemEditer('cancel_input');
  });

  //  监听文本元素上事件，控制悬浮效果，新建元素li在创建时添加监听程序(clone(true))
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
      case 'item_li':
        let text = $(target).find('.item_name').text(); // 项目栏文本
        $('.selected_item').text(text);
        break;
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
    if (target.attr('class') === 'menu_link') {  // 悬浮菜单
      // 失去焦点事件先于点击事件，所以设置延迟
      app.parts.menu_ul.hide();
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
        if (app.parts.add_m.css('display') === 'none') { // 防止过多点击造成弹跳
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
    if (target.attr('class') === 'menu_link') { // 悬浮菜单
      app.parts.menu_ul.hide();
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
