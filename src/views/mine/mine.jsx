//我的页面
import React,{Component} from "react"
class Mine extends Component{
    constructor(){
        super()
        this.Setting=this.Setting.bind(this)
    }
    render(){
        return (
            <div id="mine">
                <header>
                    <p><span className="iconfont icon-home" onClick={this.Setting}></span><span>我的717商城</span></p>
                    <dl>
                        <dt>
                            <img src={require("../../static/img/1.jpg")} alt=""/>
                        </dt>
                        <dd>
                            user name
                        </dd>
                    </dl>
                </header>
            </div>
        )
    }
    Setting(){
        this.props.history.push("/setting")
    }
}
export default Mine