<template>
  <div>
    <div>
      <router-view />
    </div>
    <van-tabbar v-model="active" active-color="#704d2d" inactive-color="#8a8a8a" route>
      <van-tabbar-item v-for="(item ,index) in tabArr" :key="index" :to="item.path" :badge="item.badge>0 ? item.badge:''">
        <span>{{item.title}}</span>
        <template #icon="props">
          <img :src="props.active ? item.icon.active : item.icon.inactive" />
        </template>
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: "Tabbar",
  data() {
    return {
      active: 0,
      tabArr: [
        {
          title: "首页",
          icon: {
            active: require("../assets/images/home-active-ico.png"),
            inactive: require("../assets/images/home-ico.png"),
          },
          path:'/home'
        },
        {
          title: "菜单",
          icon: {
            active: require("../assets/images/menu-active-ico.png"),
            inactive: require("../assets/images/menu-ico.png"),
          },
          path:'/menu'
        },
        {
          title: "购物袋",
          icon: {
            active: require("../assets/images/shopbag-active-ico.png"),
            inactive: require("../assets/images/shopbag-ico.png"),
          },
          badge: 1,
          path:'/shopbag'
        },
        {
          title: "我的",
          icon: {
            active: require("../assets/images/my-active-ico.png"),
            inactive: require("../assets/images/my-ico.png"),
          },
          path:'/user'
        },
      ],
    };
  },
  methods: {
    tggleTabbar () {
      console.log('1');
    }
  }
};
</script>