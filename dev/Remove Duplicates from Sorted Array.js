var removeDuplicates = function(nums) {
  var digit = [],
  i,
  len;
  for (i = 0,len = nums.length; i < len; i++) {
    if (digit.indexOf(nums[i]) == -1){
      digit.push(nums[i]);
    }
  }
  return digit;
};

// 使用场景：给定一个排序数组删除其中的重复项
// 思路：
// 1.建立一新数组。
// 2.在新数组中查找参数数组的项，若不存在则传入新数组，若存在则忽略。
// 3.循环完成，则新数组中的项为无重复项的排序数组

// 总结：
// 1.此法关键词，indexOf()。即在数组中查找重复项的方法。
// 2.此法，必须新建一个新数组，并不是在原数组上剔除重复项。由此，增加了算法复杂度。
