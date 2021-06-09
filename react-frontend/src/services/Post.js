import axios from 'axios';
import { RootPath,OnlinePath } from './config';

const Post = (path,root,headerOk,header,data) =>{
    console.log("data",data,"headerok",headerOk,"root",path)
    const promise = new Promise((resolve,reject)=>{
        axios.post(`${root ? OnlinePath : RootPath}/${path}`, data ,{headers : headerOk ? header : ''})
        .then((response) => {
            resolve(response.data);
        },(err)=>{
            reject(err);
        })
    })
    return promise;
}

export default Post;
