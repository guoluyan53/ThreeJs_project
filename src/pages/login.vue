<template>
  <div id="login">
    <div class="main">
      <div class="back">
        <a class="back-img"  @click="back()"></a>
        <div class="back-text">Back</div>
      </div>

      <div class="formbox">
        <div class="title">
          <div class="login com" @click="show = true" ref="login">登录</div>
          <div class="resign com" @click="show = false" ref="sign">注册</div>
        </div>
        <!-- 登录部分 -->
        <div class="loginbox" v-show="show">
          <div class="login-line">
            <span class="user-icon"></span>
            <input type="text" class="input" v-model="loginUser" placeholder="请输入用户名" />
          </div>
          <div class="login-line">
            <span class="password-icon"></span>
            <input type="password" class="input" v-model="loginPsw" placeholder="请输入您的密码" />
          </div>
          <!-- <div class="wangjimima">忘记密码</div> -->
          <div class="btn">
            <button @click="login()">登录</button>
          </div>
        </div>

        <!-- 注册部分 -->
        <div class="resignbox" v-show="!show">
          <div class="login-line">
            <span class="user-icon"></span>
            <input type="text" class="input" v-model="signUser" placeholder="用户名" />
          </div>
          <div class="login-line">
            <span class="mail-icon"></span>
            <input type="text" class="input" v-model="signEmail" placeholder="邮箱" ref="email" @blur="email()"/>
          </div>
          <div class="login-line">
            <span class="password-icon"></span>
            <input type="password" class="input" v-model="signPsw" placeholder="密码" ref="psw" @blur="psw()"/>
          </div>
          <div class="login-line">
            <span class="checkpassword-icon"></span>
            <input type="password" class="input" v-model="signMake" placeholder="确认密码" ref="sure" @blur="sure()"/>
          </div>
          <div class="btn">
            <button class="btn" @click="sign()">注册</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 右边的文字 -->
    <div class="text">Start a learning journey</div>
  </div>
</template>

<script>
import {hex_md5} from '../assets/js/md5'
// 导入函数要用{}包起来
export default {
  name: "login",
  data() {
    return {
      show: true,
      loginUser: "",
      loginPsw: "",
      signUser: "",
      signEmail: "",
      signPsw: "",
      signMake: "",
    };
  },
  methods: {

    back(){
      this.$router.push("/");
    },
    // 登录
    login(){
      if(!this.loginPsw || !this.loginUser){
        alert('请确认信息填写完整并无误！');
      }else{
        alert("登录成功！");
        this.$router.push("/map")
      }
      // else{
      //   this.$axios({
      //     // url: 'http://120.77.149.245:8080/api_v1/user/login',
      //     url:'/loginApi/user/login',
      //     method: 'post',
      //     data:{
      //       loginName: this.loginUser,
      //       loginPwd: hex_md5(this.loginPsw),
      //     }
      //   }).then(res =>{
      //     // console.log(res);
      //     this.clear();
      //     if(res.data.code == 200){
      //       alert("提交成功！");
      //       //提交成功后页面跳转
      //       this.$router.push("/map");       
      //     }
      //     else{
      //       alert(res.data.message);
      //     }
      //   }).catch(err =>{
      //     console.log(err);
      //   })
      // }
    },

    // 注册
    sign(){
      if(!this.signEmail || !this.signPsw  || !this.signUser || !this.signMake){
        alert('请确认信息填写完整并无误！');
      }else{
        alert("注册成功！");
        this.clear();
        this.show=true;
      }
      // else{
      //   this.$axios({
      //     // url: 'http://120.77.149.245:8080/api_v1/user/register',
      //     url:'/loginApi/user/register',
      //     method: 'post',
      //     data:{
      //       loginName: this.signUser,
      //       loginPwd: hex_md5(this.signPsw),
      //       userName: this.signUser,
      //       email: this.signEmail,
      //     }
      //   }).then(res =>{
      //     console.log(res);
      //     this.clear();
      //     this.show = true;
      //     if(res.data.code == 200){
      //       alert("提交成功！");     
      //     }
      //     else{
      //       alert(res.data.message);
      //     }
      //   }).catch(err =>{
      //     console.log(err);
      //   })
      // }
    },

    // 页面逻辑
    // 邮箱格式校验
    email(){
      let yanz = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(this.signEmail);
      if(this.signEmail && !yanz){
        alert('邮箱格式不符合要求！');
        this.signEmail = "";
        this.$refs.email.focus();
      }
    },

    // 限制密码为长度6-12的数字或字母，并加密
    psw(){
      let yanz = /^[A-Za-z0-9]{6,12}$/.test(this.signPsw);
      if(this.signPsw && !yanz){
        alert('密码格式不符合要求！');
        this.signPsw = "";
        this.$refs.psw.focus();
      }
    },

    // 确认密码
    sure(){
      if(this.signMake && this.signMake != this.signPsw){
        alert('密码不一致！');
        this.signMake = "";
        this.$refs.sure.focus();
      }
    },

    // 清空所有的input框
    clear(){
      this.loginUser = "";
      this.loginPsw = "";
      this.signMake = "";
      this.signPsw = "";
      this.signEmail = "";
      this.signUser = "";
    }
  },
  watch: {
    show: function (value) {
      //传过来的值为show的值
      // console.log(value);
      if (value == true) {
        this.$refs.sign.style.color = "#8D9AD6";
        this.$refs.login.style.color = "white";
      }else{
        this.$refs.login.style.color = "#8D9AD6";
        this.$refs.sign.style.color = "white";
      }
    },
  },
};
</script>

