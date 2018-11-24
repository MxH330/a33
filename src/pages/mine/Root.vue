<template>
<div class="page" id="mine">
    <app-header title="猫眼电影">
        <span slot="left" class="iconfont icon-shang" id="goBack" @click='gotoMovie'></span>
    </app-header>
    <router-view></router-view>
</div>
</template>

<script>
import Login from './account/Login'
export default {
    components:{
        [Login.name]:Login,
    },
    methods:{
        gotoMovie(){
            this.$router.back();
        }
    }
    
}
</script>

<style lang="scss" scoped>
#mine{
    position: absolute;
    width:100%;
    // background: #ccc;
    left:0;
    top:0;
    bottom:0;
}
.icon-shang:before{
    font-size: 23px;
}

</style>
