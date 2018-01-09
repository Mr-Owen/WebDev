var quickSort = function(arr) {
  if (arr.length <= 1) {
    return arr;
  }
  // 声明基准、基准左边arr的子集、基准右边arr的子集
  // 基准任选
  // arr.splice将基准从原数组分离，并使用arr.splice()[0]转化为数值
  var pivo = arr.splice(0,1)[0],
    len = arr.length,
    left = [],
    right = [];
  // 遍历数组，将小于基准的数值放入left，大于等于基准的数值放入right
  for (var i = 0; i < len; i++) {
    if (arr[i] < pivo ) {
      left.push(arr[i]);
    } else {
      right.push(arr[i]);
    }
  }
  // 对左右两边数组继续进行快速排序
  // 即递归遍历数组(for循环)这个过程
  return quickSort(left).concat([pivo],quickSort(right));
};

// 此法(仅仅指以上代码而非算法局限性)局限性：最后结果是一个新数组，而非原数组。
// 总结：
// 1.基准始终不参与内部排序；
