var checkPerfectNumber = function(num) {
  var a = [],
    sum = 0;
  for (i = 1; i < num; i++) {
    if (num % i == 0) {
      a.push(i);
    }
  }
  for (j = 0; j < a.length; j++) {
    sum = sum + a[j];
  }
  return num > 0 && num == sum;
};
