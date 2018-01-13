var treeWalker = function() {
  var filter = function(node) { // 此处函数必带参数node,否则报错
    return node.tagName.toLowerCase() == 'div' ?
      NodeFilter.FILTER_ACCEPT :
      NodeFilter.FILTER_SKIP;
  };

  var root = document.documentElement;  //root为起点节点

  var walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT,
    filter, false);                    //迭代器

  var output = document.querySelector('textarea');
  var node = walker.nextNode();
  while (node != null) {
    output.value += node.tagName.toLowerCase() + "\n";
    node = walker.nextNode();     //while中，node不断地循环迭代
  }
};

//Note:
//walker中filter可省略即不要过滤器，只要知道遍历的方向，就可使用以下方法向任何方向移动
//parentNode()遍历到当前节点的父节点
//firstChild()遍历到当前节点的第一个子节点
//lastChild()遍历到当前节点的最后一个子节点
//nextSiBling()遍历到当前节点的下一个同胞节点
//previousSiBling()遍历到当前节点的 上一个同胞节点
