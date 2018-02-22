let vm = new Vue({
  el:'#app',
  data:{
    member:'',
    index:3,
    items:[
      {id:0,text: 'vegetables'},
      {id:1,text: 'friut'},
      {id:2,text: 'Something else'},
    ],
  },
  methods:{
    submit:function() {
      if(!this.member){
        return;
      }
      const obj = Object.assign({},{id:this.index,text:this.member});
      this.items.push(obj);
      this.index += 1;
      this.member = '';
    }
  },
  components:{
    'todo':{
      props:['obj'],
      template:`<li>{{obj.text}}</li>`,
    }
  }
});
