var isPalindrome = function(x) {
  var a = [],
    num;
  if (x >= 0) {
    a = x.toString().split('');
    a = a.reverse();
    num = a.join('');
    return x == num;
  }else{
    return false;
  }
};
// 思路一：
// 1.1.回文即正反读值不变，则考虑将数值转化为数组使用reverse()方法在合并达到反转数值的目的
// 1.2.比较原值与翻转后的值
// 可简写为：return x == x.toString().split('').reverse().join('');

// 思路二：
// 2.1.回文第一项字符与最后一项字符相等
