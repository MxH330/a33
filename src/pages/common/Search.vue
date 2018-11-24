<template>
    <div class="search">
        <app-header title="猫眼电影">
            <span slot="left" class="iconfont icon-shang" id="goBack" @click='gotoMovie'></span>
        </app-header>
        <div class="searchbox">
            <div class="searchInpbox" v-if="stype==-1">
                <input type="text" placeholder="搜电影、搜影院" class="searchInp" v-model="kw">
                <span class="quxiao" @click='gotoMovie'>取消</span>
                <span class="searchicon"></span>
            </div>
            <div class="searchInpbox" v-if="stype==2">
                <input type="text" placeholder="搜影院" class="searchInp" v-model="kw">
                <span class="quxiao" @click='gotoMovie'>取消</span>
                <span class="searchicon"></span>
            </div>
        </div>
        <div class="showsearch" ref="showsearch">
            <div class="showWrap">
              <div class="Movies-cinema" v-if="iskw == 1" ref="MoviesCinema">
                <div class="showMoives" v-if="stype==-1">
                    <h3>电影/电视剧/综艺</h3>
                    <div class="showMoviesInfo">
                        <div class="movieList" v-for="(item,index) in moviesList" :key="index">
                            <img :src="item.img | replaceWH(128,180)" alt="" class="movie-img">
                            <div class="movieInfo">
                                <div class="name-score">
                                    <p class="Moviename">
                                        <span class="one-line">{{item.nm}}</span>
                                        <span class="version "></span>
                                    </p>            
                                    <span class="score" v-if="item.globalReleased == true">
                                        <span class="num">{{item.sc}}</span>分
                                    </span>
                                    <span class="score" v-if="item.globalReleased == false">
                                        <span class="num">{{item.wish}}</span>人想看
                                    </span>
                                </div>
                                <div class="detail-items">
                                    <p class="ename one-line" v-if="item.enm != ''">{{item.enm}}</p>
                                    <p class="ename one-line" v-if="item.enm == ''">不知</p>
                                    <p class="catogary" v-if="item.cat != ''">{{item.cat}}</p>
                                    <p class="catogary" v-if="item.cat == ''">类型不知</p>
                                    <p class="release" v-if="item.rt != ''">{{item.rt}}</p>
                                    <p class="release" v-if="item.rt == ''">日期不知</p>
                                </div>
                            </div>
                            <div class="buy-btn" v-if="item.globalReleased == true">
                                购票
                            </div>
                            <div class="buy-btn showBuy" v-if="item.globalReleased == false">
                                预售
                            </div>
                        </div>
                    </div>
                    <div class="more-result" @click='getmoreMovies' ref="moreresult">查看全部{{this.moviesCount}}部影视剧</div>
                </div>

                <h3>影院</h3>
                <div class="cinemaList" v-for="(item,index) in cinemaList" :key="index">
                    <div class="cinema">
                        <div class="info">
                            <p class="name-price">
                                <span class="cinemaName">{{item.nm}}</span>
                                <span class="cinemaPrice"><span class="priceNum">{{item.sellPrice}}</span>元起</span>
                            </p>
                            <p class="address">{{item.addr}}</p>
                            <p class="feature-tags">
                                <span v-if='item.sell == true'>座</span>
                                <span v-for="(item1,index) in item.hallType" :key="index">{{item1}}</span>
                                <span v-if="item.allowRefund == 1">退</span>
                                <span v-if="item.endorse == 1">改签</span>
                                <span class="featrue" v-if="item.snack == 1">小吃</span>
                                <span class="featrue" v-if="item.vipDesc == '折扣卡'">折扣卡</span>
                            </p>
                        </div>
                        <div class="distance">{{item.distance}}</div>
                    </div>
                </div>
              </div>
            </div>
            <div class="nocinema" v-show="show">
                <h3 class="nocinema_span">没有找到相关电影\影院</h3>   
            </div>
            <div class="hot-search" v-if="kw == ''">
              <h3 v-for="(item,index) in historySearch" :key='index'>{{item}}</h3>
            </div>
            <div class="hot-search" v-if="kw == ''">
              <h3>热门搜索</h3>
            </div>

        </div>
    </div>
</template>

<script>
import { getCinemaList,getMoreMovie_CinemaList} from "../../services/cinema.js";
import {mapState} from 'vuex'
export default {
  props: {
    stype: Number
  },
  data() {
    return {
      kw: "",
      moviesList: [],
      cinemaList: [],
      moviesCount: "",
      cinemasCount: "",
      show: false,
      iskw:0,
      offset:0,
      historySearch:[]
    };
  },
  computed:{
    ...mapState(['city','cityID'])
  },
  watch: {
    kw: function() {
      setTimeout(()=>{
        getCinemaList(this.cityID,this.kw, this.stype).then(result => {
          if ((result.cinemas == undefined && this.kw != '' && result.movies == undefined)) {
            this.show = true;
          } else if(result.cinemas != undefined){
            this.cinemaList = result.cinemas.list;
            this.show = false;
            this.iskw = 1;
          }
          if((result.movies != undefined  && result.cinemas != undefined && result.cinemas.total != undefined) || (result.movies !=undefined && result.cinemas == undefined)){
            this.moviesList = result.movies.list;
            this.moviesCount = result.movies.total;
            if(result.result != undefined && result.cinemas.total != undefined){
              this.cinemasCount = result.cinemas.total;
            }
            this.show = false;
            this.iskw = 1;
          }
        });
      },100)
    }
  },
  methods: {
    gotoMovie() {
      this.$router.back();
    },
    getmoreMovies(){
        this.offset += 20;
        getMoreMovie_CinemaList(this.cityID,this.kw,this.offset).then((result)=>{
            console.log(result);
            this.moviesList.push(...result.movies);
            this.$refs.moreresult.display = 'none';
            this.historySearch = [...this.kw];
        })
    }
    
  },
  mounted() {
    this.searchScroll = new IScroll(this.$refs.showsearch, {});
    this.searchScroll.on("beforeScrollStart", () => {
      this.searchScroll.refresh();
    });
  }
};
</script>

