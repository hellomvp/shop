<template>
  <div class="login">
    <RXnav />
    <div class="login-box">
      <div class="login-title">
        <div class="login-zh-title">欢迎回来!</div>
        <div class="login-en-title">Please login to your accounts</div>
      </div>
      <div class="user-box">
        <van-field v-model="user.tal" label="电话" placeholder="请输入手机号" />
        <van-field
          :type="isOpen ? 'text' : 'password'"
          v-model="user.password"
          label="密码"
          placeholder="请输入密码"
          :right-icon="isOpen ? 'eye-o' : 'closed-eye'"
          @click-right-icon="isOpen = !isOpen"
        />
        <div class="forget"><span>忘记密码?</span></div>
      </div>
      <div class="but-box">
        <van-button
          class="login-but"
          @click="login"
          type="default"
          color="#704d2d"
          block
          round
          >登录</van-button
        >
        <van-button
          class="register-but"
          type="default"
          block
          round
          @click="register"
          >注册</van-button
        >
      </div>
    </div>
    <van-popup v-model="show" position="bottom" closeable round>
      <div class="register-box">
        <div class="register-title"><span>注册</span></div>
        <van-field
          type="text"
          v-model="reg.userName"
          label="昵称"
          placeholder="请输入昵称"
        />
        <van-field v-model="reg.tal" label="电话" placeholder="请输入手机号" />
        <van-field
          type="password"
          v-model="reg.password"
          label="密码"
          placeholder="请输入密码"
        />
      </div>
      <div class="but-box">
        <van-button
          class="login-but"
          type="default"
          color="#704d2d"
          block
          round
          @click="sign"
          >立 即 注 册</van-button
        >
      </div>
    </van-popup>
  </div>
</template>

<script>
import "../assets/less/login.less";
import { utils } from "../assets/js/tool.js";
// import { Toast } from 'vant';
import RXnav from "../components/RXnav";
export default {
  name: "Login",
  data() {
    return {
      user: {
        //登录信息
        tal: "",
        password: "",
      },
      reg: {
        //注册信息
        tal: "",
        password: "",
        userName: "",
      },
      isOpen: true,
      show: false,
    };
  },
  methods: {
    register() {
      this.show = true;
    },
    login() {
      let tal = this.user.tal
      if(tal == '') {
        this.$toast.fail('账号不能为空');
        return false
      }
      //登录
      this.axios({
        method: "POST",
        url: this.baseUrl1 + "/login",
        data: {
          appkey: this.appkey,
          phone: this.user.tal,
          password: this.user.password,
        },
      }).then((res) => {
        console.log(res);
        if (res.data.code == 200) {

          localStorage.setItem("token", res.data.token);
          this.$toast.success("登录成功");
          this.$router.push({name:'Home'})
        }
        // 提示错误信息
        this.$toast.fail(res.data.msg);
      }).catch(err => {
        console.log(err.data);
      })
    },
    sign() {
      // 注册

      let obj = {
        tal: {
          value: this.reg.tal,
          reg: /^1[3-9]\d{9}$/,
          errorMsg: "请输入正确的手机号",
        },
        password: {
          value: this.reg.password,
          reg: /^[A-Za-z]\w{5,15}$/,
          errorMsg: "密码需以字母开头且不少于6位数",
        },
        userName: {
          value: this.reg.userName,
          reg: /^[\u4e00-\u9fa5A-Za-z]{1,8}$/,
          errorMsg: "昵称可以是中文或英文,最多不超过8位字符",
        },
      };
      // 加载提示信息
      this.$toast.loading({
        message: "加载中...",
        forbidClick: true,
        duration: 0,
      });

      if (!utils.validForm(obj)) {
        return;
      }

      this.axios({
        method: "post",
        url: this.baseUrl1 + "/register",
        data: {
          appkey: this.appkey,
          nickName: this.reg.userName,
          password: this.reg.password,
          phone: this.reg.tal,
        },
      }).then((res) => {
        // console.log(res);
        if (res.data.code == 100) {
          this.$toast.clear();

          this.$toast.success("注册成功");

          // 关闭弹窗
          this.show = false;
          // this.login();
          this.user.tal = this.reg.tal;
        }
      });
    },
  },
  components: {
    RXnav,
  },
};
</script>