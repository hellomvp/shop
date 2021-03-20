<template>
  <div class="shopbag">
    <van-nav-bar
      title="购物袋"
      left-text="返回"
      right-text="编辑"
      left-arrow
      @click-left="goback"
    />
    <Productlist />
    <Productlist />
    <Productlist />
  </div>
</template>

<script>
import Productlist from '../components/Productlist'
export default {
  name: "Shopbag",
  components:{
    Productlist
  },
  methods: {
    // 获取购物车数据
    getShopbag () {
      // 获取token
      let token = localStorage.getItem('token')

      this.axios({
        method: 'GET',
        url: this.baseUrl1+'/shopcartCound',
        params:{
          appkey: this.appkey,
          tokenString: token
        }
      }).then(res => {
        console.log('res => ',res);
      }).catch(err => {
        console.log(err);
      })
    },
    // 返回
    goback () {
      this.$router.go(-1)
    },
  },
  created(){
    // 调用获取购车数据方法
    this.getShopbag()
  },
  beforeRouteEnter(to, from, next) {
    // 导航守卫，进入该组件的对应路由时调用
    next((vm) => {
      // 通过 `vm` 访问组件实例
      // 获取token
      let userInfo = localStorage.getItem('token');
      // 判断token在不在
      if (userInfo == null) {
        // 如果不在跳到登陆页面
        vm.$router.replace("/login");
      }
    });
  },
};
</script>