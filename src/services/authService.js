import http from './httpService'
import {apiUrl} from '../config.json'
import jwtDecode from 'jwt-decode'

const apiEndpoint = apiUrl + "/auth"

async function login(email,password){
    const {data:jwt} = await http.post(apiEndpoint,{
        email,
        password
    })
    localStorage.setItem("token",jwt)
}

function loginWithJwt(jwt){
    localStorage.setItem('token',jwt)
}

function logout(){
    localStorage.removeItem('token')
}

function getCurrentUser(){
    try{
        const jwt = localStorage.getItem('token')
        return jwtDecode(jwt)
    }
    catch(ex){
        return null
    }
}

function getJwt(){
    return localStorage.getItem('token')
}

export {
    login,
    loginWithJwt,
    logout,
    getCurrentUser,
    getJwt
}