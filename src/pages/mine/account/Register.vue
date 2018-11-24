<template>
    <div class="regitster">
        <div class="telyanzheng">
            <form>
                <ul class="firstStep">
                    <li class="firstStep-item" v-for="(item,index) in step" :key="index" :class="{active: navindex == index}">{{item}}
                        <span class="jiantou">&gt;</span>
                    </li>
                </ul>
                <div class="stepTel">
                    <input type="text" placeholder="请输入你的手机号" class="steptel-inp">
                </div>
                <div class="xieyibox">
                    <input type="checkbox" class="checkbox">我已阅读并同意<a href="" class="reg-a1">《美团用户协议》</a>
                </div>
                <div class="regBtn">获取验证码</div>
            </form>
            <div class="MYtel">
                <span> © 猫眼电影 客服电话:</span>
                <a href="" class="kefutel">400-670-5335</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            step:['输入手机号',"输入验证码",'设置密码'],
            navindex:0
        }
    }
}
</script>

<style lang='scss' scoped>
.regitster{
    width:100%;
    height: 100%;
    position: absolute;
    top:44px;
    left:0;
    bottom: 0;
    z-index: 10;
    background:#f8f8f8;
    a{
        color:red;
    }
    .telyanzheng{
        width:100%;
        .firstStep{
            width:100%;
            height:0.42rem; 
            line-height: 0.42rem;
            text-align: center;
            .firstStep-item{
                font-size: 14px;
                margin:0 0.07rem;
                display:inline-block;
            }
            .jiantou{
                display: inline-block;
                font-size: 14px;
                font-weight: bolder;
                color: #aaa;
            }
        }
        .stepTel{
            width:100%;
            height:0.43rem;
            background: #fff;
            text-align: center;
            line-height: 0.43rem;
            .steptel-inp{
                width:3rem;
                height: 0.3rem;
                font-size: 14px;
            }
        }
        .xieyibox{
            width:100%;
            position: relative;
            padding-left: 0.05rem;
            .checkbox{
                width:0.2rem;
                height: 0.24rem;
                position: relative;
                left:0;
                top:0.05rem;
            }
        }
        .regBtn{
            width:3rem;
            height:0.46rem;
            line-height: 0.46rem;
            text-align:center;
            background-color: #dcdcdc;
            color: #999;
            margin:0.14rem auto;
            border-radius: 4px;
        }
        .MYtel {
        text-align: center;
        }
    }
}
.active{
    color:red
}
</style>
