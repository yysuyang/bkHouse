
// 引入spa类库
require('./lib/spa.min.js');
require('./lib/swiper-3.3.1.min.js');
// 引入views
require('./views/home.js');
require('./views/login.js');
require('./views/register.js');
require('./views/detail.js');
require('./views/guide.js');
require('./views/flyBook.js');
require('./views/message.js');
require('./views/my.js');
require('./views/index.js');

SPA.config({
  indexView: 'guide'
});

