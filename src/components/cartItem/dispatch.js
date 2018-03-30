import {UPDATE_GOODS_SELECT,UPDATE_GOODS_COUNT} from "./../../store/reducers"
export default function mapDispatchToProps(dispatch){
    return {
        updateCount(count,id){
            dispatch({
                type:UPDATE_GOODS_COUNT,
                data:count,//数量
                id//具体商品的id
            })
        },
        toggleSelect(select,id){
            dispatch({
                type:UPDATE_GOODS_SELECT,
                data:select,
                id
            })
        }
    }
}  