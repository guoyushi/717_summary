//购物车功能组件
import React,{Component,PureComponent} from "react"
import {connect} from "react-redux"//用挂载的数据
import mapStateToProps from "./state"
import mapDispatchToProps from "./dispatch"
import "./cart.less"
import CartItem from "../../components/cartItem/cartItem"
class Cart extends PureComponent{
    render(){
        let {cartList}=this.props
        return (
            <div id="cart">
                <header>购物车<span className="edit">编辑</span></header>
                <div className="goods_list">
                    <ul>
                        {
                           cartList.map((item,index)=>{
                               return <CartItem key={index} item={item}></CartItem>
                           })
                       }
                    </ul>
                </div>
                <footer>
                    <div>全选<span className="select-btn iconfont icon-select"></span></div>
                    <div>全选<span></span></div>
                </footer>
            </div>
        )
    }
    componentDidMount(){
        this.props.fetchGoodsList(this.props.history)
    }
    
}
export default connect(mapStateToProps,mapDispatchToProps)(Cart)