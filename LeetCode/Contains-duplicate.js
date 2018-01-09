// 题目：当参数数组中存在任一一项有重复值，返回true
// 法一：
var containsDuplicate = function(nums) {
  var i,
    j,
    len = nums.length;
  for (i = 0; i < len; i++) {
    for (j = 1; j < len; j++) {
      if (nums[i] == nums[j] && i < j) {
        return true;
      }
    }
  }
  return false;
};

// 法二：
var containsDuplicate = function(nums) {
  return Array.from(new Set(nums)).length !== nums.length;
};
// 关键点：es6中的Set()构造函数实例不包含重复项
