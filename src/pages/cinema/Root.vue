<template>
<div class="page" id="cinema">
    <app-header title="影院"></app-header>
    <div class="subheader">
        <span class="sub-area" @click="gotoCityList">{{city}}</span>
        <div class="sub-search" @click="gotoSearch">
            <img src="../../assets/search01.png" alt="">
            <span class="sub-searchSpan">搜影院</span>
        </div>
    </div>
    <citydetail></citydetail>
    <cinemalist>

    </cinemalist>
    <router-view></router-view>
</div>
</template>

<script>
import Getcinema from '../../components/cinema/Getcinema'
import citydetail from '../common/Citydetail'
import {mapState} from 'vuex'
export default {
    data(){
        return{
            citychoice:[{detail:'全城',icon:'iconfont icon-f11'},{detail:'品牌',icon:'iconfont icon-f11'},{detail:'特色',icon:'iconfont icon-f11'}]
        }
    },
    components:{
        [Getcinema.name]:Getcinema,
        [citydetail.name]:citydetail
    },
    methods:{
        gotoSearch(){
            this.$router.push("/cinema/search")
        },
        gotoCityList(){
            this.$router.push("/cinema/citylist")
        }
    },
    computed:{
        ...mapState(['city'])
    },
    
}
</script>

<style lang="scss" scoped>
    .subheader{
        width:100%;
        height: 44px;
        border-bottom: 1px solid #e6e6e6;
        background: #f5f5f5;
        position: absolute;
        left: 0;
        top: 44px;
        color: #666;
        font-size: 14px;
        display: flex;
        .sub-area{
            flex: 1;
            text-align: center;
            line-height: 44px;
            &::after{
                content: '';
                display: inline-block;
                width: 0;
                height: 0;
                border: 5px solid transparent;
                border-top: 5px solid #666;
                transform: translateY(2px);
                margin-left: 3px;
            }
        }
        .sub-search{
            width:225px;
            height:29px;
            border: 1px solid #e6e6e6;
            background: #fff;
            border-radius: 2px;
            display: flex;
            justify-content: center;
            line-height: 29px;
            margin:7px 10px 0 10px;
            font-size: 13px;
            box-sizing: border-box;
            color:#b2b2b2;
            img{
                margin-top: 7px;
                width:13px;
                height: 13px;
            }
            .sub-searchSpan{
                line-height: 29px;
            }
        }
    }
    
</style>

