var tplDetail = require('../templates/detail.string');

SPA.defineView('detail',{ 
  html:tplDetail,
  plugins: ['delegated',
  {
    name: 'avalon',
    options: function (vm) {
        vm.imgsrc = "";
        vm.ptext1 = "";
        vm.ptext2 = "";
        vm.icon1 = "";
    }
  }
  ],
  
bindActions: {
 'back': function () {
    this.hide();
  }
},

//	bindEvents: {
//	    'show': function () {
//	      var vm = this.getVM();
//	      var d = this.param.data;
//	      console.log(d);
//	
//	      $.ajax({
//	        url: '/api/getLiveDetail.php',
//	        data: {
//	          id: d.id
//	        },
//	        success: function (rs) {
//	            vm.imgsrc = rs.data.imgsrc;
//	            vm.ptext1 = rs.data.ptext1;
//	            vm.ptext2 = rs.data.ptext2;
//	            vm.icon1 = rs.data.icon1;
//	        }
//	      })
//	    }
//	}
});