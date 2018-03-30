import $http from "../../utils/http"
import {getCookie} from "../../utils/utils"
import { UPDATE_GOODS_LIST} from "../../store/reducers"
export default function maPDispathToProps(dispatch){
    return {
        fetchGoodsList(history){ 
            $http.post("/user/Cart/goodsList",{
                token:getCookie("token")
            })
            .then(res=>{
                if(res.error==1){
                    console.log(history)
                    history.push("./login",{
                        from:"/index/cart"
                    })
                }else{
                    dispatch({
                        type:UPDATE_GOODS_LIST,
                        data:res
                    })
                }
            })
        }
    }
}