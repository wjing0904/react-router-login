import React from 'react'
import Logo from '../../component/logo/logo'
import { List, InputItem, WingBlank, WhiteSpace, Button } from 'antd-mobile'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../redux/user.redux'

@connect(
    state => state.user,
    { login }
)
class Login extends React.Component{
    constructor(props){
        super(props)
        this.state ={
            user:'',
            pwd:''
        }
        this.register = this.register.bind(this)
        this.handleLogin = this.handleLogin.bind(this)
    }
    //注册
    register(){
        this.props.history.push('/register')
    }
    //输入信息
    handleChange(key,val){//注意 setstate是keyb必须加'[]'，否则变为key字符串
        this.setState({
            [key]:val
        })
    }
    //登录
    handleLogin(){
        console.log(this.props)
        this.props.login(this.state)
    }
    render(){
        return (
            <div>
                {this.props.redirectTo ? <Redirect to={this.props.redirectTo} /> :null }
                <Logo></Logo>
                <WingBlank>
                    <List>
                        { this.props.msg ? <p className='error-msg'>{this.props.msg}</p> : null}
                        <InputItem
                            onChange={v => this.handleChange('user',v)}
                        >用户</InputItem>
                        <WhiteSpace />
                        <InputItem
                            onChange={v => this.handleChange('pwd',v)}
                        >密码</InputItem>
                    </List>
                    <WhiteSpace />
                    <Button type='primary'
                        onClick={this.handleLogin}
                    >登录</Button>
                    <WhiteSpace />
                    <Button type='primary' onClick={this.register}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;