import {combineReducers} from "redux"
//添加购物车
export const ADD_CART="ADD_CART"
//删除商品
export const DELETE_CART="DELETE_CART"
//改变商品的数量
export const UPDATE_GOODS_COUNT="UPDATE_GOODS_COUNT"
//改变商品选中与否
export const UPDATE_GOODS_SELECT="UPDATE_GOODS_SELECT";
//更新整个商品列表
export const UPDATE_GOODS_LIST=" UPDATE_GOODS_LIST"
let initState={
    cart_list:[]
}
function cart_list(state=initState.cart_list,action){
    switch(action.type){
        case ADD_CART:
        let flag=false;
            state.forEach((item,index)=>{
                if(item.goods_id==action.data.goods_id){
                    ++item.count;
                    flag=true

                }
            })
        return flag?[...state]:[...state,action.data];//如果购物车里面有那就去重没有就返回数据
        break;
        case UPDATE_GOODS_COUNT:
        let arr=[...state];
        arr.forEach(item=>{
            if(item.goods_id==action.id){
                item.count=action.data
            }
        });
        return arr
        break;
        case UPDATE_GOODS_SELECT:
        let arr2=[...state];
        arr2.forEach(item=>{
            if(item.goods_id==action.id){
                item.select=action.data//dispatch传过来的data
            }
        });
        return arr2;
        case  UPDATE_GOODS_LIST:
        return action.data;
        default:return state
        
    }
    return state
}

export default combineReducers({
    cart_list
})