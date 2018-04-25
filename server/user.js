const express = require('express')
const utils = require('utility')
const Router = express.Router()
const model = require('./model')
const User = model.getModel('user')

//过滤pwd, _v
const _filter = {'pwd':0,'__v':0}
Router.get('/list', function (req, res) {
    //User.remove({},function(err,doc){})
    User.find({},function(err,doc){
        return res.json(doc)
    })
})
//登录功能
Router.post('/login',function(req,res){
    const {user,pwd} =req.body
    User.findOne({user,pwd:md5Pwd(pwd)},_filter,function(err,doc){
        if(!doc){
            return res.json({code:1,msg:'用户名或者密码错误'})
        }
        //存储cookie
        res.cookie('userid',doc._id)
        return res.json({code:0,data:doc})
    })
})
//注册功能
Router.post('/register',function(req,res){
    console.log('req.body',req.body)
    const {user,pwd,type} =req.body
    User.findOne({user:user},function(err,doc){
        if(doc){//查找用户名是否重复
            return res.json({code:1,msg:'用户名重复'})
        }

        //用户注册之后才生成id,所以就下面create已经满足不了了
        const userModel =new User({user,type,pwd:md5Pwd(pwd)})
        userModel.save(function(err,doc){
            if(err){
                return res.json({code:1,msg:'后端出错了'})
            }
            const {user,type,_id} =doc
            res.cookie('userid',_id)
            return res.json({code:0,data:{user,type,_id}})
        })
       /*  //新建用户
        User.create({user,type,pwd:md5Pwd(pwd)},function(err,doc){
            if(err){//后端出错
                return res.json({code:1,msg:'后端出错了'})
            }
            return res.json({code:0})
        }) */
    })
})
Router.get('/info', function (req, res) {
    //用户有没有cookie
    const userid = req.cookies.userid
    console.log('userid',userid)
    if(!userid){
        return res.json({ code: 1 })
    }
    User.findOne({_id:userid},_filter,function(err,doc){
        if(err){
            return res.json({ code: 1 ,msg:'后端出错了'})
        }
        if(doc){
            return res.json({code:0,data:doc})
        }
    })
})
function md5Pwd(pwd){
    const salt='wjing_d=good_3658596891!@#$%^&*'
    return utils.md5(utils.md5(pwd+salt))
}
module.exports = Router