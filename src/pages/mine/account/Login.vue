<template>
    <div class="login">
        <div class="subheader">
            <div class="nav">
                <li class="loginType" v-for="(item,index) in loginList" :key='index' :class="{active:typeindex == index}" @click="changeType(index)">{{item}}</li>
            </div>
        </div>
        <div class="logintip01" v-if="typeindex==0">
            <form>
                <input type="text" placeholder="账户名/手机/Email" class="login_inp1">
                <input type="text" placeholder="请输入您的密码" class="login_inp1">
                <div class="loginBtn" @click="loginAction">登录</div>
            </form>
            <div class="loginTip">
                <div class="loginToreg">
                    <!-- <router-link to="/mine/register" class="loginToa1">立即注册</router-link> -->
                    <div class="loginToa1" @click='gotoReg'>立即注册</div>
                    <a href="" class="loginToa2">找回密码</a>
                </div>
                <div class="MYtel">
                    <span> © 猫眼电影 客服电话:</span>
                    <a href="" class="kefutel">400-670-5335</a>
                </div>
            </div>
        </div>
        <div class="logintip01" v-if="typeindex==1">
            <form>
                <input type="text" placeholder="请输入手机号" class="login_inp1"><div class="getyanzhengmm">获取验证码</div>
                <input type="text" placeholder="请输入短信验证码" class="login_inp1">
                <div class="loginBtn1">注册</div>
            </form>
            <div class="loginTip">
                <div class="loginToreg">
                    <a href="" class="loginToa1">立即注册</a>
                    <a href="" class="loginToa2">找回密码</a>
                </div>
                <div class="MYtel">
                    <span> © 猫眼电影 客服电话:</span>
                    <a href="" class="kefutel">400-670-5335</a>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: "userlogin",
  data(){
        return{
            loginList:['美团账号登录','手机验证登录'],
            typeindex:0,
        }
    },
    methods:{
        changeType(index){
            this.typeindex = index;
        },
        gotoReg(){
            this.$router.push('/mine/register')
        },
        loginAction(){
            document.cookie='token=' + 123333
            this.$router.push('/cinema');
        }
    }
};
</script>

<style lang="scss" scoped>
.login {
  width: 100%;
  position: absolute;
  top: 0px;
  left: 0;
  bottom:0;
  .subheader {
    width: 100%;
    height: 44px;
    position: absolute;
    left: 0;
    top: 44px;
    border-bottom: 3px solid #ddd;
    display: flex;
    box-sizing: border-box;
    .nav {
      width: 100%;
      height: 44px;
      line-height: 44px;
      padding: 0 20px;
      display: flex;
      .loginType {
        flex: 1;
        text-align: center;
        &.active {
          color: #f03d37;
          border-bottom: 3px solid #f03d37;
            }
        }
      }
    }
  .logintip01 {
      position: absolute;
      top:88px;
      left:0;
    .login_inp1,
    .login_inp2 {
      width: 3rem;
      height: 0.45rem;
      display: block;
      border: 0;
      padding: 0.15rem 0;
      margin-left: 0.15rem;
      line-height: 0.6rem;
      font-size: 16px;
      border-bottom: 1px solid #e6e6e6;
      box-sizing: border-box;
      outline: none;
    }
    .getyanzhengmm{
        width:1rem;
        height: 0.3rem;
        line-height: 0.3rem;
        text-align: center;
        background: #dcdcdc;
        border-radius: 2px;
        position: absolute;
        top:8px;
        right: 8px;
    }
    .loginBtn,.loginBtn1 {
      width: 3rem;
      height: 0.48rem;
      line-height: 0.48rem;
      font-size: 0.16rem;
      border-radius: 0.06rem;
      margin: 0 auto;
      text-align: center;
      color: #fff;
      border: 0;
      background-color: #df2d2d;
      margin-top: 0.14rem;
    }
    .loginBtn1{
        background: #dcdcdc;
    }
    .loginTip {
      width: 100%;
      .loginToreg {
        width: 90%;
        margin: 0.05rem auto;
        height: 0.28rem;
        .loginToa1 {
          float: left;
        }
        .loginToa2 {
          float: right;
        }
      }
      .loginToa1,
      .loginToa2,
      .kefutel {
        color: #df2d2d;
      }
      .MYtel {
        text-align: center;
      }
    }
  }
}
</style>
