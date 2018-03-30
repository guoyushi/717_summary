import React,{Component} from "react"
import {Route} from "react-router-dom"
import {Redirect} from "react-router-dom"
import {getCookie} from "../utils/utils"
function isLogin(){//权限设置是否登录
    return !!getCookie("token")//判断登录是否有token字段
}

class RouteWrapper extends Component{//封装路由
    render(){
        let {routes}=this.props
        return (
            routes.map((item,index)=>{
                return <Route exact={item.exact} key={index} path={item.path} render={(location)=>{
                    //console.log(item)
                    // if(item.authorization){
                    //     console.log(isLogin())
                    //     return <Redirect to="/login"></Redirect>//没有登录重定向登录页面
                    // }
                    return item.authorization&&!isLogin()?<Redirect to={{pathname:"/login",state:{from:item.path}}}></Redirect>:<item.component {...location} routes={item.children}></item.component>//嵌套路由直接传配置项  在我页面如果未登录那么就登录后还返回我的页面
                }}></Route>
            })
        )
    }
}
export default RouteWrapper
