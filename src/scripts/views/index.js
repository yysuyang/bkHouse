
// 引入模板
var tplIndex = require('../templates/index.string');

// 引用公共方法
var util = require('../utils/fn.js');
// 定义视图
SPA.defineView('index', {
   //装载html模板
  html: tplIndex,
  // 载入插件列表
  // delegated 实现tab事件的绑定
  plugins: ['delegated'],
  // 定义子视图
  modules: [{
    name: 'content', // 子视图的名字，用作后边引用的句柄
    views: ['home','flyBook','message','my'], // 定义子视图的列表数组
    defaultTag: 'home', // 定义默认视图
    container: '.l-container' // 子视图的容器
  }],
  // 绑定tab 事件
  bindActions: {
    'switch.tabs': function (e, data) {
      // 设置当前 tab 高亮
      util.setFocus(e.el);
      // 切换子视图
      this.modules.content.launch(data.tag);
    }
  },

})


