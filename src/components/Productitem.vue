<template>
  <div class="product" @click="goDetails">
    <div class="hot-ico">
      <img class="auto-img" src="../assets/images/hot-ico.png" alt="" />
    </div>
    <div class="pro-img">
      <img class="auto-img" :src="imgUrl" alt="" />
    </div>
    <div class="pro-box">
      <div class="pro-name">{{ name }}</div>
      <div class="pro-eng-name">{{ enName }}</div>
      <div class="pro-price">&yen;{{ price }}</div>
    </div>
  </div>
</template>
<script>
import "../assets/less/product.less";
export default {
  name: "product",
  props: {
    imgUrl: String,
    name: String,
    enName: String,
    price: String,
    pid: String,
  },
  methods: {
    goDetails() {
      // 路由带参跳转
      this.$router.push({path:`/details/${this.pid}`})
    },
  },
};
</script>