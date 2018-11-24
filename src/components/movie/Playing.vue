<template>
    <app-content :style="{top: '88px', bottom: '49px'}" @loadmore="loadmoreData" :isloadmore="isloadmore">
        <div class="movieInfo" v-for="(item,index) in playingList" :key='index' @click="getMoviesDetail(index)" :title="item.name">    
            <div class="movieInfo_left">
                <img :src="item.img" alt="">
            </div>
            <div class="movieInfo_right">
                <div class="movieRight01">
                    <div class="movieName">
                        <span class="movie-nm">{{item.nm}} </span>
                        <span :class="{movie3d:item.version == 'v3d imax', movie3D:item.version == 'v3d'}"></span>
                    </div>
                    <div class="movieComment" v-if="item.globalReleased == true">
                        <span>观众评</span>
                        <span class="movieGrade">{{item.sc}}</span>
                    </div>
                    <div class="movieComment" v-if="item.globalReleased == false">
                        <span class="movieGrade">{{item.wish}}</span>
                        <span>人想看</span>
                    </div>
                    <div class="movieStar">
                        <span class="movieStar-name">{{item.star}}</span>
                    </div>
                    <div class="movieCount">
                        <span>{{item.showInfo}}</span>
                    </div>
                </div>
                <div class="movieRight02">
                    <div class="movieRightbtn movieRightbtn1" v-if="item.globalReleased == true">
                        购票
                    </div>
                    <div class="movieRightbtn movieRightbtn2" v-if="item.globalReleased == false">
                        预售
                    </div>
                </div>
            </div>
        </div>
    </app-content>
</template>

<script>
import {
  getPlayingList,
  getmorePlayingList
} from "../../services/movieService";
export default {
  data() {
    return {
      playingList: [],
      playingIDS: [],
      isloadmore:true,
    };
  },
  methods: {
    // 加载更多数据
    loadmoreData() {
      console.log("加载更多数据")
      // 取出ids
      let ids = [...this.playingIDS];
      // 每次加载固定10条数据
      ids = ids.splice(this.playingList.length, 10);
      //组装ids
      let movieids = ids.join(",");
      console.log(movieids);
      // 发送请求
      // 保证了，等ajax发送后，数据全部加载完成后，才可以发送下一次ajax
      this.isLoadMore = false;
      getmorePlayingList(movieids).then(result => {
        getmorePlayingList(result).then(() => {
          // 判断是否能继续加载更多
          this.playingList = this.playingList.concat(...result);
          if (this.playingList.length >= this.playingIDS.length) {
            //加载完毕
            this.isloadmore = false;
          } else {
            //还可以继续加载
            this.isloadmore = true;
          }
        });
      });
    },
    // 点击电影进入电影详情
    getMoviesDetail(index){
      let title = this.playingList[index].nm
      let movieId = this.playingList[index].id
      localStorage.setItem('movieId',movieId) 
      this.$router.push(
                {
                    name: 'moviedetail',
                    params: {
                        title:title,
                    }
                }
            );  
    }
  },
  created() {
    getPlayingList().then(({ data, ids }) => {
      this.playingList = data;
      this.playingIDS = ids;
        // console.log(this.playingList)
    });
    
  }
};
</script>

<style lang="scss" scoped>
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
      }
      .movieRightbtn1 {
        background: #f03d37;
      }
      .movieRightbtn2 {
        background: #3c9fe6;
      }
    }
  }
}
</style>

