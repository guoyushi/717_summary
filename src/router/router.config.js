import React,{Component} from "react"
import Home from "../views/home"
import Catagory from "../views/catagory"
import Cart from "../views/cart"
import Mine from "../views/mine"
import Detail from "../views/detail"
import Register from "../views/register"
import Login from "../views/login"
import Index from "../views/index"
import Search from "../views/search"
import SearchResult from "../views/result"
import Setting from "../views/setting"
let router={
    routes:[
        {
            path:"/index",
            component:Index,
            children:[
                {
                    path:"/index/home",
                    component:Home
                },
                {
                    path:"/index/catagory",
                    component:Catagory
                },
                {
                    path:"/index/cart",
                    component:Cart,
                    authorization:true
                },
                {
                    path:"/index/mine",
                    component:Mine,
                    authorization:true//设置权限
                },
                {
                    path:"/index/search",
                    component:Search
                },
                {
                    path:"/index/result",
                    component:SearchResult
                }
            ]
        },
        {
            path:"/detail",
            component:Detail
        },
        {
            path:"/register",
            component:Register
        },
        {
            path:"/login",
            component:Login
        },
        {
            path:"/setting",
            component:Setting
        }
    ]
}
export default router