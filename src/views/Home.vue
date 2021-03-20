<template>
  <div class="home">
    <div class="search-box">
      <van-search
        v-model="keyword"
        placeholder="请输入搜索关键词"
        @search="onSearch"
        shape="round"
        background="linear-gradient(to bottom, #704d2d 0%,#b97f4a 100%)"
      />
    </div>
    <div class="list" v-if="isShow">
      <div class="list-item" v-for="item in searchlist" :key="item.pdi" @click="onitem($event,item.pid)" data-pid="item.pid">
        <div>{{item.name}}</div>
        <div>&yen;{{item.price}}</div>
      </div>
    </div>
    <div class="body-box" v-else>
      <div class="banner">
        <van-swipe style="height: 200px" :autoplay="2000">
          <van-swipe-item v-for="(item, i) in bannerData" :key="i"
            ><img class="auto-img" :src="item.bannerImg" alt="图片加载失败"
          /></van-swipe-item>
        </van-swipe>
      </div>
      <div class="hot-title">
        <span>热卖推荐</span>
      </div>
      <div class="hot">
        <Product
          v-for="(item, i) in hotListData"
          :key="i"
          :imgUrl="item.smallImg"
          :name="item.name"
          :enName="item.enname"
          :price="item.price"
          :pid="item.pid"
        />
      </div>
    </div>
  </div>
</template>

<script>
import "../assets/less/home.less";
import Product from "../components/Productitem";
export default {
  name: "Home",
  data() {
    return {
      isShow: false,
      bannerData: [],
      hotListData: [],
      keyword: '',
      searchlist: []
    };
  },
  components: {
    Product,
  },
  methods: {
    // 去详情页面
    onitem (e,value) {
      this.isShow = false
      this.$router.push({path:`/details/${value}`})
    },
    // 搜索方法
    onSearch () {
      this.axios({
        url: this.baseUrl1 + '/search',
        method: 'GET',
        params: {
          appkey: this.appkey,
          name: this.keyword
        }
      }).then( res => {
        this.searchlist = res.data.result
        this.isShow = true
        // console.log(res);
      } )
    },
    banner() {
      // 加载提示信息
      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 0,
      // });

      this.axios({
        method: "GET",
        url: this.baseUrl1 + "/banner",
        params: {
          appkey: this.appkey,
        },
      }).then((res) => {
        // console.log(res.data.result);
        for (let k in res.data.result) {
          // console.log(res.data.result[k]);
          this.bannerData.push(res.data.result[k]);
          // console.log(this.bannerData);
        }
      });
    },
    hotData() {
      // 加载提示信息
      // this.$toast.loading({
      //   message: "加载中...",
      //   forbidClick: true,
      //   duration: 0,
      // });

      this.axios({
        method: "GET",
        url: this.baseUrl1 + "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: 1,
        },
      }).then((res) => {
        // console.log("🚀 ~ hot ~ res", res);
        if (res.data.code == 500) {
          // console.log(res.data.result);
          // this.$toast.clear();
          this.hotListData = res.data.result;
          // console.log("🚀 ~ hotData ~ this.hotListData", this.hotListData);
        }
      });
    },
  },
  watch: {
    keyword () {
      if(this.keyword == '') {
        this.isShow = false
      }
    }
  },
  created() {
    this.banner();
    this.hotData();
  },
};
</script>