var twoSum = function(nums, target) {
  for (var i = 0; i < nums.length; i++) {
    for (var j = 0; j < nums.length; j++) {
      if (i <= j) {
        // 不考虑顺序，去掉重复项
        if (nums[i] + nums[j] == target) {
          var sum = [];
          sum.push(nums[i], nums[j]);
          console.log(sum);
        }
      }
    }
  }
};
