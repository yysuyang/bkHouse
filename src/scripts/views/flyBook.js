var tplfly = require('../templates/flyBook.string');

SPA.defineView('flyBook', {
  html: tplfly,
  plugins: ['delegated', {
    name: 'avalon',
    options: function (vm) {
      //vm.imgsrc = "";
      //vm.title = "";
      //vm.detail = "";
      vm.isShowLoading = true;
    }
  }],
  bindEvents: {
    'show': function () {
      var vm = this.getVM();
      setTimeout(function () {
        vm.isShowLoading = false;
      }, 3000);
    }
  }
})