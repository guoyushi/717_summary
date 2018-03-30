//获取cookie
export function getCookie(name){//封装获取cookie
    let cookieStr = document.cookie
    if(cookieStr.length==0)return;
    let arr;
    let res=null;
    if(cookieStr.indexOf(";")>-1){
        arr=cookieStr.split(";")
        arr.forEach((cookie,index)=>{
            let tmo_arr=cookie.split("=")
            if(tmo_arr[0]==name){
                res=tmo_arr[1]
            }
        })
    }else{
        let tmo_arr=cookieStr.split("=")
        if(tmo_arr[0]==name){
            res=tmo_arr[1]
        }
    }
    return res
}

//jsonp跨域封装
//动态创建script标签,添加到body中,src指定接口地址,callback name

//退出登录操作cookie
export function loginout(){
    let t=new Date()//获取当前时间
    t.setTime(t.getTime()-1)//设置当前时间的上一毫秒
    document.cookie="token="+getCookie("token")+";expires="+t.toUTCString()//cookie失效
}