<style lang="scss" scoped>
.search {
  width: 100%;
  height: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  top: 0;
  z-index: 16;
  background: #fff;
  overflow: hidden;
  .searchbox {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 44px;
    left: 0;

    .searchInpbox {
      width: 100%;
      height: 0.23rem;
      display: flex;
      align-items: center;
      padding: 8px 0 8px 10px;
      background-color: #f5f5f5;
      border-bottom: 1px solid #e5e5e5;
      z-index: 1;
      .searchInp {
        width: 2.28rem;
        height: 0.28rem;
        padding-left: 0.3rem;
        background: #fff;
        outline: none;
      }
      .searchicon {
        position: absolute;
        left: 0.19rem;
        top: 0.1rem;
        width: 0.15rem;
        height: 0.15rem;
        background: url(../../assets/search01.png) no-repeat center;
        background-size: 100%;
      }
      .quxiao {
        flex: 1;
        margin-left: 0.1rem;
        color: red;
      }
    }
  }
  .showMoviesInfo {
    min-height: 0.9rem;
    .movieList {
      padding: 0.12rem 0;
      border-bottom: 1px solid #e6e6e6;
      position: relative;
      .movie-img {
        background-color: #eee;
        width: 64px;
        height: 90px;
        float: left;
        margin-right: 10px;
        margin-left: 0.15rem;
      }
      .movieInfo {
        margin-right: 0.15rem;
        margin-top: 1px;
        .name-score {
          font-size: 16px;
          color: #222;
          display: flex;
          -webkit-box-pack: justify;
          justify-content: space-between;
          margin-bottom: 0.02rem;
          .Moviename {
            display: flex;
            align-items: center;
            flex-grow: 1;
            max-height: 0.24rem;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            .one-line {
              display: inline-block;
              font-weight: 700;
              font-size: 17px;
            }
            .version {
              background-size: contain;
              background: url(../../assets/3d.png) no-repeat center;
              background-size: 100%;
              width: 0.43rem;
              height: 0.14rem;
              margin-left: 0.05rem;
              display: inline-block;
            }
          }
          .score {
            color: #fa0;
            font-size: 10px;
            flex-shrink: 0;
            padding-left: 0.05rem;
            .num {
              font-size: 16px;
            }
          }
        }
        .detail-items {
          flex-grow: 1;
          overflow: hidden;
          padding-right: 10px;
          margin-right: 48px;
          min-height: 27px;
          .ename,
          .catogary,
          .release {
            font-size: 13px;
            color: #666;
            margin-top: 2px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
        }
      }
      .buy-btn {
        color: #fff;
        border-radius: 4px;
        font-size: 12px;
        align-self: flex-end;
        flex-shrink: 0;
        width: 0.48rem;
        text-align: center;
        height: 0.27rem;
        line-height: 0.27rem;
        right: 0.13rem;
        position: absolute;
        top: 0;
        bottom: 0;
        margin: auto;
        background-color: #ef4238;
      }
      .showBuy {
        background-color: #3c9fe6;
      }
    }
  }
  .more-result {
    text-align: center;
    line-height: 44px;
    height: 44px;
    font-size: 15px;
    color: #ef4238;
    border-bottom: 1px solid #e6e6e6;

  }
  .showsearch {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    top: 85px;
    overflow: hidden;
    h3 {
      font-size: 15px;
      color: #999;
      padding: 0.09rem 0.15rem;
      border-bottom: 1px solid #e6e6e6;
    }
    .cinemaList {
      border-bottom: 1px solid #e6e6e6;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: justify;
      justify-content: space-between;
      padding: 0.15rem;
      position: relative;
      .info {
        width: 2.52rem;
        display: inline-block;
        flex: 1;
        overflow: hidden;
        .name-price {
          font-size: 16px;
          color: #000;
          margin-bottom: 0.06rem;
          display: -webkit-box;
          display: flex;
        }
        .cinemaName,
        .address {
          width: 1.96rem;
          white-space: nowrap;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .cinemaPrice {
          font-size: 11px;
          color: #999;
          white-space: nowrap;
          margin-left: 0.03rem;
          .priceNum {
            font-size: 17px;
            color: #ef4238;
          }
        }
        .address {
          font-size: 13px;
          color: #999;
        }
        .feature-tags {
          span {
            border: 1px solid #589daf;
            color: #589daf;
            position: relative;
            display: inline-block;
            padding: 0 3px;
            height: 0.15rem;
            line-height: 0.15rem;
            border-radius: 2px;
            font-size: 11px;
            margin-right: 0.02rem;
          }
          .featrue {
            color: #f90;
            border-color: #f90;
          }
        }
      }
      .distance {
        font-size: 13px;
        color: #999;
        position: absolute;
        top: 0.43rem;
        right: 0.12rem;
      }
    }
  }
  .nocinema {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    overflow: hidden;
    z-index: 20;
    background: url(../../assets/noshow.png) center no-repeat;
    background-color: #f5f5f5;
    background-size: 0.87rem 1rem;
    .nocinema_span {
      position: absolute;
      top: 60%;
      left: 24%;
    }
  }
}
</style>

