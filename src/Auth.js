import React from 'react'
import {connect} from 'react-redux'
import {login} from './Auth.redux'
import {Redirect} from 'react-router-dom'


class Auth extends React.Component{
    constructor(props){
        super(props)
    }
    render(){
        return (
            <div>
                {this.props.isAuth ? <Redirect to='/dashboard'></Redirect> : null}
                <h2>你没有权限，需要登录才能看</h2>
                <button onClick={this.props.login}>登录</button>
            </div>
        )
    }
}
//两个reducer 每个reducerd都有state
const mapStateToProps=(state)=>state.auth

//connect(mapStateToProps, mapDispatchToProps, mergeProps, options = {}) 
// const actionsCreators={}

Auth= connect(mapStateToProps,{login})(Auth)
export default Auth;