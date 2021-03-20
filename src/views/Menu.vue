<template>
  <div class="menu">
    <div class="left">
      <van-sidebar v-model="activeKey" @change="onChange">
        <van-sidebar-item
          v-for="(item, i) in menuTitle"
          :key="i"
          :title="item.title"
        />
      </van-sidebar>
      <div class="list-box">
        <List
          v-for="(item, i) in hotListData"
          :key="i"
          :title="item.name"
          :enname="item.enname"
          :smallimg="item.smallImg"
          :price="item.price"
          :pid="item.pid"
        />
      </div>
    </div>
  </div>
</template>

<script>
import List from "../components/List";
export default {
  name: "Menu",
  data() {
    return {
      activeKey: 0,
      menuTitle: [
        {
          title: "推荐",
          ico: "",
        },
        {
          title: "拿铁",
          ico: "",
        },
        {
          title: "咖啡",
          ico: "",
        },
        {
          title: "瑞纳冰",
          ico: "",
        },
      ],
      hotListData: [],
      menuType: 0,
    };
  },
  components: {
    List,
  },
  methods: {
    onChange(index) {
      // console.log(index);
      this.menuType = index;
    },
  },
  created() {
    this.axios({
      method: "GET",
      url: this.baseUrl1 + "/typeProducts",
      params: {
        appkey: this.appkey,
        key: "isHot",
        value: 1,
      },
    }).then((res) => {
      if (res.data.code == 500) {
        // this.$toast.clear();
        this.hotListData = res.data.result;
      }
    });
  },
  watch: {
    menuType() {
      let type = [1, "coffee", "latte", "fruit_tea"];
      this.axios({
        method: "GET",
        url: this.baseUrl1 + "/typeProducts",
        params: {
          appkey: this.appkey,
          key: "isHot",
          value: type[this.menuType],
        },
      }).then((res) => {

        if (res.data.code == 500) {
          // 如果不是热门商品则需要进行过滤
          if (this.menuType != 0) {
            let data = res.data.result;
            let newlist = [];
            for (let k in data) {
              if (data[k].type == type[this.menuType]) {
                newlist.push(data[k]);
              }
            }

            this.hotListData = newlist;
          }else{
            this.hotListData = res.data.result;
          }
        }

      });
    },
  },
};
</script>
<style lang="less" scoped>
.menu {
  width: 100%;
  position: relative;
  .left {
    width: 100%;
    position: absolute;
  }
  .list-box {
    width: ~"calc(100% - 80px)";
    // height: 100%;
    // background: yellow;
    // border: 1px solid red;
    position: absolute;
    left: 80px;
    top: 0;
  }
  img {
    width: 30px;
  }
  /deep/ .van-tabs--line .van-tabs__wrap {
    height: 80px;
  }
}
</style>