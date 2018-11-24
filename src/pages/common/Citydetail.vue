<template>
    <div class="showmorechoice">
        <div class="cityChoice">
            <div class="choice01" v-for="(item,index) in citychoice"  @click="choicetabs(index)" :class="{activetop: choiceindex == index}" ref="choice01">{{item}}<span class="sanjiao" ref="choiceSpan"></span></div>
        </div>
        <div class="citycon" ref="citycon">
            <div class="citywarp" ref="citywarp" v-if="showboxIndex == 0">
                <!-- 第一部分 -->
                <div class="choiceIncity" v-if="(choiceindex == 0 && choice01)" >
                    <div class="city_station">
                        <div class="city_station_item" v-for="(item,index) in cityStation"  :class="{active: tabindex == index}" @click="citystation(index)">
                            {{item}}
                        </div>
                    </div>
                    <div class="citybox" v-if="tabindex == 0">
                        <div class="cityboxLeft" >
                            <div id="cityboxLeft_item"  v-for="(item,index) in district" :key="item.name" :class="{chosed: areaIndex == index}" @click="getMinarea(index)">{{item.name}}<span>({{item.count}})</span></div>
                           
                        </div>
                        <div class="cityboxRight">
                            <div class="cityitem" v-for="(item,index) in Minarea" :key="index"  @click="minareaGetClass(index)">
                                <span class="cityitem-name" :class="{actived: minareaindex == index}">{{item.name}}</span>
                                <span class="cityitem-count" :class="{actived: minareaindex == index}">{{item.count}}</span>
                            </div>
                        </div>
                        
                    </div>
                    <div class="stationbox" v-if="tabindex == 1">
                        <div class="cityboxLeft">
                          <div id="cityboxLeft_item" v-for="(item,index) in subway" :key="item.name" :class="{chosed: subwayIndex == index}" @click="getMinsubway(index)">{{item.name}}<span>({{item.count}})</span></div>
                           
                        </div>
                        <div class="cityboxRight">
                            <div class="cityitem" v-for="(item,index) in Minsubway" :key="index"  @click="minsubwayGetClass(index)">
                                <span class="cityitem-name" :class="{actived: minsubwayIndex == index}">{{item.name}}</span>
                                <span class="cityitem-count" :class="{actived: minsubwayIndex == index}">{{item.count}}</span>
                            </div>
                        </div>
                      
                    </div>
                
                </div>
                <!-- 第二部分 -->
                <div class="brand" v-else-if="(choiceindex == 1 && choice02)">
                    <div class="brand-content"> 
                        <div class="brand-list" v-for="(item,index) in brand" :key="item.name" :class="{actived:pinpaiIndex == index}" @click="getThisCinema(index)">
                            <span class="brand-name ">{{item.name}}</span>
                            <span class="brand-count ">{{item.count}}</span>
                        </div>
                        
                    </div>
                </div>
                <!-- 第三部分 -->
                <div class="special-content" v-else-if="(choiceindex == 2 && choice03)">
                    <div class="item-title">特色功能</div>
                      <div class="item-list" v-for="(item,index) in service" :key="item.id"  @click="serviceGetCinema(index)">
                          <div class="item" :class="{chosen:serviceIndex==index}">{{item.name}}</div>
                      </div>
                    <div class="item-title1">特色厅</div>
                      <div class="item-list" v-for="(item,index) in hallTypebox" :key="item.name" @click="hallTypeboxGetCinema(index)">
                          <div class="item" :class="{chosen:hallTypeboxIndex == index}">{{item.name}}</div>
                      </div>
                    <div id="special-btn">
                      <span class="btn" id="cancel-btn" @click="resetChose">重置</span>
                      <span class="btn" id="confirm-btn" @click="sendThisReq">确定</span>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { getcity_area, getCity_allcinemas } from "../../services/cinema.js";
