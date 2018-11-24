//开发环境
const SAT_HOST = 'http://localhost:8080';
//测试
const UAT_HOST = 'http://10.213.12.98:8080';
//生产
const PRO_HOST = 'https://m.maoyan.com';


/*
正在热映的接口
参数： token 用户标识
*/
const PLAYING_API = '/ajax/movieOnInfoList';

/*
获取更多热映数据的接口    
参数： token 用户标识
      movieids 数据对应的ids的字符串

*/
const MORE_PLAYING_API = '/ajax/moreComingList'

/*
最受期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_EXPECTED_API = '/ajax/mostExpected';

/*
最受更多期待的电影数据接口
参数：ci 城市id
     limit   数据长度
     offset   数据偏移量
     token  用户标识
*/
const MOST_MORE_EXPECTED_API = '/ajax/mostExpected';



/*
即将上映的接口
参数： ci   城市id
      token   用户标识
      limit   数据长度
*/
const COMING_API = '/ajax/comingList';


/*
获取更多即将上映的接口
参数： ci   城市id
      token   用户标识
      limit   数据长度
      movieids 数据对应的ids的字符串
*/
const MORE_COMING_API = '/ajax/moreComingList';

/*
获取电影详情的接口
参数： 
      movieids 数据对应的ids的字符串
*/
const GET_MOVIEDETAIL_API = '/ajax/detailmovie';





// 影院模块

// 搜索影院/电影 获取数据
/*
参数： cityId   城市id
      kw  搜索的内容，双向绑定的
      stype 为 -1 搜索的是影院和电影， 2 为搜索仅仅是影院

*/

const SEARCH_MOVIES_CINEMA = '/ajax/search';

// 搜索电影 影院获取数据
/*
参数： 
      keyword  搜索的内容，双向绑定的    
      ci  城市id
      offset 数据偏移量
      limit  数据长度
*/

const SEARCHMORE_MOVIES_CINEMA = '/searchlist/movies';


// 点击打开电影详情
/*
      参数：
      cinemaId :影院id
*/
const GETCINEMA_DETAIL =  '/ajax/cinemaDetail'



/*
城市列表接口
*/
const CITY_LIST_API = '/dianying/cities.json';


/*
请求该定位地区的全城的影院数据
参数：
      day: 2018-11-16
      offset: 0
      limit: 20
      districtId: -1
      lineId: -1
      hallType: -1
      brandId: -1
      serviceId: -1
      areaId: -1
      stationId: -1
      item: 
      updateShowDay: true
      reqId: 1542381990329
      cityId: 10


*/
const All_CITYCINEMAS = '/ajax/cinemaList'


/*
获取该城市所点击的内部地区数据
参数： ci：

*/

const GET_CITY_AREA = '/ajax/filterCinemas'

/*
获取该城市所点击的内部地区数据
参数： ci：

*/

const GET_DATA_CINEMA = '/ajax/movie'

/*
根据点击日期，刷新该日期下播放该电影的影院
参数：
 movieId 电影id
 day 日期
*/
// const GET_THISDAY_CINEMAS = '/ajax/filterCinemas'
export default {
    SAT_HOST,
    UAT_HOST,
    PRO_HOST,
    PLAYING_API,
    MORE_PLAYING_API,
    GET_MOVIEDETAIL_API,
    MOST_EXPECTED_API,
    MOST_MORE_EXPECTED_API,
    COMING_API,
    MORE_COMING_API,
    SEARCH_MOVIES_CINEMA,
    SEARCHMORE_MOVIES_CINEMA,
    CITY_LIST_API,
    All_CITYCINEMAS,
    GET_CITY_AREA,
    GET_DATA_CINEMA,
    GETCINEMA_DETAIL
}
