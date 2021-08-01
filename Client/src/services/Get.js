import axios from 'axios';
import { RootPath,OnlinePath } from './config';

const Get = (path,root,headerOk,header,data) =>{
    const promise = new Promise((resolve,reject)=>{
        axios.get(`${root ? OnlinePath : RootPath}/${path}`, {headers : headerOk ? header : '', params : data})
        .then((response) => {
            resolve(response.data)
        }, (err)=>{
            reject(err)
        })
    })
    return promise;
}

export default Get;