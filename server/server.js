const express =require('express');

const mongoose=require('mongoose');
//链接mongodb,并且使用react集合
const DB_URL='mongodb://localhost:27017/react';
mongoose.connect(DB_URL);
mongoose.connection.on('connected',function(){
    console.log('mongo connect success');
})

//类似于mysql的表 mongodb里面有文档 字段的概念

const User=mongoose.model('user',new mongoose.Schema({
    username:{type:String,require:true},
    age:{type:Number,require:true}
}))
//新增数据：新建一个用户信息
// User.create({
//     username:'liangyu',
//     age:27
// },function(err,doc){
//     if(!err){
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })
//删除数据
//  User.remove({age:27},function(err,doc){
//     if(!err){
//         console.log('delete success')
//         console.log(doc)
//     }else{
//         console.log(err)
//     }
// })
//更新数据
User.update({'username':'wangjing'},{$set:{age:25}},function(err,doc){
    console.log(doc)
})

//新建app
const app=express();

app.get('/',function(req,res){
    res.send('<h1>hello express!</h1>')
})
app.get('/data',function(req,res){
    User.findOne({username:'liangyu'},function(err,doc){
        return res.json(doc)
    })
    //res.json({name:'wangjing(React)',type:'it'})
})

app.listen(9093,function(){
    console.log('node app start at port 9093')
})