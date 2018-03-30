//添加购物车操作
import React,{Component} from "react"
import $http from "../../utils/http"//请求数据
import Lazyload from "react-lazyload"
import {getCookie} from "../../utils/utils"
import {ToastContainer,toast} from "react-toastify"
import {connect} from "react-redux"
import {ADD_CART} from "./../../store/reducers"
import {T} from "react-toast-mobile"
class Placeholder extends Component{
    render(){
        return <img src={require('../../static/img/a.png')}/>
    }
}
class GoodsItem extends Component{
    constructor(){
        super()
        this.addCart=this.addCart.bind(this)
    }
    render(){
        let {data}=this.props
        return (
            <dl className="goods-item" onClick={()=>{this.toDetail(data.goods_id)}}>
                <dt><Lazyload height={'100%'} overflow once placeholder={<Placeholder></Placeholder>} debounce={200}><img src={"http://www.lb717.com/"+data.obj_data} alt=""/></Lazyload></dt>
                <dd>
                    <p className="good_detail">{data.goods_name}</p>
                    <p>
                        <span className="goods_price">{data.discount_price}</span>
                        <span onClick={this.addCart} className="iconfont icon-cart"></span>
                    </p>
                    <ToastContainer></ToastContainer>
                </dd>
            </dl>
        )
    }
    addCart(e){
        e.stopPropagation()//阻止购物车点击跳入详情页也是冒泡
        let {data}=this.props
        //console.log(getCookie('token'))//判断token是否存在
        if(getCookie('token')){//判断点击购物车时时候有token如果没有跳转到登录页面
            $http.post("/user/Cart/addCart",{
                goods_id:data.goods_id,//把ID传给后端知道用户是谁
                goods_info:data,//并且把数据传给后端
                token:getCookie('token')
            })
            .then((res)=>{
                console.log(res)
                if(res==1){
                    T.notify("购物车添加成功")
                    //state管理数据添加购物车
                    this.props.dispatch({
                        type:ADD_CART,
                        data:{
                            ...data,
                            count:1,
                            select:0//默认不选中
                        }//当前的data
                    })
                }else{
                    toast.warn(res.info,{
                        position: toast.POSITION.TOP_CENTER,
                        hideProgressBar:true,
                        autoClose:200*1000,
                        className:"test"
                    })
                }
                
            })
        }else{
            let {history,location}=this.props
            history.push("/login",{
                from:location.pathname//登陆完后跳转的路径
            })
        }
        
    }
    toDetail(goods_id){
        console.log(goods_id)
        this.props.history.push("/detail?goods_id="+goods_id,{
            goods_id:goods_id
        })
    }
}
export default connect(null)(GoodsItem)