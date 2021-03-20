import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'lib-flexible/flexible'

import axios from 'axios'
import VueAxios from 'vue-axios'

//导入vant组件
import {
  Button,
  Field,
  NavBar,
  CellGroup,
  Popup,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  Lazyload,
  Toast,
  Empty,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Stepper,
  Sidebar,
  SidebarItem,
  Tab,
  Tabs,
  Icon,
  Checkbox,
  CheckboxGroup
} from 'vant'

//注册
Vue
  .use(Button)
  .use(Field)
  .use(NavBar)
  .use(CellGroup)
  .use(Popup)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(SwipeItem)
  .use(Swipe)
  .use(Lazyload)
  .use(Toast)
  .use(Empty)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Stepper)
  .use(Sidebar)
  .use(SidebarItem)
  .use(Tab)
  .use(Tabs)
  .use(Icon)
  .use(Checkbox)
  .use(CheckboxGroup)
// 
Vue.use(VueAxios, axios)

Vue.config.productionTip = false
// import { from } from 'core-js/fn/array'


//请求之前执行, 请求拦截器
axios.interceptors.request.use(config => {

  // console.log('config.data ==> ', config.data);

  if (config.method === 'post') {

    //序列化post请求参数
    let paramsString = '';
    for (let key in config.data) {
      paramsString += `${key}=${config.data[key]}&`;
    }

    config.data = paramsString.slice(0, -1);

    // console.log('config.data ==> ', config.data);

  }

  //必须返回config
  return config;

})

Vue.prototype.baseUrl1 = 'http://www.kangliuyong.com:10002';
Vue.prototype.appkey = "U2FsdGVkX19WSQ59Cg+Fj9jNZPxRC5y0xB1iV06BeNA=";

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
