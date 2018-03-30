//退出登录
import React,{Component} from "react"
import {loginout} from "../../utils/utils"
class Setting extends Component{
    constructor(){
        super()
        this.loginout=this.loginout.bind(this)
    }
    render(){
        return (
            <div id="setting">
                <header>设置</header>
                <button onClick={this.loginout}>退出登录</button>
            </div>     
        )
    }
    loginout(){
        loginout()
        this.props.history.push("/index/home")
    }
}
export default Setting