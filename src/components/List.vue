<template>
  <div class="list" @click="goDetails">
    <div class="img">
      <img class="auto-img" :src="smallimg" alt="" />
    </div>
    <div class="title">
      <div class="zh-name">{{ title }}</div>
      <div class="en-name">{{ enname }}</div>
    </div>
    <div class="price">&yen;{{ price }}</div>
  </div>
</template>
<script>
import "../assets/less/list.less";
export default {
  name: "List",
  props: ["title", "enname", "smallimg", "price","pid"],
  methods: {
    goDetails() {
      // 路由带参跳转
      this.$router.push({ path: `/details/${this.pid}` });
    },
  },
};
</script>