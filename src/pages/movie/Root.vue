<template>
<div class="page" id="movie">
    <app-header title="猫眼电影"></app-header>

    <header class="sub-header">
        <span class="city-icon" @click='gotoCityList'>
            {{city}}
        </span>
        <nav class="nav">
            <li v-for="(navItem, index) in navList" :key="index"
                :class="{active: navIndex==index}" @click="navAction(index)">
                {{navItem}}
            </li>
        </nav>
        <span class="search-icon" @click="gotoSearch">
            <img src="../../assets/search.png"/>
        </span >
    </header>
    <keep-alive>
      <playing v-if="navIndex==0"></playing>
      <coming v-if="navIndex==1"></coming>
    </keep-alive>
    <router-view></router-view>
</div>
</template>

<script>
import Playing from "../../components/movie/Playing"
import Coming from "../../components/movie/Coming"
import {mapState} from 'vuex'
export default {
  components:{
    'playing':Playing,
    'coming':Coming
  },
  data() {
    return {
      navList: ["正在热映", "即将上映"],
      navIndex: 0,
    };
  },
  computed:{
    //获取到全局的city
    ...mapState(['city'])
  },
  methods: {
    navAction(index) {
      this.navIndex = index;
    },
    gotoSearch(){
      this.$router.push("/movie/search")
    },
    gotoCityList(){
      this.$router.push('/movie/citylist')
    }
  }
};
</script>

<style lang="scss" scoped>

.sub-header {
  width: 100%;
  height: 44px;
  border-bottom: 1px solid #e6e6e6;
  position: absolute;
  left: 0;
  top: 44px;
  color: #666;
  font-size: 14px;
  display: flex;
  .city-icon {
    flex: 1;
    text-align: center;
    line-height: 44px;
    &::after {
      content: "";
      display: inline-block;
      width: 0;
      height: 0;
      border: 5px solid transparent;
      border-top: 5px solid #666;
      transform: translateY(2px);
    }
  }
  .nav {
    width: 60%;
    display: flex;
    li {
      flex: 1;
      text-align: center;
      line-height: 44px;
      font-weight: bold;
      &.active {
        color: #f03d37;
        border-bottom: 2px solid #f03d37;
      }
    }
  }
  .search-icon {
    flex: 1;
    img {
      width: 20px;
      margin: 12px auto;
    }
  }
}

</style>
