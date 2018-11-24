import axios from 'axios'
import API from '../api'
import qs from 'qs'

export default function http({url, method, data}){
    let options = {
        url: url,
        method: method,
        baseURL: API.SAT_HOST,
        timeout: 2000,
        withCredentials: false
    };

    if(method == 'GET'){
        options.params = data;
    }else if(method == "POST"){
        options.data = qs.stringify(data);
    }

    return axios(options);

}