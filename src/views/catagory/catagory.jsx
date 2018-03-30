//分类页面
import React,{Component} from "react"
import "./catagory.less"
import $http from "../../utils/http"
class Catagory extends Component{
    constructor(){
        super()
        this.state={
            activeIndex:0
        }
    }
    render(){
        let catList=["家乡味道","进口食品","牛奶乳品","休闲零食","生鲜果蔬","米面粮油","调味调料","酒水饮料"]
        return (
            <div id="catagory">
                <header><input type="text" placeholder="搜索"/></header>
                <div className="catagory-wrap ks-clear">
                    <div className="left-side">
                        <ul >
                            {
                                catList.map((item,index)=>{
                                    return <li className={this.state.activeIndex==index?"catagory-active":""} key={index} onClick={()=>{this.toggleActive(index)}}>{item}</li>
                                })
                            }
                        </ul>
                    </div>
                    <div className="right-side"></div>
                </div>
               
            </div>
        )
    }
    toggleActive(idx){
        // console.log(idx)
        // $http.get("/mobile/Category/categorySon",{sonid:idx+1}).then((res)=>{
        //     console.log(res)
        // })
        //jsonp跨域请求淘宝分类
        // let url="https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521281673483&sign=3851af4a621f679fdb96a691142e69fb&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp1&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22tab%5C%22%3A%5C%22on%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D"//获取淘宝分类的地址并提取里面的callback的name中"mtopjsonp1"分类的名称字段进行jsonp请求数据
        // let url_men="https://acs.m.taobao.com/h5/mtop.relationrecommend.wirelessrecommend.recommend/2.0/?appKey=12574478&t=1521341468759&sign=283d2557018d5eb9d39e51510103f504&api=mtop.relationrecommend.WirelessRecommend.recommend&v=2.0&type=jsonp&dataType=jsonp&callback=mtopjsonp2&data=%7B%22appId%22%3A%223113%22%2C%22vm%22%3A%22nw%22%2C%22params%22%3A%22%7B%5C%22industry%5C%22%3A%5C%223%5C%22%2C%5C%22catmap_version%5C%22%3A%5C%222.0%5C%22%7D%22%2C%22nxtype%22%3A%22h5%22%7D"
        // $http.jsonp(url,"mtopjsonp1").then(res=>{console.log(res)})
        // $http.jsonp(url_men,"mtopjsonp2").then(res=>{console.log(res)})
        //jsonp定位
        //$http.jsonp("http://apis.map.qq.com/ws/geocoder/v1/?location=41,118&key=腾讯的密钥&callback=findLocation","findLocation").then(res=>{console.log(res)})//jsonp请求别数据
        this.setState({
            activeIndex:idx
        })
    }
}
export default Catagory