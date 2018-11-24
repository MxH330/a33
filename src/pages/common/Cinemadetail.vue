<template>
<div class="bigbox" ref="bigbox">
    <div class="cinemaDetail">
        <app-header :title="title">
            <div slot="left" @click="goBack"><i class="iconfont icon-fanhuitubiao"></i></div>
        </app-header>
        <div class="cinemaInfo">
            <div class="cinemaAddress">
                <div class="cinemaAddressLeft">
                    <h2 class="cinemaName line-ellipsis">{{cinemaData.nm}}</h2>
                    <p class="address line-ellipsis">{{cinemaData.addr}}</p>
                </div>
                <div class="cinemaAddressRight"></div>
            </div>
            <div class="swiper-container con_lunbo">
                <div class="post-bg" v-for="(item,index) in bgImg" :style="{'backgroundImage': 'url(' + item + ')' }" v-if="showIndex == index"></div>
                <div class="swiper-wrapper allitems">
                    <div class="swiper-slide items" v-for="(item,index) in moviesInfo"><img :src="item.img | replaceWH(128,180)" alt=""></div>
                    
                </div>
            </div>
            <div class="movie-info" v-for="(item,index) in moviesInfo" v-if="showIndex == index">
				<div class="movie-title">
					<span class="title">{{item.nm}}</span>
					<span class="grade">
						<span v-if="item.sc == '0.0'">暂无评分</span>
						<span v-if="item.sc != '0.0'">{{item.sc}}</span>
					</span>
					
				</div>
				<div class="movie-desc">{{item.desc}}</div>
			</div>
            <div class="nav_wrap" v-for="(list,item1,index) in showsdate" v-if="dateIndex == index" >
                <div class="nav_item" v-for="(item2,index) in list" :class="{active:dataotherIndex == index}" @click="getDate(index)">{{item2.dateShow}}</div>
            </div>
            <div class="seat_wrap">
                <div class="seat_sellactivity">
                    <div class="vip-tips">
                        <div class="vip-tipsbox">
                            <div class="label">折扣卡</div>
                            <div class="label-text line-ellipsis">购票享低价，首单2张立减3元</div> 	
                            <div class="process">9.9元开卡 &gt;</div>
                        </div>
                    </div>
                </div>
                <div class="seat_info"></div>
            </div>
        </div>
        <div class="plist" v-for="(plist,item,index) in getplist" v-if="listIndex == index">
            <div class="list-wrap" v-for="(item,index) in plist">
                <div class="item-outer">
                    <div class="box-flex">
                        <div class="time-block">
                            <div class="begin">{{item.tm}}</div>
                            <div class="end">16:03<span class="tui">散场</span></div>
                        </div>
                        <div class="info-block">
                            <div class="lan">{{item.lang}} {{item.tp}}</div>
                            <div class="hall">{{item.th}}</div>
                        </div>
                        <div class="price">
                            <div class="sellPr"><span class="d">¥</span><span><span class="stonefont">30</span></span></div>
                            <div class="vipPrice"><span class="icon">折扣卡</span><span class="num">¥{{item.vipPrice}}</span></div>
                            <div class="extraDesc">折扣卡首单特惠</div>
                        </div>
                        <div class="button-block">
                            <div id="button">购票</div>
                        </div>
                    </div>
                </div>
            </div>
                <div class="no-seat" v-if="plist.length == 0">
                    <div class="seatbox">
                        <div class="icon"><img src="../../assets/noseat.png"></div>
                        <div class="text">今日场次已映完</div>
                    </div>
                
                </div>
            
        </div>
         <div class='waitGet' v-if="isshow == 1">
            <span class="span1" ref="span1"></span><span class="span2" ref="span2">正在加载...</span>
        </div>
    </div>
</div>
</template>

