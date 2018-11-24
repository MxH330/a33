<template>
    <div class="movieDetail" ref="movieDetail">
      <div class="DetailWrap">
        <app-header :title="title">
          <div slot="left" @click="goBack"><i class="iconfont icon-fanhuitubiao"></i></div>
        </app-header>
          <div class="movie-detail" data-bid="dp_wx_buy_movie" @click="MoreDetail">
              <div class="movie-filter"></div>
              <div class="poster-bg" :style="{'backgroundImage': 'url(' + movieDetail.img + ')' }"></div>
              <div class="detail">
                  <div class="poster">
                      <img :src="movieDetail.img"/>
                  </div>
                  <div class="content flex">
                      <div class="title middle line-ellipsis">{{movieDetail.nm}}</div>
                      <div class="title-en-name line-ellipsis">{{movieDetail.enm}}</div>
                      <div class="score line-ellipsis">{{movieDetail.sc}}<span class="snum">({{movieDetail.snum}}万人评)</span> 
                      </div>
                      <div class="type line-ellipsis">
                          <span>{{movieDetail.cat}}</span>
                          
                              <div class="type-group">
                                  
                                  <img style="width: 42px;" class="sd-imax" src="../../assets/3d.png">
                                  
                              </div>
                          
                      </div>
                      <div class="src line-ellipsis">{{movieDetail.src}}/{{movieDetail.dur}}分钟</div>
                      <div class="pubDesc line-ellipsis">{{movieDetail.pubDesc}}</div>
                  </div>
              </div>
          
              <div class="arrow-g">
                  <img src="../../assets/rightjiantou.png">
              </div>
          </div>
        <div id="showDays" ref="showDays">
          <div id="timeline" class="mb-line-b">
              <div class="showDay" v-for="(item,index) in showalldays" :key="index" :class="{chosen:showDayindex == index}" @click="showDay(item,index)">
                {{item.date | getDay()}}
              </div>
          </div>
        </div>
        <citydetail class="city-detail"></citydetail>
        <cinemalist class="cinema-list"></cinemalist>
      </div>
    </div>
</template>

<script>
import {getMovieDetail} from '../../services/movieService';
import Citydetail from './Citydetail';
import GetCinema from '../../components/cinema/Getcinema'
import {gethaveMovie_cinemas} from '../../services/cinema'
import {mapState} from 'vuex'
export default {
  components:{
    [Citydetail.name]:Citydetail,
    [GetCinema.name]:GetCinema,
  },
  computed:{
    ...mapState(["cityID"])
  },
  data() {
    return {
      title: this.$route.params.title,
      movieId: localStorage.getItem('movieId'),
      movieDetail:{},
      showalldays:[],
      day:'',
      reqId:0,
      showDayindex:0,
      newDate: new Date()
    };
  },
  methods:{
    showDay(item,index){
      this.showDayindex = index;
      console.log(item)
      this.day = item.date;
      this.$center.$emit('sendDay',this.day);

    },
    MoreDetail(){
      this.$router.push(
              {
                  name: 'moredetail',
                  params: {
                      title:this.title,
                  }
              }
          ); 
    },
    goBack(){
      this.$router.back();
    }
  },
  created(){
      let nowDay = this.newDate.getDate(); //当前日
      let nowMonth = this.newDate.getMonth() + 1; //当前月
      let nowYear = this.newDate.getFullYear(); //当前年
      this.day = nowYear + '-' + nowMonth + '-' + nowDay
      this.reqId = this.newDate.getTime()
      console.log(this.reqId)

      // 获取数据
      console.log(this.cityID)
      gethaveMovie_cinemas(this.movieId,this.day,this.reqId,this.cityID,this.reqId).then((result)=>{
      console.log(result)
      this.showalldays = result.showDays.dates;

      // 传日期
    })
      this.$center.$emit('sendDay',this.day);

      getMovieDetail(this.movieId).then((result)=>{
          this.movieDetail = Object.assign({},this.movieDetail,result);
          if(this.movieDetail.snum > 10000){
            this.movieDetail.snum = (this.movieDetail.snum % 1000) / 10;
          }
          console.log(this.movieDetail)
          localStorage.setItem('moviedetail',JSON.stringify(this.movieDetail));
      })
  },
  mounted(){
    var scroll = new IScroll(this.$refs.movieDetail, {
        scrollY : true,
    })
    //动态计算需要滚动的宽度
        scroll.on('beforeScrollStart', ()=>{
            scroll.refresh();
        })
  }
};
</script>

<style lang="scss" scoped>
.movieDetail {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  background: #fff;
  z-index: 100000;
  overflow: hidden;
  .DetailWrap{
    width:100%;
    height: 200%;
  }
  .movie-detail {
    width: 100%;
    height: 188px;
    position: relative;
    top: 44px;
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
      // -webkit-filter: blur(1.2rem);
      filter: blur(0.5rem);
      background-size: cover;
      background-repeat: no-repeat;
    }
    .detail {
      position: absolute;
      height: 150px;
      padding: 0.19rem 0.3rem 0.19rem 0.15rem;
      display: flex;
      .poster {
          flex:1;
        img {
          width: 110px;
          height: 150px;
          box-sizing: border-box;
          margin-left: 0.08rem;
        }
      }
      .content {
        flex: 1;
        overflow: hidden;
        margin-left: -15px;
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
          .snum{
            margin-top: 10px;
            font-size: 12px;
            color: #fff;
            opacity: .8;
          }
        }
        .type {
          margin-top: 10px;
          font-size: 12px;
          color: #fff;
          opacity: 0.8;
          .type-group{
            display: inline-block;
            width: 42px;
            opacity: .85;
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
    .arrow-g {
      position: absolute;
      width: 10px;
      right: 15px;
      top: 50%;
      -webkit-transform: translateY(-50%);
      transform: translateY(-50%);
    }
  }
  #showDays{
    position: relative;
    top:40px;
    width: 100%;
    background-color: #fff;
    #timeline{
      white-space: nowrap;
      overflow-x: scroll;
      height: 45px;
      border-bottom:1px solid #e6e6e6;
      .showDay{
        display: inline-block;
        width: 115px;
        line-height: 43px;
        margin-left: 4.5px;
        font-size: 16px;
        text-align: center;
        color:#333;
      }
      .chosen{
        color:red;
        border-bottom: 2px solid red;
      }
    }
    #timeline::-webkit-scrollbar {display:none}
  }
  .city-detail{
    width:100%;
    position: absolute;
    top:185px;
  }
  .cinema-list{
    top:311px;
    bottom:0;
    background: #fff;
    border-top:0.5px solid #eee;
  }
}
</style>
