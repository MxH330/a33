<template>
  <div id="app">
    <keep-alive>
      <router-view/>  
    </keep-alive>

     <nav class="tabs">
        <router-link v-for="(item,index) in tabsList" :key='index' :to="item.path" id="item-a">
          <span :class="item.itemClass"></span>
          <span>{{item.name}}</span>
        </router-link>
    </nav>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      tabsList: [
        { path: "/movie", name: "电影", itemClass: "iconfont icon-dianying3" },
        { path: "/cinema", name: "影院", itemClass: "iconfont icon-yingyuanA" },
        { path: "/mine", name: "我的", itemClass: "iconfont icon-wode" }
      ]
    };
  }
};
</script>


<style lang="scss" scoped>
.tabs {
  width: 100%;
  height: 49px;
  position: absolute;
  left: 0;
  bottom: 0;
  display: flex;
  line-height: 49px;
  text-align: center;
  color: #000;
  flex: 1;
  box-sizing: border-box;
  border-top: 1px solid #ccc;
  #item-a {
    width: 100%;
    height: 100%;
    color: #696969;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    span:first-of-type {
      font-size: 28px;
      line-height: 25px;
    }
    span:last-of-type {
      font-size: 12px;
      line-height: 12px;
    }
  }
}
.router-link-exact-active {
  color: #f03d37 !important;
}
</style>
