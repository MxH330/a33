import http from '../utils/http'
import API from '../api'

// 搜索电影、影院数据
export function getCinemaList(cityId,kw,stype){
    return new Promise((resolve,reject)=>{
        http({
            url:API.SEARCH_MOVIES_CINEMA,
            method:'GET',
            data:{
                cityId,
                kw: kw,
                stype:stype
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 搜索更多电影、影院数据
export function getMoreMovie_CinemaList(ci,kw,offset){
    return new Promise((resolve,reject)=>{
        http({
            url:API.SEARCHMORE_MOVIES_CINEMA,
            method:'GET',
            data:{
                keyword: kw,
                ci:30,
                offset:offset,
                limit:20
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 搜索所给位置的影院的数据
export function getCity_allcinemas(movieId,day,districtId,lineId,hallType,brandId,serviceId,areaId,stationId,reqId,cityId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.All_CITYCINEMAS,
            method:'GET',
            data:{
                movieId:movieId || '',
                day: day,
                offset: 0,
                limit: 20,
                districtId: districtId,
                lineId,
                hallType,
                brandId,
                serviceId,
                areaId: areaId,
                stationId,
                item: '',
                updateShowDay: true,
                reqId: reqId,
                cityId: cityId
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
            reject(error);
        })
    })
}


// 搜索该地区所包含的内部地区
export function getcity_area(ci){
    return new Promise((resolve,reject)=>{
        http({
            url:API.GET_CITY_AREA,
            method:'GET',
            data:{
                ci
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}



// 搜索电影详情中获取该位置得播放此点电影的影院的数据
export function gethaveMovie_cinemas(movieId,day,reqId,cityId,forceUpdate,){
    return new Promise((resolve,reject)=>{
        http({
            url:API.GET_DATA_CINEMA + '?' + "forceUpdate=" + forceUpdate,
            method:'POST',
            data:{
                movieId,
                day,
                offset: 0,
                limit: 20,
                districtId: -1,
                lineId: -1,
                hallType: -1,
                brandId: -1,
                serviceId: -1,
                areaId: -1,
                stationId: -1,
                item: '',
                updateShowDay: true,
                reqId,
                cityId:1,
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
        })
    })
}

// 获取点击的电影院的详情


export function getCinemaDetail(cinemaId){
    return new Promise((resolve,reject)=>{
        http({
            url:API.GETCINEMA_DETAIL,
            method:'GET',
            data:{
                cinemaId
            }
        })
        .then(({data,status})=>{
            if(status != 200){
                //请求失败
                return;
            }
            resolve(data);
        })
        .catch(error=>{
            //请求失败
            console.log(error);
            reject(error)
        })
    })
}

















