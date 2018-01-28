// jshint esversion: 6
let todolist = {};
todolist.parts = {
  _date: document.querySelector('.today_date'),
  _new_mission: document.querySelector('span.add_mission')
};

todolist.fn = {
  _runDate: (function() {
    let localDate = new Date(),
      year = localDate.getFullYear(),
      month = localDate.getMonth() + 1,
      date = localDate.getDate(),
      output = year + "年" + month + "月" + date + "日";
    todolist.parts._date.innerText = output;
  })(),
  _add_mission: function() {

  }
};
