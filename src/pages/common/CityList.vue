<template>
    <div class="getCityList">
        <app-content ref="content" class="content">
            <div class="box" ref="listtop">
                <div id="locate" class="city-title">
                    定位城市
                </div>
                <div class="city-list-inline clearfix">
                    <div class="location-city">定位失败，请点击重试</div>
                </div>
                <section class="history-city-list">
                    <div id="history" class="city-title">
                        最近访问城市
                    </div>
                    <div class="city-list city-list-inline clearfix">
                        <div class="city-item" v-for="(item,index) in history" :key="index" @click="changeStateCity(item)">{{item.nm}}</div>
                    </div>
                </section>
                <section>
                    <div id="hot" class="city-title">
                        热门城市
                    </div>
                    <div class="city-list city-list-inline clearfix">
                        <div class="city-item" v-for="(item,index) in hotCityList" :key="index" @click="getHotcitylist(item)">{{item.nm}}</div>
                    </div>
                </section>
            </div>
                <div class="cityList" v-for="cityMap in data" :key="cityMap.key" ref="list">
                    <p class="city-title">{{cityMap.key}}</p>
                    <ul class="citylistbox">
                        <li v-for="item in cityMap.value" :key="item.id"
                            @click="selectCityAction(item)" class="citylist">
                            {{item.nm}}
                        </li>
                    </ul>
                </div>
        </app-content>
        <nav class="nav-bar">
            <li class="nav-item"><a href="#locate" class="nava">定位</a></li>
            <li class="nav-item"><a href="#history" class="nava">最近</a></li>
            <li class="nav-item"><a href="#hot" class="nava">热门</a></li>
            <li class="nav-item" v-for="(item, index) in keys" :key="item" @click="btnAction(index)">
                {{item}}
            </li>
        </nav>
    </div>
</template>

<script>
import { getCityListData } from "../../services/otherService";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      data: JSON.parse(localStorage.getItem("cityListData")||'[]'),
      keys: JSON.parse(localStorage.getItem("cityListkeys")||'[]'),
      hotCityList: [
        { nm: "北京", id: 1 },
        { nm: "上海", id: 10 },
        { nm: "广州", id: 20 },
        { nm: "深圳", id: 30 },
        { nm: "天津", id: 40 },
        { nm: "武汉", id: 57 },
        { nm: "南京", id: 55 },
        { nm: "杭州", id: 50 },
        { nm: "成都", id: 59 },
        { nm: "重庆", id: 45 },
        { nm: "西安", id: 42 }
      ],
      history: JSON.parse(localStorage.getItem("Cityinfo")||'[]'),
    };
  },
  methods: {
    ...mapActions(["selectCity"]),
    btnAction(index) {
      //跳转到指定的字母的城市列表中
      //计算需要滚动的高度
      let height = 0;
      for (let i = 0; i < index; i++) {
        height += this.$refs.list[i].offsetHeight;
      }
      //让滚动视图滚动
      this.$refs.content.scrollTo(height + this.$refs.listtop.offsetHeight);
    },
    // 点击将最近选择的城市用来进行修改全局城市
    changeStateCity(item){
        this.selectCity({
          city: item.nm,
          id: item.id
        });
      this.$center.$emit('getCity_allcinemas',1)

      // 返回上一页
      this.$router.back();
    },
    selectCityAction(item) {
      //将选中的城市保存，保存到全局数据中
      this.selectCity({
        city: item.nm,
        id: item.id
      });
      this.$center.$emit('getCity_allcinemas',1)

      // 返回上一页
      this.$router.back();
    },
    getHotcitylist(item) {
      //将选中的城市保存，保存到全局数据中
      this.selectCity({
        city: item.nm,
        id: item.id
      });
      this.history.unshift({nm:item.nm,id:item.id})
      if(this.history.length > 3){
        this.history.pop();
      }
      this.$center.$emit('getIndex',10)
      this.$center.$emit('getCity_allcinemas',1)
      localStorage.setItem('Cityinfo',JSON.stringify(this.history))
      this.$router.back();
    }
  },
  created() {
      getCityListData().then(({ data, keys }) => {
      this.data = data;
      this.keys = keys;
      // 将城市数据存储到本地存储需要
      localStorage.setItem('cityListData',JSON.stringify(this.data));
      localStorage.setItem('cityListkeys',JSON.stringify(this.keys));
    });
  }
};
</script>

<style lang="scss" scoped>
.getCityList {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 100;
  background-color: #ebebeb;
  font-size: 14px;
  color: #333;
  .city-title {
    padding-left: 0.15rem;
    line-height: 0.3rem;
  }
  .city-list-inline {
    background-color: #f5f5f5;
    padding-bottom: 8px;
    margin-right: 0.15rem;
    box-sizing: border-box;
    .location-city {
      float: left;
      background: #fff;
      width: 50%;
      height: 33px;
      margin-top: 15px;
      margin-left: 4%;
      padding: 0 4px;
      border: 1px solid #e6e6e6;
      border-radius: 3px;
      line-height: 33px;
      text-align: center;
      box-sizing: border-box;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
  .city-item {
    float: left;
    background: #fff;
    width: 25%;
    height: 33px;
    margin-top: 15px;
    margin-left: 4%;
    padding: 0 4px;
    border: 1px solid #e6e6e6;
    border-radius: 3px;
    line-height: 33px;
    text-align: center;
    box-sizing: border-box;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .citylistbox {
    margin-right: 0.15rem;
    background: #f5f5f5;
    .citylist {
      height: 44px;
      line-height: 44px;
      margin-left: 15px;
      border-bottom: 1px solid #c8c7cc;
    }
  }
}
.nav-bar {
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  .nav-item {
    font-size: 12px;
    padding: 0 6px;
    text-align: center;
  }
  .nava {
    font-size: 12px;
    color: #333;
  }
}
.content {
  top: 0;
  bottom: 0;
}
</style>


