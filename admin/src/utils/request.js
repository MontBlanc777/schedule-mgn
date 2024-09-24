import axios from 'axios';
import { setLoadingStatus } from '../store/globalSlice';
import { store } from '../store/store';

export const AxiosRequest = (url, method, token, param, data) => {
    store.dispatch(setLoadingStatus(true));
    url = `http://127.0.0.1:3000/api/admin${url}`;
    return axios({
        url: url,
        method: method,
        headers: {
            'Content-Type': 'application/json',
            'Authorization':  token
        },
        params: param,
        data: data,
        timeout: 5000,
        responseType: 'json'
    })
    .then((res) => res.data)
    .catch((err)=> {
        console.log(err);
        // throw err
    })
    .finally(()=> {
        store.dispatch(setLoadingStatus(false));
    });
}

