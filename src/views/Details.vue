<template>
  <div class="details">
    <van-nav-bar
      title="商品详情"
      left-text="返回"
      right-text="按钮"
      left-arrow
      @click-left="goback"
    />
    <div class="det-bg">
      <img class="auto-img" :src="information.large_img" alt="" />
    </div>
    <div class="det-box">
      <div id="title-box">
        <div class="title">
          <div class="name">{{ information.name }}</div>
          <div class="en-name">{{ information.enname }}</div>
        </div>
        <div class="price">&yen;{{ information.price }}</div>
      </div>
      <div class="parameter-box">
        <div class="par-type" v-for="(item, i) in information.type" :key="i">
          <div class="par-title">{{ item.title }}</div>
          <div
            class="par-select"
            v-for="(list, i) in item.typelist"
            :key="i"
            :class="{ active: item.currentIndex == i }"
            @click="active(item, i)"
          >
            {{ list }}
          </div>
        </div>
        <div class="select-num">
          <div class="num-title">选择数量</div>
          <van-stepper
            v-model="value"
            theme="round"
            button-size="22"
            disable-input
          />
        </div>
      </div>
      <div class="describe-box">
        <div class="des-title">商品描述</div>
        <div class="des">1、{{ information.desc }}</div>
      </div>
    </div>
    <van-goods-action>
      <van-goods-action-icon icon="cart-o" text="购物袋" />
      <van-goods-action-icon
        icon="like-o"
        
        :text="islike ? '已收藏' : '收藏'"
        :color="islike ? '#f12e44' : '#666'"
        @click="like"
      />
      <van-goods-action-button
        color="#bca888"
        type="warning"
        text="加入购物车"
        @click="addCat"
      />
      <van-goods-action-button color="#704d2d" type="danger" text="立即购买" />
    </van-goods-action>
  </div>
</template>

<script>
import "../assets/less/details.less";
export default {
  name: "Details",
  data() {
    return {
      //
      information: {},
      // 商品数量
      value: 0,
      cream: 0,
      // 商品id
      pdi: "",
      // 参数
      rule: "",
      // 收藏状态
      islike: false,
    };
  },
  comments: {},
  methods: {
    // 获取商品详情数据
    getDetailsData() {
      // 调用加载动画
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      this.axios({
        method: "GET",
        url: this.baseUrl1 + "/productDetail",
        params: {
          appkey: this.appkey,
          pid: this.$route.params.pid,
        },
      })
        .then((res) => {
          // console.log(res);
          if (res.data.code == 600) {
            let data = res.data.result[0];
            let arr = ["cream", "sugar", "milk", "tem"];

            data.type = [];

            arr.forEach((item) => {

              if (data[item] != "") {
                // console.log(item);
                let typedata = {
                  title: data[item + "_desc"],
                  currentIndex: 0,
                  typelist: data[item].split("/"),
                };
                data.type.push(typedata);
              }

            });
            // 关闭加载动画
            this.$toast.clear();

            this.information = data;
          } else {
            console.log("请求失败");
          }
          console.log(" this.information", this.information);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    // 添加购物袋
    addCat() {
      let tokenString = localStorage.getItem("token");

      if (!tokenString) {
        return false;
      }

      let rules = [];
      // this.information
      this.axios({
        method: "POST",
        url: this.baseUrl1 + "/addShopcart",
        data: {
          appkey: this.appkey,
          count: this.value,
          pid: this.$route.params.pid,
          rule: rules,
          tokenString,
        },
      })
        .then((res) => {
          console.log(res);
          if (res.data.code == 3000) {
            console.log("1");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
    active(item, i) {
      item.currentIndex = i;
    },
    // 返回
    goback() {
      this.$router.go(-1);
    },
    // 收藏
    like() {
      // 获取token
      let token = localStorage.getItem("token");

      if (!token) {
        // console.log("浏览器token不存在");
        return this.$router.push({ name: "Login" });
      }
      // 记录收藏状态
      let islike = this.islike
      // 记录
      let likeurl = islike ? '/like' :'/notlike'
      console.log(likeurl);
      // 添加(取消)收藏
      this.axios({
        //请求方式
        method: "POST",
        url: this.baseUrl1 + likeurl,
        data: {
          appkey: this.appkey,
          pid: this.pid,
          tokenString: token,
        },
      })
        .then((res) => {
          console.log(res);
          let code = res.data.code
          if (code == 800 || code == 900) {
            console.log(res.data.msg);
            this.islike = !this.islike;
          }
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    // 截取pid
    this.pid = this.$route.params.pid;
    // 调用获取商品详情方法
    this.getDetailsData();
  },
};
</script>