import React,{Component} from "react"
import $http from "../../utils/http"
import "./index.less"
import RouterWrapper from "../../components/routeWrapper"
import {Route,NavLink,Redirect} from "react-router-dom"
import Toast from "react-toast-mobile"
import "react-toast-mobile/lib/react-toast-mobile.css"
class Index extends Component{
    render(){
        let {routes}=this.props
        return (
            <div id="index">
            <Toast/>
            <div className="content">
                <RouterWrapper routes={routes}></RouterWrapper>
            </div>
                <ul className="nav">
                    <li>
                        <NavLink to="/index/home" activeClassName="tab-active">
                            <span className="iconfont icon-home"></span>
                            <span>首页</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/index/catagory" activeClassName="tab-active">
                            <span className="iconfont icon-catagory"></span>
                            <span>分类</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/index/cart" activeClassName="tab-active">
                            <span className="iconfont icon-cart"></span>
                            <span>购物车</span>
                        </NavLink>
                    </li>
                    <li>
                        <NavLink to="/index/mine" activeClassName="tab-active">
                            <span className="iconfont icon-mine"></span>
                            <span>我的</span>
                        </NavLink>
                    </li>
                </ul>
            </div>
        )
    }
    componentDidMount(){
        $http.get("/server/test.json",{})//请求接口地址
        .then(data=>{console.log(data)})//成功
        .catch(err=>{console.log(err)})//失败
    }
}
export default Index