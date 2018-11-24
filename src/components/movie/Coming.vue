<template>
    <app-content :style="{top: '88px', bottom: '49px'}" @loadmoreComing="loadmoreComing" :canloadmore='canloadmore'>
        <!-- 近期受期待的电影 -->
        <div class="most-expect">
            <p class="mostExpect">近期最受期待</p>
                <ul class="allexpect">
                    <h-scroll @moreExpectList="moreExpectList">
                        <li class="allexpect-item" v-for="(item,index) in expectList" :key="item.id" @click="expectMoiveDetail(index)">
                            <img :src="item.img | replaceWH(85,115)" class="allexpect-img">
                            <p class="allexpect-p1">{{item.nm}}</p>
                            <p class="allexpect-p2">{{item.comingTitle | splitDate()}}</p>
                            <div class="SCang"><span class="shoucang"></span></div>
                            <div class="wishCount">{{item.wish}}想看</div>
                        </li>
                     </h-scroll>
                </ul>
        </div>
        <div class="expect-jiange"></div>
        <div class="comingMovie" v-for="(list,key,index1) in comingList" :key="key">
            <p class="expectDate">{{key}}</p>
            <div class="movieInfo" v-for="(item,index) in list" :key='index' @click="comingMovieDetail(index,key)">   
                <div class="movieInfo_left">
                    <img :src="item.img | replaceWH(128,180)" alt="">
                </div>
                <div class="movieInfo_right">
                    <div class="movieRight01">
                        <div class="movieName">
                            <span class="movie-nm">{{item.nm}} </span>
                            <span :class="{movie3d:item.version == 'v3d imax', movie3D:item.version == 'v3d'}"></span>
                        </div>
                        <div class="movieComment" v-if="item.globalReleased == false">
                            <span class="movieGrade">{{item.wish}}</span>
                            <span>人想看</span>
                        </div>
                        <div class="movieStar">
                            <span class="movieStar-name">{{item.star}}</span>
                        </div>
                        <div class="movieCount">
                            <span>{{item.comingTitle}}</span>
                        </div>
                    </div>
                    <div class="movieRight02">
                        <div class="movieRightbtn" v-if="item.globalReleased == false">
                            预售
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </app-content>
</template>

<script>
import "../../utils/filter.js";
import {
  getMostExpectedData,
  getMoreExpectedData,
  getComingList,
  getmoreComingList
} from "../../services/movieService.js";
import {mapState} from 'vuex'
export default {
  data() {
    return {
      //期待
      expectList: [],
      // 即将上映
      expectAllids: [],
      comingList: {},
      morecomingList: {},
      canloadmore:true,
      num:0,
      comingDetail:[]
    };
  },
  computed:{
    ...mapState(['city','cityID'])
  },
  methods: {
    //获取更多期待上映数据
    moreExpectList(){
      this.num += 10;
      getMoreExpectedData(this.cityID,this.num).then((result)=>{
        this.expectList = this.expectList.concat(...result.coming);
      })
    },

    //获取更多即将上映数据
    loadmoreComing() {
      let ids = this.expectAllids;
      ids = ids.splice(this.expectList.length, 10);
      let movieids = ids.join(",");
      this.canloadmore = false;
      getmoreComingList(this.cityID,movieids).then(result => {
        result.map(item => {
          if (!this.morecomingList[item.comingTitle]) {
            this.morecomingList[item.comingTitle] = [];
          }
          this.morecomingList[item.comingTitle].push(item);
        });
        this.comingList = Object.assign({},this.comingList, this.morecomingList);
        if (this.comingList.length >= this.expectAllids.length) {
            //加载完毕
            this.canloadmore = false;
          } else {
            //还可以继续加载
            this.canloadmore = true;
          }
      });
    },

    // 获取点击电影的详情数据
    expectMoiveDetail(index){
      let expectMovieId = this.expectList[index].id
      console.log(expectMovieId)
      localStorage.setItem('movieId',expectMovieId);
      this.$router.push('/movie/moredetail')
    },
    // 获取所点击的即将上映的电影的详情
    comingMovieDetail(index,key){
       for(var m in this.comingList){
         if(key == m){
           for(let i=0; i< this.comingList[m].length; i++){
             if(i == index){
               console.log(this.comingList[m][i].id)
               localStorage.setItem('movieId',this.comingList[m][i].id);
             }
           }
         }
       }
       this.$router.push('/movie/moredetail')
    }
  },
  created() {
    console.log(this.comingList)
    getMostExpectedData(this.cityID).then(({data,paging}) => {
      this.expectList = data;
      this.moreExpectIDS = paging
    }),
    getComingList(this.cityID).then(({ dataMap, comingIds }) => {
      this.comingList = dataMap;
      this.expectAllids = comingIds;
    });
  }
};
</script>

