//REGISTER_SUCCESS LOGIN_SUCCESS未优化AUTH_SUCCESS

import axios from 'axios'
import { getRedirectPath } from '../util'
 
const REGISTER_SUCCESS='REGISTER_SUCCESS'
const ERROR_MSG='ERROR_MSG'
const LOGIN_SUCCESS='LOGIN_SUCCESS'
const LOAD_DATA='LOAD_DATA'

const initState={
    redirectTo:'',
    isAuth:false,
    msg:'',
    user:'',
    type:''
}
//reducer
export function user(state=initState,action){
    switch (action.type) {
        case REGISTER_SUCCESS:
            return {...state, msg:'',redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}
        case LOGIN_SUCCESS:
            return {...state, msg:'',redirectTo:getRedirectPath(action.payload), isAuth:true, ...action.payload}
        case LOAD_DATA:
            return {...state,...action.payload}
        case ERROR_MSG:
            return {...state, isAuth:false, msg:action.msg}
        default:
            return state
    }
}
//action creator
function registerSuccess(data){
    return {type:REGISTER_SUCCESS,payload:data}
}
function loginSuccess(data){
    return {type:LOGIN_SUCCESS,payload:data}
}
function errorMsg(msg){
    //简写msg对象前面，约定规范 return { type:ERROR_MSG ,msg:msg}
    return { msg, type:ERROR_MSG }
}
export function loadData(userinfo){
    return {type:LOAD_DATA,payload:userinfo}
}

//bossinfo保存
export function update(data){
    return dispatch=>{
        axios.post('/user/update',data)
        .then(res=>{
            if(res.status === 200 && res.data.code ===0){//请求成功
                dispatch(loginSuccess(res.data.data))
            }else{//请求失败
                dispatch(errorMsg(res.data.msg))
            }
        })
    }

}
// 登录
export function login({user,pwd}){
    if(!user || !pwd){
        return errorMsg('用户名密码必须输入')
    }
    return dispatch => {//dispatch返回一个函数
        axios.post('/user/login',{user,pwd})
        .then(res => {
            if(res.status === 200 && res.data.code ===0){//请求成功
                dispatch(loginSuccess(res.data.data))
            }else{//请求失败
                dispatch(errorMsg(res.data.msg))
            }
        })
    }
}


//用户操作register
export function register({user,pwd,repeatpwd,type}){
    //用户输入验证
    if(!user || !pwd || !type){
        return errorMsg('用户名密码必须输入')
    }
    if(pwd !== repeatpwd){
        return errorMsg('密码和确认密码不同')
    }
    return dispatch => {//dispatch返回一个函数
    axios.post('/user/register',{user,pwd,type})
    .then(res => {
        if(res.status === 200 && res.data.code ===0){//请求成功
            dispatch(registerSuccess({user,pwd,type}))
        }else{//请求失败
            dispatch(errorMsg(res.data.msg))
        }
    })
    }
    

}