import { mapState } from "vuex";
export default {
  name: "citydetail",
  data() {
    return {
      citychoice: ["全城", "品牌", "特色"],
      cityStation: ["商区", "地铁站"],
      tabindex: 0,
      showboxIndex:0,
      choice01: false,
      choice02: false,
      choice03: false,
      choiceindex: 10,
      brand: [], // 品牌
      district: [], // 地区
      hallTypebox: [], // 特殊厅
      service: [], // 服务
      subway: [], // 地铁
      timeRanges: [], // 时段
      areaIndex:0,
      minareaindex:0,
      subwayIndex:0,
      minsubwayIndex:0,
      pinpaiIndex:0,
      serviceIndex:0,
      hallTypeboxIndex:0,
      allinfo:[],
      Minarea:[],
      Subwayinfo:[],
      Minsubway:[],
      // 声明日期对象
      newDate: new Date(),
      // 所需要的参数
      day:'',
      // offset:0,
      districtId:-1,
      lineId: -1,
      hallType: -1,
      brandId: -1,
      serviceId: -1,
      areaId:-1,
      stationId: -1,
      reqId:0,
      movieId:'',
    };
  },
  computed: {
    ...mapState(["cityID"]),
    geta(){
      return this.$store.state.cityID;
    }
  },
  watch:{
    geta:function(){
        this.citychoice = ["全城", "品牌", "特色"];
        this.choice01 = false;
          this.choice02 =false;
          this.choice03 =false;
          for(let i=0;i<3;i++){
            this.choiceindex= -1;
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
    }
  },
  methods: {
    choicetabs(index) {
      this.showboxIndex = 0;
      getcity_area(this.cityID).then(
        ({ brand, district, hallType, service, subway, timeRanges }) => {
          this.brand = brand.subItems;

          this.district = district.subItems;
          this.hallTypebox = hallType.subItems;
          this.service = service.subItems;
          this.subway = subway.subItems;
          this.timeRanges = timeRanges.subItems;
          this.allinfo = [];
          this.Minarea = [];
          this.district.map((item)=>{
            this.allinfo.push(item.subItems)
          }) 
          this.Subwayinfo = [];
          this.Minsubway = []
          this.subway.map(item=>{
            this.Subwayinfo.push(item.subItems);
          })
        }
      );
      this.choiceindex = index;
      if (this.choiceindex == 0) {
        this.choice01 = !this.choice01;
        this.choice02 = false;
        this.choice03 = false;
        
        if (this.choice01 == true) {
          for(let i=0;i<3;i++){
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
          this.$refs.choiceSpan[0].className = "xiasanjiao";
        } 
        if(this.choice01 == false){
          this.choiceindex = -1
         
          this.$refs.choiceSpan[0].className = "sanjiao";
        }
      }
      if (this.choiceindex == 1) {
        this.choice02 = !this.choice02;
        this.choice01 = false;
        this.choice03 = false;
        if (this.choice02== true) {
          for(let i=0;i<3;i++){
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
          this.$refs.choiceSpan[1].className = "xiasanjiao";
        } 
        if(this.choice02 == false){
          this.choiceindex = -1;
          this.$refs.choiceSpan[1].className = "sanjiao";
        }
      }
      if (this.choiceindex == 2) {
        this.choice03 = !this.choice03;
        this.choice01 = false;
        this.choice02 = false;
        if (this.choice03 == true) {
          for(let i=0;i<3;i++){
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
          this.$refs.choiceSpan[2].className = "xiasanjiao";
        } 
        if(this.choice03 == false){
          this.choiceindex = -1
          this.$refs.choiceSpan[2].className = "sanjiao";
        }
      }
    },
    // 获取该地区中的地区 
    getMinarea(index){
      this.areaIndex = index;
      console.log(this.allinfo)
      this.Minarea = this.allinfo[index];
      // 发送ajax
      // 获取时间day 、districtId:地区id、 areaId: 内部小地区id 、reqId:  时间戳   、城市id：cityID
      
      this.districtId = this.district[index].id;
    },
    minareaGetClass(index){
      this.minareaindex = index;
      this.areaId = this.Minarea[index].id
      getCity_allcinemas(this.movieId,this.day,this.districtId,this.lineId,this.hallType,this.brandId,this.serviceId,this.areaId,this.stationId,this.reqId,this.cityID).then((result)=>{
        console.log(result)
        this.$center.$emit('getResult',result);
        this.showboxIndex = 10;
        this.citychoice[0] = this.Minarea[index].name
        if(index == 0){
          this.citychoice[0] = this.district[index + 1].name;
        }
        this.choice01 = false;
        this.choice02 =false;
        this.choice03 =false;
        for(let i=0;i<3;i++){
            this.choiceindex= -1;
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
      })

    },
    // 获取该地铁线中的地区 
    getMinsubway(index){
      this.subwayIndex = index;
      this.Minsubway = this.Subwayinfo[index];
      this.lineId = this.subway[index].id;

    },
    // 选择地铁后影院的变化
    minsubwayGetClass(index){
      this.minsubwayIndex = index;
      this.stationId = this.Minsubway[index].id
      getCity_allcinemas(this.movieId,this.day,this.districtId,this.lineId,this.hallType,this.brandId,this.serviceId,this.areaId,this.stationId,this.reqId,this.cityID).then((result)=>{
        console.log(result)
        this.$center.$emit('getResult',result);
        this.showboxIndex = 10;
        this.citychoice[0] = this.Minsubway[index].name
        this.choice01 = false;
        this.choice02 =false;
        this.choice03 =false;
        for(let i=0;i<3;i++){
            this.choiceindex= -1;
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
      })
    },
    // 选择品牌后影院的变化
    getThisCinema(index){
        this.pinpaiIndex = index;
        this.brandId = this.brand[index].id
        getCity_allcinemas(this.movieId,this.day,this.districtId,this.lineId,this.hallType,this.brandId,this.serviceId,this.areaId,this.stationId,this.reqId,this.cityID).then((result)=>{
        this.$center.$emit('getResult',result);
        this.showboxIndex = 10;
        this.citychoice[1] = this.brand[index].name
        this.choice01 = false;
        this.choice02 =false;
        this.choice03 =false;
        for(let i=0;i<3;i++){
            this.choiceindex= -1;
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
      })
    },
    // 选择服务后的影院变化
    serviceGetCinema(index){
      this.serviceIndex = index;
      this.serviceId = this.service[index].id;
    },
    // 选择特殊厅后的影院变化
    hallTypeboxGetCinema(index){
      this.hallTypeboxIndex = index;
      this.hallType = this.hallTypebox[index].id;
    },
    // 重置服务选择
    resetChose(){
      this.serviceIndex = 0;
      this.serviceId = -1;
      this.hallTypeboxIndex = 0;
      this.hallType = -1;
    },
    sendThisReq(){
      getCity_allcinemas(this.movieId,this.day,this.districtId,this.lineId,this.hallType,this.brandId,this.serviceId,this.areaId,this.stationId,this.reqId,this.cityID).then((result)=>{
        this.$center.$emit('getResult',result);
        this.showboxIndex = 10;
        this.choice01 = false;
        this.choice02 =false;
        this.choice03 =false;
        for(let i=0;i<3;i++){
            this.choiceindex= -1;
            this.$refs.choiceSpan[i].className = "sanjiao";
          }
      })
    },
    citystation(index) {
      this.tabindex = index;
      
    }
  },
  created(){
    // 点击了更换城市，就更新城市内部数据
    this.$center.$on('getIndex',(value)=>{
      this.showboxIndex = value;
      })
    let nowDay = this.newDate.getDate(); //当前日
    let nowMonth = this.newDate.getMonth() + 1; //当前月
    let nowYear = this.newDate.getFullYear(); //当前年
    this.day = nowYear + '-' + nowMonth + '-' + nowDay
    this.reqId = this.newDate.getTime()
  }
};
</script>

<style lang="scss" scoped>
.cityChoice {
  width: 95%;
  position: absolute;
  left: 0;
  top: 89px;
  height: 40px;
  border-bottom: 1px solid #eee;
  display: flex;
  justify-content: space-around;
  background: #fff;
  .choice01 {
    flex: 1;
    height: 40px;
    text-align: center;
    line-height: 40px;
    font-size: 13px;
    color: #777;
    background: url(../../assets/fenge.png) no-repeat right top;
    background-size: 1px 70%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    .sanjiao{
        display: inline-block;
        position: absolute;
        top: 18px;
        width: 0;
        height: 0;
        margin-left: 4px;
        border: 4px solid transparent;
        border-top-color: #b0b0b0;
    }
    .xiasanjiao{
        display: inline-block;
        position: absolute;
        top: 14px;
        width: 0;
        height: 0;
        margin-left: 4px;
        border: 4px solid transparent;
        border-bottom-color: red !important;
    }
  }
  .activetop {
    color: red !important;
  }
  .choice01:last-child {
    background: none;
  }
}
// 第一部分
.choiceIncity {
  width: 100%;
  height: 3.78rem;
  position: absolute;
  left: 0;
  top: 129px;
  z-index: 25;
  background: #fff;
  color: #777;
  font-size: 14px;
  box-shadow: 6px 4px 0.23rem -8px;
  .city_station {
    width: 96%;
    display: flex;
    height: 0.44rem;
    text-align: center;
    line-height: 0.44rem;
    background: #fff;
    .city_station_item {
      flex: 1;
    }
  }
  .citybox,
  .stationbox {
    width: 96%;
    height: 3.34rem;
    background: #f5f5f5;
    overflow: scroll;
    .cityboxLeft {
      width: 30%;
      height: 100%;
      float: left;
      background: #fff;
      overflow: scroll;
      #cityboxLeft_item,
      #stationboxLeft_item {
        height: 0.44rem;
        line-height: 0.44rem;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
        text-align: center;
      }
      .chosed {
        color: #f03d37;
        background: #f5f5f5;
      }
    }
    .cityboxRight {
      width: 70%;
      height: 100%;
      float: right;
      overflow: scroll;
      .cityitem{
          width: 80%;
          position: relative;
          height: 45px;
          line-height: 45px;
          padding: 0 0 0 25px;
          .cityitem-name{
            width:80%;
            display:inline-block;
            font-size: 14px;
            color: #333;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
          }
          .cityitem-count{
            // width:80%;            
            float: right;
            width: 20px;
            margin-right: 10px;
            color: #8f9296;
            font-size: 13px;
            text-align: right;
          }
      }
    }
  }
}
.cityboxLeft::-webkit-scrollbar {display:none}
// 第二部分
.brand {
  width: 100%;
  height: 2.78rem;
  position: absolute;
  top: 129px;
  left: 0;
  z-index: 25;
  background: #fff;
  color: #777;
  overflow: scroll;
  box-shadow: 6px 4px 23px -8px;
  font-size: 14px;
  .brand-list {
    line-height: 44px;
    height: 44px;
    padding: 0 15px 0 26px;
    border-bottom: 1px solid #e5e5e5;
    .brand-name {
      display: inline-block;
      width: 49%;
      text-align: left;
    }
    .brand-count {
      display: inline-block;
      width: 45%;
      text-align: right;
    }
  }
}
// 第三部分
.special-content {
  width: 100%;
  position: absolute;
  top: 129px;
  left: 0;
  z-index: 25;
  background: #fff;
  color: #777;
  min-height: 1.5rem;
  max-height:4.1rem;
  box-shadow: 6px 4px 23px -8px;
  .item-title {
    margin-left: 12px;
    margin-top: 11px;
    font-size: 15px;
  }
  .item-title1{
    margin-top: 58px;
    margin-left: 12px;
    font-size: 15px;
  }
  .item-list {
    margin: 0 12px;
    font-size: 15px;
    .item {
      float: left;
      width: 21.3%;
      height: 30px;
      padding: 3px 0;
      margin-right: 3%;
      margin-top: 10px;
      line-height: 30px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      text-align: center;
      border: 1px solid #ccc;
      border-radius: 5px;
      font-size: 12px;
    }
    .chosen {
      background: #fcf0f0;
      color: #f03d37;
      border: 1px solid #f03d37;
    }
  }
  #special-btn{
    height: 60px;
    width: 100%;
    border-top: 1px solid #e5e5e5;
    margin-top: 1.96rem;
    background: #fafafa;
    .btn {
    display: inline-block;
    height: 34px;
    width: 21.3%;
    margin: 13px 11px;
    border: 1px solid #e5e5e5;
    border-radius: 6px;
    text-align: center;
    line-height: 34px;
    font-size: 14px;
    }
    #cancel-btn{
      float: left;
    }
    #confirm-btn {
    float: right;
    background: #f03d37;
    border: 1px solid #f03d37;
    color: #fff;
  }

}
}
.active {
  color: red;
  border-bottom: 2px solid red;
}

.actived {
  color: red !important;
}

</style>
