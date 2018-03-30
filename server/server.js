//模拟静态服务器
//引用express
const express = require("express")
//post请求传参需要中间件
const bodyParser =require("body-parser")
//请求接口文件
const api=require("./api")
//创建express服务器
const app=express()
app.use(bodyParser.json())
//设置跨域 cors
app.all("*",function(req,res,next){
    res.header("Access-Control-Allow-Origin","http://localhost:3000")//跨域
    res.header("Access-Control-Allow-Headers","content-type,Token")//允许请求头跨域中有content-type字段
    res.header("Content-Type","application/json;charset=utf-8")//Content-Type相应服务器传给浏览器的形式json
    next()
})
//启动后端接口
api(app)

app.listen(9000,function(){
    console.log("server listen 9000")
})