<style scoped>
.main {
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/images/loginbg.jpg");
  background-size: cover;
  /* background-position: center center; */
  color: white;
}
/* 登录 */
.back {
  width: 100%;
  height: 2rem;
  padding: 2rem 5rem;
  font-size: 1rem;
  box-sizing: border-box;
  font-size: 1.2rem;
}
.back-img {
  display: inline-block;
  vertical-align: middle;
  cursor: pointer;
  width: 1.5rem;
  height: 1.5rem;
  background: url("../assets/images/back.png");
  background-size: cover;
}
.back-text {
  display: inline-block;
  vertical-align: middle;
  margin-left: 0.5rem;
}
.formbox {
  width: 23rem;
  /* background-color:rgba(66,255,255,0.2); */
  background-image: linear-gradient(
    rgba(66, 255, 255, 0.2),
    rgba(6, 97, 182, 0.2)
  );
  margin-left: 6rem;
  box-sizing: border-box;
  padding: 4rem;
  margin-top: 2rem;
  border-radius: 10px;
}
.title {
  display: grid;
  grid-template-columns: 1fr 2fr;
  text-align: left;
  font-size: 1.25rem;
  font-weight: bold;
}
.com {
  cursor: pointer;
}
.resign{
  color: #8d9ad6;
}
.input {
  outline: none;
  border: 0;
  border-bottom: 1px solid white;
  background: none;
  width: 80%;
  color: white;
  margin-left: 0.3rem;
  line-height: 1.5rem;
}
.input::placeholder {
  color: #8d9ad6;
}
.loginbox .input:nth-child(2) {
  margin-top: 3rem;
}
.resignbox .input:nth-child(2) {
  margin-top: 1.5rem;
}
.user-icon {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  background: url("../assets/images/user.png");
  background-size: cover;
  vertical-align: middle;
}
.password-icon {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  background: url("../assets/images/password.png");
  background-size: cover;
  vertical-align: middle;
}
.mail-icon {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  background: url("../assets/images/mail.png");
  background-size: cover;
  vertical-align: middle;
}
.checkpassword-icon {
  display: inline-block;
  width: 1.2rem;
  height: 1.2rem;
  background: url("../assets/images/querenmima.png");
  background-size: cover;
  vertical-align: middle;
}
/* .wangjimima {
  width: 90%;
  text-align: right;
  color: #8d9ad6;
  font-size: 0.7rem;
  margin-top: 0.5rem;
  cursor: pointer;
} */
.btn {
  text-align: center;
}
.btn button {
  width: 50%;
  font-weight: bold;
  letter-spacing: 0.4rem;
  padding: 0.3rem 0;
  border-radius: 50px;
  border: none;
  font-size: 1rem;
  color: white;
  background-color: #2947b7;
  box-shadow: 1px 5px 15px #212999;
  margin-top: 2rem;
  cursor: pointer;
  outline: none;
}

.text {
  position: absolute;
  bottom: 1.5rem;
  right: 15%;
  color: white;
}
</style>