<script>
import { getCinemaDetail } from "../../services/cinema";
export default {
  data() {
    return {
      cinemaId: localStorage.getItem("cinemaId") || this.$route.params.cinemaId,
      title: "",
      cinemaData: {},
      dealList: {},
      showData: {},
      moviesInfo: [],
      showIndex: 0,
      dateIndex: 0,
      dataotherIndex: 0,
      listIndex: 0,
      showsInfo: [],
      showsdate: [],
      getdata: [],
      getplist: [],
      endTiem: 0,
      bgImg: [],
      isshow: 1
    };
  },
  methods: {
    goBack() {
      localStorage.removeItem("cinemaId");
      this.$router.back();
    },
    getDate(index) {
      this.dateIndex = index;
      this.listIndex = index;
      this.dataotherIndex = index;
    }
  },
  created() {
    setTimeout(() => {
      getCinemaDetail(this.cinemaId).then(result => {
        // 判断ajax是否请求到数据
        if (!result) {
          return;
        }
        this.title = result.cinemaData.nm;
        this.cinemaData = Object.assign({}, this.cinemaData, result.cinemaData);
        this.dealList = Object.assign({}, this.dealList, result.dealList);
        this.showData = Object.assign({}, this.showData, result.showData);
        this.moviesInfo = this.showData.movies;
        this.moviesInfo.map((item, index) => {
          this.showsInfo.push(item);
          item.img = item.img.replace("w.h", "128.180");
          this.bgImg.push(item.img);
        });
        this.showsInfo.map((item, index) => {
          this.showsdate.push(item.shows);
          // item.shows.map((item,index)=>{
          //     console.log(item)
          // })
        });
        this.showsdate = { ...this.showsdate };
        for (var m in this.showsdate) {
          // console.log(this.showsdate[m])
          this.getdata = this.showsdate[m];
          this.getdata.map((item, index) => {
            this.getplist.push(item.plist);
          });
        }
        this.getplist = { ...this.getplist };

        // console.log(this.getplist)
        // console.log(this.showsdate)
        // console.log(this.showsInfo)
        // console.log(this.cinemaData)
        // console.log(this.dealList);
        // console.log(this.showData)

        //关闭加载页面效果
        this.isshow = 0;
      })
      .catch((error)=>{
          console.log('网络异常' + error);
          this.$refs.span1.style.display = 'none';
          this.$refs.span2.innerText = '加载异常... 将自动跳转回上一页';
          setTimeout(()=>{
              this.$router.back();
          },2000)
      })
    }, 1000);
  },
  mounted() {
    // swiper轮播图使用
    let _this = this;
    var swiper = new Swiper(".swiper-container", {
      effect: "coverflow",
      grabCursor: true,
      centeredSlides: true,
      slidesPerView: "auto",
      //当数据更新后重新执行该轮播
      observer: true, //修改swiper自己或子元素时，自动初始化swiper
      observeParents: true, //修改swiper的父元素时，自动初始化swiper
      coverflowEffect: {
        rotate: 0,
        stretch: 0,
        depth: 100,
        modifier: -1,
        slideShadows: false
      },
      on: {
        slideChangeTransitionEnd: function() {
          // alert(this.activeIndex);//切换结束时，告诉我现在是第几个slide
          // console.log(_this.showData.movies)
          // console.log(this.activeIndex);
          // console.log(_this.showIndex)
          _this.showIndex = this.activeIndex;
          _this.listIndex = this.activeIndex;
          _this.dateIndex = this.activeIndex;
          // console.log(_this.showIndex)
        }
      }
    });

    // 整个页面滑动IScroll
    this.boxscroll = new IScroll(this.$refs.bigbox, {
      // 禁止了反弹效果
      bounce: false
    });
    this.boxscroll.on("beforeScrollStart", () => {
      this.boxscroll.refresh();
    });
  }
};
</script>

