import React,{Component} from "react"
import {connect} from "react-redux"
import mapDispatchToProps from "./dispatch"
//封装购物车功能组件
class CartItem extends Component{
    constructor(){
        super()
    }
    render(){
        let {toggleSelect,updateCount,item}=this.props
        return(
            <li key={index}>
                <span onClick={()=>{toggleSelect((1-item.select),item.goods_id)}} className={"select-btn iconfont "+(item.select==0?"":"icon-select")}></span>
                <span className="goods-img"><img src={"http://www.lb717.com/"+item.obj_data} alt=""/></span>
                <div className="right-area">
                    <p>{item.goods_name}</p>
                    <div className="flex"> 
                        <div className="price-box">
                            <p>X{item.count}</p>
                            <p>￥{item.discount_price}</p>
                        </div>
                        <div className="count-box">
                            <span onClick={()=>{updateCount(--item.count,item.goods_id)}}>-</span>
                            <span>{item.count}</span>
                            <span onClick={()=>{updateCount(++item.count,item.goods_id)}}>+</span>
                        </div>
                    </div>
                </div>
            </li>
        )
    }
    
}
export default connect(null,mapDispatchToProps,null,{pure:false})(CartItem)//对勾选中更新视图
//pure:false深层对比为true是浅对比