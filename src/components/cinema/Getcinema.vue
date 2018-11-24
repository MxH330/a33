<template>
    <div class="cinemalist">
        <app-content ref="content" class="content">
            <div class="allcitycinema">
                <div class="cinemaList" v-for="(item,index) in citycinemas" :key="index" @click="cinemaDetail(index)">
                    <div class="cinema">
                        <div class="info">
                            <p class="name-price">
                                <span class="cinemaName">{{item.nm}}</span>
                                <span class="cinemaPrice"><span class="priceNum">{{item.sellPrice}}</span>元起</span>
                            </p>
                            <p class="address">{{item.addr}}</p>
                            <p class="feature-tags">
                                <!-- <span v-for="(item1,index) in item.hallType" :key="index">{{item1}}</span> -->
                                <span v-if="item.tag.allowRefund == 1">退</span>
                                <span v-if="item.tag.endorse == 1">改签</span>
                                <span v-if="item.tag.hallType == '4K厅'">4K厅</span>
                                <span v-if="item.tag.hallType == '巨幕厅'">巨幕厅</span>
                                <span class="featrue" v-if="item.tag.snack == 1">小吃</span>
                                <span class="featrue" v-if="item.tag.vipTag == '折扣卡'">折扣卡</span>
                            </p>
                        </div>
                        <div class="distance">{{item.distance}}</div>
                    </div>
                </div>

                <div class='waitGet' v-if="isshow == 1">
                    <span class="span1" ref="span1"></span><span class="span2" ref="span2">正在加载...</span>
                </div>
                <div class="no-cinema" v-if="showTip == 1">
                    <img src="../../assets/noshow.png">
                    <div class="no-cinema-tip">暂无符合条件的影院</div>
                </div>
            </div>
        </app-content>
    </div>
</template>

<script>
import {getCity_allcinemas,gethaveMovie_cinemas,getCinemaDetail} from '../../services/cinema'
import {mapState} from 'vuex'
export default {
  name: "cinemalist",
  data(){
      return{
        citycinemas:[],
        isshow:1,
        showTip:0,
        movieId:localStorage.getItem('movieId'),
        day:0,
        reqId:0,
        cinemaId:0,
        newDate:new Date()
      }
  },
  computed:{
      ...mapState(['cityID'])
  },
  methods:{
      // 点击影院获取影院详情
    cinemaDetail(index){
        this.cinemaId = this.citycinemas[index].id;
        localStorage.setItem('cinemaId',this.cinemaId);
        this.$router.push({
            name:'cinemadetail',
            params:{
                cinemaId:this.cinemaId
            }
        })
    }
  },
  created(){
        console.log(this.$refs);
        let nowDay = this.newDate.getDate(); //当前日
        let nowMonth = this.newDate.getMonth() + 1;  //当前月, 月是从0开始的所以要加 1
        let nowYear = this.newDate.getFullYear(); //当前年
        this.day = nowYear + '-' + nowMonth + '-' + nowDay
        this.reqId = this.newDate.getTime()

            console.log(this.movieId);
        this.$center.$on('sendDay',(day)=>{
            // console.log(day)
            this.day = day;
            gethaveMovie_cinemas(this.movieId,this.day,this.reqId,this.cityID,this.reqId).then((result)=>{
                console.log(result)
                this.citycinemas = result.cinemas;
            })
        })

        this.$center.$on('getCity_allcinemas',(result)=>{
            console.log(result)
            if(result == 1){
                setTimeout(()=>{
                    getCity_allcinemas(-1,this.day,-1,-1,-1,-1,-1,-1,-1,this.reqId,this.cityID).then((result)=>{
                        if(!result){
                            return;
                        }
                        this.citycinemas = result.cinemas;
                        this.isshow = 0;
                    })
                },100)
            }
        })
        setTimeout(()=>{
            getCity_allcinemas(-1,this.day,-1,-1,-1,-1,-1,-1,-1,this.reqId,this.cityID).then((result)=>{
                if(!result){
                    return;
                }
                this.citycinemas = result.cinemas;
                // console.log(this.citycinemas);
                this.isshow = 0;
            })
            .catch((error)=>{
                console.log('网络异常' + error);
                this.$refs.span1.style.display = 'none';
                this.$refs.span2.innerText = '加载异常... 将自动跳转';
                setTimeout(()=>{
                    this.$router.back();
                },2000)
            })
        },1000)
        this.$center.$on('getResult',(result)=>{
            // console.log(result);
            this.citycinemas = result.cinemas;
            if(this.citycinemas == ''){
                this.showTip = 1;
            }
        })
  },
};
</script>

<style lang="scss" scoped>
.content{
    top:0;
    bottom:0;
}
.waitGet{
    position: absolute;
    width:100%;
    top:1px;
    bottom:49px;
    left:0;
    z-index: 20;
    font-size: 14px;
    color:#666;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    box-sizing: border-box;
    background: #fff;
    .span1{
        display: inline-block;
        width:0.2rem;
        height:0.2rem;
        background: url(../../assets/jiazai.png) no-repeat center;
        background-size: 100%;
        margin-right: 3px;
        animation: rotate 1s linear infinite;
    }
    .span2{
        height: 0.2rem;
        margin-left: 3px;
    }
}
@keyframes rotate{
    0%{
        transform: rotate(0)
    }
    100%{
        transform: rotate(360deg)
    }
}
.no-cinema{
    width: 50%;
    padding-top: 20%;
    margin: auto;
    img{
        display: block;
        width: 40%;
        margin: auto;
    }
    .no-cinema-tip {
        text-align: center;
    }
}
.cinemalist {
width: 100%;
position: absolute;
left: 0;
bottom: 49px;
top: 128px;
z-index: 14;
overflow: hidden;
.cinemaList {
    border-bottom: 1px solid #e6e6e6;
    display: flex;
    -webkit-box-align: center;
    align-items: center;
    -webkit-box-pack: justify;
    justify-content: space-between;
    padding: 0.15rem;
    position: relative;
    margin-right: 0.16rem;
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
        color: #666;
        white-space: nowrap;
        margin-left: 0.03rem;
        .priceNum {
        font-size: 17px;
        color: #ef4238;
        }
    }
    .address {
        font-size: 13px;
        color: #666;
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
    color: #666;
    position: absolute;
    top: 0.43rem;
    right: 0.3rem;
    }
}
}
</style>

