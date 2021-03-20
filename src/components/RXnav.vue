<template>
  <div class="rxnav">
    <van-nav-bar right-text="先逛一逛" left-arrow @click-right="goHome">
      <template #left>
        <div class="nav-logo">
            <div class="logo-ico">
              <img class="img-auto" src="../assets/images/coffee_logo.png" alt="">
            </div>
            <div class="logo-title">Encounter Coffee</div>
        </div>
      </template>
    </van-nav-bar>
  </div>
</template>

<script>
import '../assets/less/nav.less'
export default {
  name:'RXnav',
  methods:{
    goHome(){
      // 返回主页
      this.$router.push({
        path:'/'
      })
    }
  }
};
</script>