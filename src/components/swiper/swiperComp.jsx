import React,{Component} from "react"
import Swiper from "swiper"
import "swiper/dist/css/swiper.css"
let img1=require('../../static/img/1.jpg')//这样引用webpack可以打包
class SwiperComponent extends Component{
    render(){
        return <div className="swiper-container" ref="scDom">
            <div className="swiper-wrapper">
                <div className="swiper-slide"><img src={img1}/></div>
                <div className="swiper-slide"><img src={require('../../static/img/2.jpg')}/></div>
                <div className="swiper-slide"><img src={require('../../static/img/3.jpg')}/></div>
            </div>
        </div>
    }
    componentDidMount(){
        new Swiper(this.refs.scDom,{
            autoplay:true,
            loop:true
        })
    }
}
export default SwiperComponent