<style lang="scss" scoped>
.most-expect {
  padding: 12px 0 12px 15px;
  .mostExpect {
    margin: 0 0 12px;
    font-size: 14px;
    color: #333;
  }
  .allexpect-item {
    width: 0.85rem;
    display: inline-block;
    position: relative;
    margin-right: 0.18rem;
    .allexpect-img {
      display: inline-block;
      width: 0.85rem;
      height: 1.15rem;
    }
    .allexpect-p1 {
      font-size: 13px;
      color: #222;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
      font-weight: 700;
    }
    .allexpect-p2 {
      font-size: 12px;
      color: #999;
    }
    .SCang {
      width: 0.28rem;
      height: 0.28rem;
      line-height: 0.28rem;
      background: rgba(61, 63, 71, 0.6);
      text-align: center;
      border-bottom-right-radius: 10px;
      position: absolute;
      top: 0;
      left: 0;
      text-align: center;
      .shoucang {
        display: inline-block;
        width: 0.1rem;
        height: 0.1rem;
        background: url(../../assets/shoucang.png) no-repeat center;
        background-size: 10px 10px;
      }
    }
    .wishCount {
      width: 100%;
      position: absolute;
      left: 0;
      bottom: 0.4rem;
      text-align: center;
      color: #faaf00;
      font-size: 11px;
      font-weight: 600;
    }
  }
}
.expect-jiange {
  width: 100%;
  height: 0.1rem;
  background: #f5f5f5;
}
.expectDate {
  padding: 0.12rem 0.15rem 0;
  margin: 0;
  font-size: 14px;
  color: #333;
}
.movieInfo {
  width: 100%;
  padding: 0 0.15rem;
  height: 1.14rem;
  box-sizing: border-box;
  .movieInfo_left {
    margin-top: 0.12rem;
    float: left;
    img {
      width: 0.64rem;
      height: 0.9rem;
    }
  }
  .movieInfo_right {
    width: 2.17rem;
    height: 1.14rem;
    padding-top: 0.12rem;
    float: left;
    margin-left: 0.09rem;
    box-sizing: border-box;
    color: #666;
    font-size: 13px;
    border-bottom: 0.5px solid #eee;
    .movieRight01 {
      width: 1.5rem;
      float: left;
      .movieName {
        height: 0.24rem;
        line-height: 0.24rem;
        .movie-nm {
          max-width: 70%;
          font-size: 17px;
          color: #333;
          font-weight: 700;
          float: left;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .movie3d {
          display: block;
          margin-top: 0.05rem;
          width: 0.43rem;
          height: 0.14rem;
          background: url(../../assets/3d.png) no-repeat right center;
          background-size: 0.43rem 0.14rem;
          float: right;
        }
        .movie3D {
          display: block;
          margin-top: 0.05rem;
          width: 0.17rem;
          height: 0.14rem;
          background: url(../../assets/3d1.png) no-repeat right center;
          background-size: 0.17rem 0.14rem;
          float: right;
        }
      }
      .movieGrade {
        font-weight: 700;
        color: #faaf00;
        font-size: 15px;
        margin-left: 0.03rem;
      }
      .movieStar,
      .movieCount {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        line-height: 0.22rem;
      }
    }
    .movieRight02 {
      float: right;
      margin-right: 0.07rem;
      .movieRightbtn {
        width: 0.47rem;
        height: 0.27rem;
        line-height: 0.27rem;
        text-align: center;
        border-radius: 5px;
        color: #fff;
        margin: 0.31rem auto;
        background: #3c9fe6;
      }
    }
  }
}
</style>
