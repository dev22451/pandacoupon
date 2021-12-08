import axios from 'axios';
import CONFIG from './config';

export default function fireAjax({method, URL, data, header,token}) {
  URL = CONFIG.BASEURL + URL;
  if (method === 'POST') {
    let headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    if(token){
      headers = {headers:{
        ...headers.headers,
        Authorization:`bearer ${token}`
      }}
    }
    if (header) {
      headers = header;
    }
    return axios.post(URL, data, headers).then(
      res => {
        return res;
      },
      error => {
        return axios.post(URL, data, headers);
      },
    );
  } else if (method === 'GET') {
    let headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    if(token){
      headers = {headers:{
        ...headers.headers,
        Authorization:`bearer ${token}`
      }}
    }
    // console.log(token)
    // console.log(headers)
    if (header) {
      headers = header;
    }
    return axios.get(URL, headers).then(
      res => {
        return res;
      },
      error => {
        return axios.get(URL, headers);
      },
    );
  } else if (method === 'DELETE') {
    let headers = {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
    };
    if(token){
      headers = {headers:{
        ...headers.headers,
        Authorization:`bearer ${token}`
      }}
    }
    if (header) {
      headers = header;
    }
    return axios.delete(URL, headers).then(
      res => {
        return res;
      },
      error => {
        return axios.delete(URL, headers);
      },
    );
  }
}
