<template>
  <div class="main">
    <!-- <van-search
      v-model="value"
      placeholder="请输入搜索关键词"
      shape="round"
      background="linear-gradient(to bottom, #704d2d 0%,#b97f4a 100%)"
    /> -->
    <Tabbar></Tabbar>
    <!-- <div class="banner">
      <van-swipe style="height: 200px">
        <van-swipe-item><img src="../assets/images/coffee_logo.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../assets/images/coffee_logo.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../assets/images/coffee_logo.png" alt=""></van-swipe-item>
        <van-swipe-item><img src="../assets/images/coffee_logo.png" alt=""></van-swipe-item>
      </van-swipe>
    </div> -->
  </div>
</template>

<script>
import "../assets/less/main.less";
import Tabbar from "./Tabbar";
export default {
  name: "Home",
  components: {
    Tabbar,
  },
};
</script>