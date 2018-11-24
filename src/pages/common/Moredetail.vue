<template>
    <div class="moredetail">
        <app-header :title="movieMoreDetail.nm">
          <div slot="left" @click="goBack"><i class="iconfont icon-fanhuitubiao"></i></div>
        </app-header>
        <div class="movie-detail" >
            <div class="movie-filter"></div>
            <div class="poster-bg" :style="{'background-image': 'url(' + movieMoreDetail.albumImg + ')' }"></div>
            <div class="detail">
                <div class="poster">
                    <img :src="movieMoreDetail.img"/>
                </div>
                <div class="content flex">
                    <div class="title middle line-ellipsis">{{movieMoreDetail.nm}}</div>
                    <div class="title-en-name line-ellipsis">{{movieMoreDetail.enm}}</div>
                    <div class="score line-ellipsis" v-if="movieMoreDetail.globalReleased == true">{{movieMoreDetail.sc}}<span class="snum">({{Math.ceil(movieMoreDetail.snum / 1000)/10}}万人评)</span> 
                    </div>
                    <div class="score line-ellipsis" v-if="movieMoreDetail.globalReleased == false">{{movieMoreDetail.wish}}人想看</div>
                    <div class="type line-ellipsis">
                        <span>{{movieMoreDetail.cat}}</span>
                            <div class="type-group">
                                <img style="width: 42px;" class="sd-imax" src="../../assets/3d.png">
                            </div>
                        
                    </div>
                    <div class="src line-ellipsis">{{movieMoreDetail.src}}/{{movieMoreDetail.dur}}分钟</div>
                    <div class="pubDesc line-ellipsis">{{movieMoreDetail.pubDesc}}</div>
                </div>
            </div>
        
        </div>
        <div class="controduce">
            <div class="conBtn">
                特惠购票
            </div>
            <div class="contro-detail">
                <p>{{movieMoreDetail.dra}}</p>
            </div>
        </div>
        <div class="wenxinTip">
            <h3>观影小贴士</h3>
            <div class="tip">
                <span>有一个彩蛋再片尾字幕前</span>
            </div>
        </div>
        <div class="Allstar">
            <ul class="Allstarbox">
                <li class="Allstar_item">
                    <img src="../../assets/star.jpg" alt="" class="star_img">
                    <span class="star_nm">{{movieMoreDetail.dir}}</span>
                    <span class="star_do">导演</span>
                </li>
                <li class="Allstar_item">
                    <img src="../../assets/b.jpg" alt="" class="star_img">
                    <span class="star_nm">汤姆·哈迪</span>
                    <span class="star_do">埃迪·布洛克/毒液 Eddie Brock / Venom</span>
                </li>
                <li class="Allstar_item">
                    <img src="../../assets/c.jpg" alt="" class="star_img">
                    <span class="star_nm">米歇尔·威廉姆斯</span>
                    <span class="star_do">安妮·韦英 Anne Weying</span>
                </li>
                <li class="Allstar_item">
                    <img src="../../assets/d.jpg" alt="" class="star_img">
                    <span class="star_nm">里兹·阿迈德</span>
                    <span class="star_do">德雷克博士 Dr. Carlton Drake</span>
                </li>
                <li class="Allstar_item">
                    <img src="../../assets/b.jpg" alt="" class="star_img">
                    <span class="star_nm">汤姆·哈迪</span>
                    <span class="star_do">埃迪·布洛克/毒液 Eddie Brock / Venom</span>
                </li>
                <li class="Allstar_item">
                    <img src="../../assets/c.jpg" alt="" class="star_img">
                    <span class="star_nm">米歇尔·威廉姆斯</span>
                    <span class="star_do">安妮·韦英 Anne Weying</span>
                </li>
                <li class="Allstar_item">
                    <img src="../../assets/d.jpg" alt="" class="star_img">
                    <span class="star_nm">里兹·阿迈德</span>
                    <span class="star_do">德雷克博士 Dr. Carlton Drake</span>
                </li>
            </ul>
            <div class="stars_all">
                <span>全体演职人员</span>
            </div>
        </div>

        <div class="videoBox">
          <h3>媒体库</h3>
          <ul class="imgBox">
            <li class="img-item"><a href="http://m.maoyan.com/movie/42964/preview?_v_=yes"><img src="../../assets/e.jpg" alt=""></a><span class="video_go"><i class="iconfont icon-bofang"></i></span></li>
            <li class="img_all" v-for="(item,index) in photos" :key="index"><a href=""><img :src="item | replaceWH(127,180)" alt=""></a></li>
          </ul>
          <div class="link-group">
            <a href="" class="link-more" >
              <h4 class="link_box01">
                <span>视频</span>
                <span id="link-num" >39</span>
              </h4>
            </a>
            <a href="" class="link-more">
              <h4 class="link_box02">
                <span>剧照</span>
                <span id="link-num" >544</span>
              </h4>
            </a>
          </div>
        </div>
    </div>
</template>

<script>
import { getMoreDetail } from "../../services/movieService";
export default {
  data() {
    return {
      // title: this.$route.params.title,
      movieId: localStorage.getItem('movieId'),
      movieMoreDetail:{},
      photos:[],
    };
  },
  methods:{
     goBack(){
      this.$router.back();
    }
  },
  created() {
    console.log(this.movieId)
    getMoreDetail(Number(this.movieId)).then((result)=>{
      console.log(result);
      this.movieMoreDetail = Object.assign({},this.movieMoreDetail,result.detailMovie);
      this.photos = this.movieMoreDetail.photos;
    })
   
  }
};
</script>

