var bubbleSort = function(arr) {
  var i,
    j,
    len = arr.length,
    val;
  for (i = 0; i < len; i++) {
    // 对每个元素都进行以下比较
    for (j = 0; j < len - 1; j++) {
      // 比较相邻两个数的大小，较大的数在右边，较小数在左边——“冒泡”
      if (arr[j] > arr[j + 1]) {
        // 第n-1项（最后一项）不用比较，所以是 j < len-1。
        val = arr[j + 1];
        arr[j + 1] = arr[j];
        arr[j] = val;
      }
    }
  }
  return arr;
};

// 关键点：两两比较，小数在前

// 总结：
// 1.一次比较两个数值大小，若左边大于右边，则调换位置，否则不变，即较小数冒泡；
// 2.对数组中的每一个元素都进行 1 操作。
