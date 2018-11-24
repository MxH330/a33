import Vue from 'vue'

Vue.filter('replaceWH', (path, w, h)=>{
    return path.replace(/w.h/, `${w}.${h}`);
})
Vue.filter('splitDate', (path)=>{
    return path.split(' ')[0];
})
Vue.filter('getDay',(path)=>{
    return path.split('-')[1] + '年' + path.split('-')[2] + '月'
})