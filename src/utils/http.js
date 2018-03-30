//同源策略:1.协议相同 http/https 2.域名相同3.端口号相同
//基于fetch封装的请求方法，支持get和post
//@argument get
//@argument post
//本地服务器域名 开发模式
let domin
if(process.env=="development"){
    domin="http://localhost:9000"
}
//上线地址
if(process.env=="production"){
    domin="http://www.lb717.com"
}
//请求数据
let $http={//http基于fetch
    get(url,data){
        if(Object.prototype.toString.call(data)!="[Object Object]"){//传参格式一定是{}
            return{
                then(callback){
                    callback("get请求入参格式不正确，需要传object")//提示错误信息不会报错
                    return {
                        catch(err){
                            err(new Error("入参格式不正确"))
                        }
                    }
                }
            }
        }
        let queryString="?"
        for(let i in data){
            queryString+=(i+"="+data[i]+"&")
        }
        url=encodeURL(url+queryString.slice(0,-1))
        return fetch(domin+url,{
            headers:{
                "content-type":"application/json;charset=utf-8"
            }
        }).then(res=>res.json())
    },
    post(url,data){
        if(Object.prototype.toString.call(data)!="[object Object]"){//传参格式一定是{}
        return{
            then(callback){
                callback("get请求入参格式不正确，需要传object")//提示错误信息不会报错
                return {
                    catch(err){
                        err(new Error("入参格式不正确"))
                    }
                }
            }
        }
    }
    return fetch(domin+url,{
        body:JSON.stringify(data),//字符串前端传给后端的数据
        headers:{
            "content-type":"application/json;charset=utf-8",
            "Token":"12345"
        },
        method:"POST"
    }).then(res=>res.json())
    },
    jsonp(url,callbackName){
        return new Promise((resolve,reject)=>{
            window[callbackName]=function(data){//window[]才能拿到变量的值 这个函数是定义一个全局函数拿到淘宝的名字
                resolve(data)
            }
            let script=document.createElement("script")//自动创建script标签添加到body中
            let body=document.body;
            script.src=url
            body.appendChild(script)
        })
    }
}
export default $http