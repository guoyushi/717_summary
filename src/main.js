import "./static/css/reset.css"//全局样式
import "./static/font/iconfont.css"//icon样式
import "./static/css/common.css"
import "./static/css/goodsItem.less"
import React,{Component} from "react"
import ReactDOM from "react-dom"
import router from "./router/router.config"//封装路由
import {BrowserRouter,Route,Switch,Redirect} from "react-router-dom"//结构路由api
import RouteWrapper from "./components/routeWrapper"//封装好的路由组件
import NoMatch from "./views/route404/nomatch"

import {Provider} from "react-redux"
import store from "./store/store"//挂载购物车数据

ReactDOM.render(
    <Provider store={store}>
            <BrowserRouter>
                <Switch>
                    <Redirect exact from="/" to="/index/home"></Redirect>
                    <RouteWrapper routes={router.routes}></RouteWrapper>
                </Switch>
            </BrowserRouter> 
    </Provider>,document.getElementById("wrap")
   
        )