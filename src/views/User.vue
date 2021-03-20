<template>
  <div class="user">
    <div class="bg-box">
      <div class="bg"></div>
    </div>
    <div class="content">
      <div class="user-mes">
        <div class="icon">
          <img
            class="auto-img"
            src="../assets/images/user-bg.jpg"
            alt="图片找不到"
          />
        </div>
        <div class="user-name">泥泥</div>
      </div>
      <div class="list">
        <div class="list-item">
          <div class="title">个人资料</div>
          <div class="icon"></div>
        </div>
        <div class="list-item">
          <div class="title">我的订单</div>
          <div class="icon"></div>
        </div>
        <div class="list-item" @click="likeList">
          <div class="title">我的收藏</div>
          <div class="icon"></div>
        </div>
        <div class="list-item">
          <div class="title">地址管理</div>
          <div class="icon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/user.less";
export default {
  name: "User",
  data() {
    return {
      list: [
      ],
    };
  },
  methods: {
    // 获取收藏列表数据
    getLikeData () {
      let token = localStorage.getItem('token')
      this.axios({
        method: 'GET',
        url: this.baseUrl1 + '/findAllLike',
        params: {
          appkey: this.appkey,
          tokenString: token
        }
      }).then(res => {
        if(res.data.code == 2000) {
          console.log('1');
        }
        console.log(res);
      })
    },
    // 转跳收藏页面
    likeList () {
      this.$router.push({name:'like'})
    }
  },
  created () {
    // 调用获取收藏列表数据方法
    this.getLikeData()
  },
  beforeRouteEnter(to, from, next) {
    // 导航守卫，进入该组件的对应路由时调用
    next((vm) => {
      // 通过 `vm` 访问组件实例
      let userInfo = localStorage.getItem('token');
      if (userInfo == null) {
        vm.$router.replace("/login");
      }
    });
  },
};
</script>