<style lang="scss" scoped>
.moredetail {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #f4f4f4;
  z-index: 10;
  overflow-x:hidden;
  overflow-y: scroll;
  .movie-detail {
    width: 100%;
    height: 1.72rem;
    position: relative;
    top: 44px;
    box-sizing: border-box;
    .movie-filter {
      position: absolute;
      z-index: -1;
      width: 100%;
      height: 100%;
      background-color: #333;
    }
    .poster-bg {
      width: 100%;
      height: 100%;
      z-index: -1;
      overflow: hidden;
      position: absolute;
      -webkit-filter: blur(1.2rem);
      filter: blur(1.2rem);
      background-size: cover;
      background-repeat: no-repeat;
      opacity: 0.1;
    }
    .detail {
      height: 150px;
      padding: 0.05rem 0.3rem 0rem 0.15rem;
      display: flex;
      .poster {
        flex: 1;
        img {
          width: 90px;
          height: 128px;
          box-sizing: border-box;
          margin-left: 0.08rem;
          margin-top: 0.1rem;
        }
      }
      .content {
        flex: 1;
        overflow: hidden;
        margin-left: -30px;
        line-height: 1;
        color: #fff;
        .title {
          font-size: 20px;
          margin-top: 2px;
          font-weight: 700;
        }
        .title-en-name {
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          opacity: 0.8;
        }
        .score {
          font-size: 18px;
          font-weight: 700;
          color: #fc0;
          margin-top: 11px;
          .snum {
            margin-top: 10px;
            font-size: 12px;
            color: #fff;
            opacity: 0.8;
          }
        }
        .type {
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          opacity: 0.8;
          .type-group {
            display: inline-block;
            width: 42px;
            opacity: 0.85;
            vertical-align: bottom;
          }
        }
        .src {
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          opacity: 0.8;
        }
        .pubDesc {
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          opacity: 0.8;
        }
        .line-ellipsis {
          text-overflow: ellipsis;
          overflow: hidden;
          white-space: nowrap;
        }
      }
    }
  }
  .controduce {
    position: relative;
    top: 28px;
    height: 1.2rem;
    // overflow: hidden;
    padding: 0.1rem 0.2rem 0 0.2rem;
    background: #fff;
    .conBtn {
      width: 100%;
      height: 0.33rem;
      line-height: 0.33rem;
      text-align: center;
      border-radius: 4px;
      background: #e54847;
      color: #fff;
    }
    .contro-detail {
      width: 100%;
      font-size: 13px;
      margin-top: 5px;
      color: #333;
      height: 0.8rem;
      overflow-y: scroll;
    }
  }
  .wenxinTip {
    border-top: 1px solid #e5e5e5;
    border-bottom: 1px solid #e5e5e5;
    margin: 0.1rem 0;
    position: relative;
    left: 0;
    top: 33px;
    background: #fff;
    h3 {
      height: 0.4rem;
      line-height: 0.4rem;
      font-weight: 400;
      color: #666;
      font-size: 0.15rem;
      padding-left: 0.15rem;
      border-bottom: 1px solid #e5e5e5;
    }
    .tip {
      height: 0.4rem;
      font-size: 13px;
      line-height: 0.4rem;
      margin-left: 0.15rem;
    }
  }
  .Allstar{
      width:100%;
      height: 1.72rem;
      background: #fff;
      font-size: 12px;
      position: relative;
        top:30px;
      .Allstarbox{
        width: 100%;
        padding: .1rem 0 .1rem .1rem;
        margin: 0;
        list-style: none;
        overflow-x: scroll;
        white-space: nowrap;
        box-sizing: border-box;

        .Allstar_item{
            padding: 0 .03rem;
            text-align: center;
            display: inline-block;
            .star_img{
                width:0.55rem;
                height: 0.76rem;
            }
            .star_nm{
                width:0.55rem;
                display: block;
                font-size: 12px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                text-align: center;
            }
            .star_do{
                width:0.55rem;
                display: block;
                font-size: 10px;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                color:#999;
                text-align: center;

            }
        }
      }
        .stars_all{
            width:100%;
            height: 0.37rem;
            font-size: 14px;
            line-height: 0.37rem;
             border-top: 1px solid #e5e5e5;
             padding-left: 0.10rem;
        }
  }
  .videoBox{
    position: relative;
    width:100%;
    margin-top: 38px;
    background: #fff;
    h3{
      height: 0.3rem;
      line-height: 0.3rem;
      font-weight: 400;
      color: #666;
      font-size: 0.15rem;
      padding-left: 0.15rem;
      border-bottom: 1px solid #e5e5e5;
    }
    .imgBox{
      padding-left: .15rem;
      overflow-x: scroll;
      white-space: nowrap;
      margin-top: 8px;
      .img-item{
        display: inline-block;
        position: relative;
        .video_go{
          content: "播";
          color: white;
          right: .05rem;
          bottom: .02rem;
          font-size: .12rem;
          position: absolute;
          font-family: "myfont";
          width: .2rem;
          height: .2rem;
          line-height: .2rem;
          border-radius: 100%;
          opacity: .7;
          background: #333;
        }
        img{
          width: 1.05rem;
          height: 0.58rem;
        }
      }
      .img_all{
        display: inline-block;
        margin-left: 0.1rem;
        img{
          width:0.76rem;
          height:0.58rem;
        }
      }
    }
    .link-group{
      padding-left:0.15rem;
      height: 0.33rem;
      font-size: 12px;
      line-height: 0.33rem;
      display: flex;
      .link-more{
        display:flex;
        .link_box01{
          display: inline-block;
          width:1rem;
          margin-right: 0.2rem;
        }
        .link_box02{
          display: inline-block;
          width:1.15rem;
        }
        #link-num{
          float:right;
        }
      }
    }
  }
}
.moredetail::-webkit-scrollbar {display:none;}
</style>
