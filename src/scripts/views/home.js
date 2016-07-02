var tplHome = require('../templates/home.string');

SPA.defineView('home', {
  html: tplHome,
  // 载入插件列表
  // delegated 实现tab事件的绑定
  plugins: ['delegated',{
    name: 'avalon',
    options: function (vm) {
      vm.livelist = [];
    }
  }],
  // 绑定tab 事件
  bindActions: {
    'gotodetail': function (e, data) {
      SPA.open('detail', {
        param: {
          data: data
        }
      });
    }
  },
  
  init: {
    vm: null,
    livelistArray: [],
    //homeSwiper: null,
    //homeHotSwiper: null, 
    formatData: function (arr) {
      var tempArr = [];
//    for (var i = 0; i < Math.ceil(arr.length/2); i++) {
//      tempArr[i] = [];
//      tempArr[i].push(arr[2*i]);
//      tempArr[i].push(arr[2*i+1]);
//    }
      for (var i = 0; i < arr.length; i++) {
        tempArr[i] = [];
        tempArr[i].push(arr[i]);
      }
      return tempArr;
    }
  },
  bindEvents: {
  	'beforeShow': function () {
      var that = this;
      // 获得vm对象
      that.vm = that.getVM();
      $.ajax({
        url: '/bkHouse/mock/livelist.json',
        type: 'get',
        data:{
          rtype: 'origin'
        },
        success: function (rs) {
          that.livelistArray = rs.data;
          that.vm.livelist = that.formatData(rs.data);
          that.lSwiper = new Swiper('.guide1', {
		        loop: false,
		        //slidesPerView:2.5,
		        freeMode : true,
		        freeModeMomentum : false
		      });
		      
		      //scroll滚动
//        setTimeout(function(){
//        console.log(15);
//        var lifenavScroll = that.widgets['lifenav-scroll'];
//    		lifenavScroll.options.scrollX = true;
//    		lifenavScroll.options.scrollY = false;
//    		console.log(13);
//       },0);
         
        }
      });
      
    },
     
        
    'show': function () {
      var that = this;
      that.mySwiper = new Swiper('#guide-swiper', {
        loop: true,
        autoplay:1000, 
		    // 如果需要分页器
		    pagination: '.swiper-pagination',
      });
      that.lSwiper = new Swiper('.guide1', {
        loop: false,
        //autoplay:1000,
        //slidesPerView:3.5,
        freeMode : true,
        freeModeMomentum : false
		    // 如果需要分页器
		    //pagination: '.swiper-pagination',
      });
 
      // 下拉刷新，上拉加载更多
      var scrollSize = 30;
      var myScroll = this.widgets.homeHotScroll;
      myScroll.scrollBy(0, -scrollSize);
      var head = $('.head img'),
          topImgHasClass = head.hasClass('up');
      var swords = $('.head span').text();  
      var foot = $('.foot img'),
          bottomImgHasClass = head.hasClass('down');
          myScroll.on('scroll', function () {
          var y = this.y,
              maxY = this.maxScrollY - y;
          if (y >= 0) {
              !topImgHasClass && head.addClass('up');
              setTimeout(function () {
                 $('.head span').html("放开刷新...");
                 return '';
              }, 700);
             
          }else{
          	$('.head span').html("下拉刷新...");
          	$('.foot span').html("上拉刷新...");
          }
          if (maxY >= 0) {
              !bottomImgHasClass && foot.addClass('down');
              return '';
          }
      });
      
      myScroll.on('scrollEnd', function () {
      	  $('.head span').html("正在加载...");
      	  $('.foot span').html("正在加载...");
          if (this.y >= -scrollSize && this.y < 0) {
              myScroll.scrollTo(0, -scrollSize);
              head.removeClass('up');
              
          }else if (this.y >= 0) {
							head.attr('src', '/bkHouse/images/ajax-loader.gif');
              //$('.head span').html("放开刷新...");
              //TODO ajax下拉刷新数据
              $.ajax({
                url: '/bkHouse/mock/livelist-refresh.json',
                data: {
                  rtype: 'refresh'
                },
                success: function (rs) {
                  var newArray = rs.data.concat(that.livelistArray);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;
                  
                  myScroll.scrollTo(0, -scrollSize);
                  head.removeClass('up');
                  head.attr('src', '/bkHouse/images/default_ptr_rotate.png');
                  
                  that.lSwiper = new Swiper('.guide1', {
						        loop: false,
						        //autoplay:1000,
						        //slidesPerView:3.5,
						        freeMode : true,
						        freeModeMomentum : false
								    // 如果需要分页器
								    //pagination: '.swiper-pagination',
						      });
                }
              });
									
//            setTimeout(function () {
//                myScroll.scrollTo(0, -scrollSize);
//                head.removeClass('up');
//                head.attr('src', '/bkHouse/images/arrow.png');
//            }, 1000);
          } 
          
          var maxY = this.maxScrollY - this.y;
          var self = this;
          if (maxY > -scrollSize && maxY < 0) {
              myScroll.scrollTo(0, self.maxScrollY + scrollSize);
              foot.removeClass('down');
    
              
          } else if (maxY >= 0) {
              foot.attr('src', '/bkHouse/images/ajax-loader.gif');
               $.ajax({
                url: '/bkHouse/mock/livelist-more.json',
                data: {
                  rtype: 'more'
                },
                success: function (rs) {
                  var newArray = that.livelistArray.concat(rs.data);
                  that.vm.livelist = that.formatData(newArray);
                  that.livelistArray = newArray;
                  
                  myScroll.refresh();

                  myScroll.scrollTo(0, self.y + scrollSize);
                  foot.removeClass('down');
                  foot.attr('src', '/bkHouse/images/default_ptr_rotate.png');
                  
                  that.lSwiper = new Swiper('.guide1', {
						        loop: false,
						        //autoplay:1000,
						        //slidesPerView:3.5,
						        freeMode : true,
						        freeModeMomentum : false
								    // 如果需要分页器
								    //pagination: '.swiper-pagination',
						      });
                }
              });
//            setTimeout(function () {
//               myScroll.scrollTo(0, self.y + scrollSize);
//               foot.removeClass('down');
//               foot.attr('src', '/course-footballSNS/images/arrow.png');
//           }, 1000);
          }
      });   
    }
  },
  
  
  
})