<style lang="scss" scoped>
.bigbox {
  width: 100%;
  position: absolute;
  left: 0;
  bottom: 0;
  top: 0;
  background: #fff;
  z-index: 15;
  overflow: hidden;
  .cinemaDetail {
    .waitGet {
      position: absolute;
      width: 100%;
      height: 101%;
      top: 44px;
      bottom: 0;
      left: 0;
      z-index: 25;
      font-size: 14px;
      color: #666;
      display: flex;
      justify-content: center;
      padding-top: 10px;
      box-sizing: border-box;
      background: #fff;
      .span1 {
        display: inline-block;
        width: 0.2rem;
        height: 0.2rem;
        background: url(../../assets/jiazai.png) no-repeat center;
        background-size: 100%;
        margin-right: 3px;
        animation: rotate 1s linear infinite;
      }
      .span2 {
        height: 0.2rem;
        margin-left: 3px;
      }
    }
    @keyframes rotate {
      0% {
        transform: rotate(0);
      }
      100% {
        transform: rotate(360deg);
      }
    }
    .cinemaInfo {
      width: 100%;
      position: relative;
      top: 44px;
      .cinemaAddress {
        width: 100%;
        height: 0.74rem;
        background: #fff;
        position: relative;
        padding: 0.15rem;
        box-sizing: border-box;
        display: flex;
        .cinemaAddressLeft {
          display: inline-block;
          .cinemaName {
            width: 2.15rem;
            font-size: 16px;
            font-weight: bold;
          }
          .address {
            width: 2.15rem;
            margin-top: 2px;
            font-size: 13px;
            line-height: 0.185rem;
            color: #999;
          }
        }
        .cinemaAddressRight {
          display: inline-block;
          width: 0.51rem;
          height: 0.3rem;
          margin-top: 0.05rem;

          background: url(../../assets/dingwei.png) no-repeat right center;
          background-size: 0.19rem, 0.22rem;
          border-left: 0.5px solid #ccc;
        }
      }
      .con_lunbo {
        width: 100%;
        height: 1.35rem;
        position: relative;
        left: 0;
        top: 0;
        background-color: #40454d;
        // opacity: .55;
        .post-bg {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: -1;
          overflow: hidden;
          -webkit-filter: blur(30px);
          filter: blur(25px);
          background-position-y: 40%;
        }
        .allitems {
          .items {
            width: 0.75rem;
            height: 1.05rem;
            margin-top: 0.18rem;
            width: 0.75rem !important;
            margin-right: 0px !important;
            margin-left: 18px;
            img {
              width: 0.75rem;
              height: 1.05rem;
            }
          }
          .swiper-slide-active {
            border: 2px solid #fff;
          }
          .swiper-slide-active:after {
            content: "";
            position: absolute;
            bottom: -6px;
            left: 50%;
            -webkit-transform: translateX(-50%);
            transform: translateX(-50%);
            width: 10px;
            height: 5px;
            background: url(../../assets/whitesanjiao.png) no-repeat;
            background-size: contain;
          }
        }
      }
      .movie-info {
        padding: 0.11rem 0px;
        text-align: center;
        position: relative;
        top: 0px;
        width: 100%;
        border-bottom: 0.5px solid #eee;
        .movie-title {
          height: 0.24rem;
          line-height: 0.24rem;
          font-size: 17px;
          color: #333;
          font-weight: 700;
          .grade {
            color: #ffb400;
            font-size: 16px;
          }
        }
        .movie-desc {
          margin-top: 2px;
          height: 0.185rem;
          line-height: 0.185rem;
          font-size: 13px;
          color: #999;
        }
      }
      .nav_wrap {
        width: 100%;
        height: 0.45rem;
        position: relative;
        top: 0;
        .nav_item {
          display: inline-block;
          text-align: center;
          width: 1.2rem;
          height: 0.45rem;
          line-height: 0.45rem;
        }
      }
      .seat_wrap {
        position: relative;
        width: 100%;
        top: 2px;
        left: 0;
        .seat_sellactivity {
          width: 100%;
          height: 0.42rem;
          .vip-tips {
            padding: 0 15px;
            height: 42px;
            line-height: 42px;
            background-color: #fff5ea;
            .vip-tipsbox {
              display: flex;
              .label {
                border-radius: 2px;
                font-size: 10px;
                line-height: 15px;
                height: 15px;
                width: 34px;
                text-align: center;
                color: #fff;
                margin-top: 13px;
                margin-right: 10px;
                background-color: #ff941a;
              }
              .label-text {
                font-size: 12px;
                color: #ff941a;
              }
              .process {
                flex: 1;
                line-height: 42px;
                color: #999;
                font-size: 12px;
                text-align: right;
              }
            }
          }
        }
      }
    }
    .list-wrap {
      width: 100%;
      position: relative;
      top: 44px;
      bottom: 0;
      .item-outer {
        padding: 17px 0;
        margin-left: 12.5px;
        .box-flex {
          display: flex;
          .time-block {
            margin-right: 23px;
            .begin {
              font-size: 20px;
              color: #333;
              line-height: 1;
              white-space: nowrap;
            }
            .end {
              margin-top: 10px;
              color: #999;
              font-size: 11px;
              line-height: 1;
              white-space: nowrap;
            }
          }
          .info-block {
            flex: 1;
            .lan {
              margin-top: 2px;
              line-height: 18px;
              font-size: 13px;
              color: #333;
              white-space: normal;
            }
            .hall {
              margin-top: 7px;
              font-size: 11px;
              color: #999;
              white-space: normal;
            }
          }
          .price {
            flex: 0 1 auto;
            width: 90px;
            .sellPr {
              display: block;
              line-height: 1;
              color: #f03d37;
              margin-top: 1px;
              font-size: 19px;
              margin-right: 5px;
            }
            .vipPrice {
              display: inline-block;
              line-height: 15px;
              height: 15px;
              -webkit-transform: scale(0.8);
              transform: scale(0.8);
              -webkit-transform-origin: left;
              transform-origin: left;
              margin-right: -16px;
              border: 1px solid #ff9000;
              border-radius: 2px;
              font-size: 12px;
              .icon {
                color: #fff;
                background-color: #f90;
              }
              .num {
                color: #f90;
                background-color: #fff;
              }
            }
            .extraDesc {
              margin-top: 5px;
              display: block;
              font-size: 11px;
              color: #999;
            }
          }
          .button-block {
            width: 20%;
            #button {
              position: absolute;
              top: 50%;
              -webkit-transform: translateY(-50%);
              transform: translateY(-50%);
              width: 15%;
              height: 27px;
              line-height: 28px;
              font-size: 12px;
              background-color: #f03d37;
              color: #fff;
              border-radius: 4px;
              text-align: center;
            }
          }
        }
      }
    }
    .no-seat {
      width: 100%;
      position: absolute;
      bottom: 0;
      left: 0;
      height: 159px;
      background-color: #f0f0f0;
      text-align: center;
      .seatbox {
        width: 200px;
        margin: 30px auto;
        display: flex;
        flex-direction: column;
        justify-content: center;
        .icon {
          width: 0.77rem;
          display: inline-block;
          margin: auto;
        }
        .text {
          margin-top: 12px;
          line-height: 1;
          font-size: 16px;
          color: #acacac;
          margin: auto;
        }
      }
    }
    .line-ellipsis {
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }
    .active {
      color: red;
      border-bottom: 2px solid red;
    }
  }
}
</style>

