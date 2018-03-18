const LOGIN='LOGIN'
const LOGOUT='LOGOUT'
//简历reduce
export function auth(state={isAuth:false,user:'李云龙'},action){
    console.log(state)//合并后的：{isAuth:false,user:'李云龙'
    switch (action.type) {
        case LOGIN:
            return {...state,isAuth:true}
        case LOGOUT:
            return {...state,isAuth:false}
        default:
            return state;
    }
}
//action creator
export function login(){
    return {type:LOGIN}
}
export function logout(){
    return {type:LOGOUT}
}