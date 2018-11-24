import http from '../utils/http'
import API from '../api'


//请求正在热映的电影数据
export function getPlayingList(){
    return new Promise((resolve, reject)=>{
        http({
            url: API.PLAYING_API,
            method: 'GET',
            data: {
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.movieList.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img.replace('w.h','128.180')
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve({
                data:newData,
                ids:data.movieIds
            });
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

//请求更多正在热映的电影数据
export function getmorePlayingList(ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORE_PLAYING_API,
            method: 'GET',
            data: {
                token: '',
                movieIds:ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                img = img.replace('w.h','128.180')
                return {id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 请求最受期待的电影数据
export function getMostExpectedData(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOST_EXPECTED_API,
            method: 'GET',
            data: {
                ci: ci,
                limit: 10,
                offset: 0,
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200)
                //请求失败
                return;
            //请求成功
            console.log(data)
            resolve({
                data:data.coming,
                paging:data.paging
            });
        })
        .catch(error=>{
            //请求失败
        })
    })
}

// 请求更多最受期待的电影数据
export function getMoreExpectedData(ci,num){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MOST_MORE_EXPECTED_API,
            method: 'GET',
            data: {
                ci: ci,
                limit: 10,
                offset: num,
                token: ''
            }
        })
        .then(({data, status})=>{
            if(status != 200)
                //请求失败
                return;
            //请求成功
            resolve(data);
        })
        .catch(error=>{
            //请求失败
        })
    })
}
//请求即将上映的电影数据
export function getComingList(ci){
    return new Promise((resolve, reject)=>{
        http({
            url: API.COMING_API,
            method: 'GET',
            data: {
                ci,
                token: '',
                limit: 10
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败，提醒用户
                return;
            }
            //请求成功
            //过滤数据
            console.log(data)
            let newData = data.coming.map(item=>{
                let {comingTitle, img, nm, wish, star, showInfo, globalReleased, version,id} = item;
                return {comingTitle, img, nm, wish, star, showInfo, globalReleased, version,id};
            })
            //对数据进行分类
            let dataMap = {};
            newData.map(item=>{
                if(!dataMap[item.comingTitle]){
                    dataMap[item.comingTitle] = [];
                }
                dataMap[item.comingTitle].push(item);
            })
            // 还要把所有数据的id全部输出去
            resolve({
                dataMap:dataMap,
                comingIds: data.movieIds
            });
        })
        .catch(error=>{
            //请求失败
        })
    })
}

//请求更多即上映的电影数据
export function getmoreComingList(ci,ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.MORE_COMING_API,
            method: 'GET',
            data: {
                ci,
                token: '',
                limit:10,
                movieIds:ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let newData = data.coming.map(item=>{
                let {comingTitle,id, nm, img, version, sc, star, showInfo, globalReleased,wish} = item;
                return {comingTitle,id, nm, img, version, sc, star, showInfo, globalReleased,wish};
            })
            resolve(newData);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}
//请求正在热映的电影详情数据
export function getMovieDetail(ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.GET_MOVIEDETAIL_API,
            method: 'GET',
            data: {
                movieId:ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            let obj = data.detailMovie
            let aobj = {albumImg:'',img:'',id:0, nm:'', snum:0, cat:'', enm:'', sc:0, src:0, dur:'', pubDesc:0,wish:0,version:'',videourl:'',globalReleased:""}
            let newData = function(){
                for(var m in obj){
                    for(var n in aobj){
                        if( m == n){
                           aobj[n] = obj[m]
                        }
                    }
                }
                return aobj

            }
            
            let newdata  = newData();
            newdata.img = newdata.img.replace('w.h','127.180');
            resolve(newdata);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

//再次请求正在热映的电影详情数据，渲染到该电影得更加详情得页面
export function getMoreDetail(ids){
    return new Promise((resolve, reject)=>{
        http({
            url: API.GET_MOVIEDETAIL_API,
            method: 'GET',
            data: {
                movieId:ids
            }
        })
        .then(({data, status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            //请求成功
            console.log(data);
            data.detailMovie.img = data.detailMovie.img.replace('w.h','127.180');
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}
