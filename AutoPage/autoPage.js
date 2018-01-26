/* jshint esversion:6 */

// 思路（以left=0为初始点）：
// 1.翻页：
//   1.1 在第一页时，点击prev回到末尾，反之进入下一页；在末页时，点击next回到第一页，反之回到上一页
//   1.2 处在中间的按照方向的不同进行加或减操作
// 2.小圆点（每个原点都有一个data-value表示第几张图片）
//   2.1 不点击小圆点的情况下，用修改后的left属性除以图片宽度，这样可得到绝对的图像位置，将图像和索引紧密联系在了一起，然后给相应的标签添加特殊的类("on")
//   note:之前是直接加减而不是取绝对图像位置，容易在点击圆点和箭头之间出现慢一步的情况，故这里改为取绝对图像位置
//   2.2 点击小圆点时，取得自定义data-value值，将得到的自定义值减一乘以负图像宽度（即展示第几张图），将得到的结果赋值给图像区的left属性，达到点击圆点翻页的目的
// 3. 定时器
//   3.1 mouseover事件时，取消定时器；mouseout事件时添加定时器
//   3.2 定时器的翻页方式与按下next的效果相同，包括圆点的变化

// 实现效果：
// 1. 点击翻页
// 2. 自动翻页，鼠标悬浮取消自动翻页，鼠标移开恢复自动翻页
// 3. 点击底部小圆点翻页

// 易错点：
// 在单例中要小心使用箭头函数，因为它本身函数体不具有this，它使用的是函数外层作用域的this
// 或者理解为箭头函数中的this指向定义函数时的作用域

// 以下已将特殊值转换为变量，在修改html图片数量、大小时，不用修改js数据
// 已设置list容器的宽度为1200px，可调节该宽度，保证有list类宽度/img_width == img_len成立，否则多余的图将显示为空白

let get_animate = (() => {
  let list = document.querySelector(".list"),
    box = document.querySelector(".content"),
    span = document.querySelectorAll("span"),
    img_len = document.querySelectorAll("img").length,
    img_width = document.querySelector("img").width,
    max_left = -(img_len - 1) * img_width,
    img_timer = 0,
    img_index = 1;
  return {
    _box: box,
    _list: list,
    _timer: img_timer,
    _width: img_width,
    animate: function(num, tg) {
      // animate函数若使用箭头函数，则该函数内this指向window
      let digit = parseInt(list.style.left, 10);
      switch (digit) {
        case 0:
          if (tg == "prev") {
            list.style.left = max_left + "px";
          } else {
            list.style.left = digit + num + "px";
          }
          // 取left计算后的值，所以不能取digit,加1是为了防止负0出现
          get_animate.img_index = -parseInt(list.style.left, 10) / img_width + 1;
          break;

        case max_left:
          if (tg == "prev") {
            list.style.left = digit + num + "px";
          } else {
            list.style.left = 0 + "px";
          }
          get_animate.img_index = -parseInt(list.style.left, 10) / img_width + 1;
          break;

        default:
          list.style.left = digit + num + "px";
          get_animate.img_index = -parseInt(list.style.left, 10) / img_width + 1;
      }
    },

    point: (item) => {
      for (let i = 0; i < img_len; i++) {
        span[i].classList.remove("on");
      }
      span[item - 1].classList.add("on");
    }
  };
})();

window.addEventListener("load", function(event) {
  get_animate._timer = setInterval(function() {
    get_animate.animate(-get_animate._width);
    get_animate.point(get_animate.img_index);
  }, 3000);
}, false);

get_animate._box.addEventListener("click", function(event) {
  let target = event.target.classList[0];
  if (target == "prev") {
    get_animate.animate(get_animate._width, target);
    get_animate.point(get_animate.img_index);
  }
  if (target == "next") {
    get_animate.animate(-get_animate._width, target);
    get_animate.point(get_animate.img_index);
  }
  // click points
  if (event.target.tagName == "SPAN") {
    let page = event.target.getAttribute("data-value");
    get_animate._list.style.left = -get_animate._width * (page - 1) + "px";
    get_animate.point(page);
  }
}, false);

// Event mouse
get_animate._box.addEventListener("mouseover", (event) => {
  clearInterval(get_animate._timer);
}, false);
get_animate._box.addEventListener("mouseout", (event) => {
  get_animate._timer = setInterval(function() {
    get_animate.animate(-get_animate._width);
    get_animate.point(get_animate.img_index);
  }, 3000);
}, false);
