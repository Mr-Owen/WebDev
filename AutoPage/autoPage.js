/* jshint esversion:6 */

// 思路（以left=0为初始点）：
// 1.翻页：
//   1.1 在第一页时，点击prev回到末尾，反之进入下一页；在末页时，点击next回到第一页，反之回到上一页
//   1.2 处在中间的按照方向的不同进行加或减操作
// 2.小圆点（每个原点都有一个data-value表示第几张图片）
//   2.1 不点击小圆点的情况下，与翻页时的加减操作相同，并且转到相应页面给相应的标签添加特殊的类("on")
//   2.2 点击小圆点时，取得自定义data-value值，将得到的自定义值减一乘以负图像宽度（即展示第几张图），将得到的结果赋值给图像区的left属性，达到点击圆点翻页的目的
// 3. 定时器
//   3.1 mouseover事件时，取消定时器；mouseout事件时添加定时器
//   3.2 定时器的翻页方式与按下next的效果相同，包括圆点的变化

// 实现效果：
// 1. 点击翻页
// 2. 自动翻页，鼠标悬浮取消自动翻页，鼠标移开恢复自动翻页
// 3. 点击底部小圆点翻页

// 以下已将特殊值转换为变量，在修改html图片数量、大小时，不用修改js数据
// 已设置list类的宽度为1200px，可调节该宽度，保证有list类宽度/imgWidth == spanLen成立，否则多余的图将显示为空白
(function() {
  let list = document.querySelector(".list"),
    content = document.querySelector(".content"),
    span = document.querySelectorAll("span"),
    prev = document.querySelector(".prev"),
    next = document.querySelector(".next"),
    spanLen = document.querySelectorAll("img").length,
    imgWidth = document.querySelector("img").width,
    maxLeft = -(spanLen - 1) * imgWidth,
    timer = 0,
    index = 1; // 只要图片变换，index一定要变换
  let animate = (num, target) => {
    // 翻页
    let _array = parseInt(list.style.left, 10);
    if (_array == 0) {
      if (target == "prev") {
        list.style.left = maxLeft + "px";
        index = spanLen;
      } else {
        list.style.left = _array + num + "px";
      }
    }
    if (_array == maxLeft) {
      if (target == "prev") {
        list.style.left = _array + num + "px";
      } else {
        list.style.left = 0 + "px";
        index = 1;
      }
    }
    if (_array > maxLeft && _array < 0) {
      list.style.left = _array + num + "px";
    }
  };

  let point = (index) => {
    for (let i = 0; i < spanLen; i++) {
      span[i].classList.remove("on");
    }
    span[index - 1].classList.add("on");
  };

  // Event listener
  window.addEventListener("load", function(event) {
    timer = setInterval(function() {
      index += 1;
      animate(-1 * imgWidth);
      point(index);
    }, 3000);
  }, false);

  content.addEventListener("click", function(event) {
    target = event.target.classList[0];
    if (target == "prev") {
      index -= 1;
      animate(imgWidth, target);
      point(index);
    }
    if (target == "next") {
      index += 1;
      animate(-imgWidth, target);
      point(index);
    }
    // click points
    if (event.target.tagName == "SPAN") {
      let page = event.target.getAttribute("data-value");
      list.style.left = -imgWidth * (page - 1) + "px";
      point(page);
    }
  }, false);

  // Event mouse
  content.addEventListener("mouseover", (event) => {
    clearInterval(timer);
  }, false);
  content.addEventListener("mouseout", (event) => {
    timer = setInterval(function() {
      index += 1;
      animate(-imgWidth);
      point(index);
    }, 3000);
  }, false);
})();
