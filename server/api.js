//第三方node包用于加密
const jwt=require("jsonwebtoken")
const fs = require("fs")
const http=require("http")
const querystring=require("querystring")
const Mock=require("mockjs")
//封装请求网站数据
function queryApi(url,methods,params){
    return new Promise((resolve,reject)=>{
        //请求远端商品列表数据
        const options = {
            hostname: 'www.lb717.com',//域名
            port: 80,
            path: url,
            method: methods,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
            }
        };
        //商品列表的接口
        let data = "";
        let request = http.request(options, (response) => {//获取远端数据
            response.setEncoding('utf8');
            response.on('data', (chunk) => {
                data += chunk
            });
            response.on('end', () => {//返回前端商品列表数据
                resolve(JSON.stringify(data))
            });
        })
        if (methods.toLowerCase() == "post") {
            request.write(querystring.stringify(params))//传的参数
        }
        request.end()
    })
    
}
module.exports=function(app){
    //请求远端商品列表数据
    // const options = {
    //     hostname: 'www.lb717.com',
    //     port: 80,
    //     path: '/mall/index/getGoodsChannel',//域名
    //     method: 'POST',
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    //     }
    // };

    //商品列表的接口
    app.post("/mall/index/getGoodsChannel", function (req, res) {
        // let data = "";
        // let request = http.request(options, (response) => {//获取远端数据
        //     response.setEncoding('utf8');
        //     response.on('data', (chunk) => {
        //         console.log(`响应主体: ${chunk}`);
        //         data += chunk
        //     });
        //     response.on('end', () => {//返回前端商品列表数据
        //         res.end(JSON.stringify(data))
        //     });
        // })
        // request.write(querystring.stringify(req.body))//传的参数
        // request.end()
        queryApi("/mall/index/getGoodsChannel","post",req.body)
        .then((data)=>{
            res.end(data)
        })
    })
    //register注册接口
    app.post("/user/register", function (req, res) {
        console.log(req.body)
        let user = fs.readFileSync("server/user.json", { encoding: "utf-8" })//读取数据库数据
        console.log(user)
        user = JSON.parse(user)
        user.push(req.body)
        fs.writeFile('server/user.json', JSON.stringify(user), function () {
            res.end(JSON.stringify({
                "success": 1,
                "info": "register success"
            }))
        })//获取数据写入数据库中
    })

    //login登录接口
    app.post("/user/login", function (req, res) {
        let user = fs.readFileSync("server/user.json", { encoding: "utf-8" })//读取数据库数据
        user = JSON.parse(user)//转成Json对象
        let login = req.body;
        let resInfo = {//默认信息
            success: 0,
            info: "用户名或密码错误",
            token: ''//返回密钥
        }
        user.forEach(usr => {
            if (usr.username == login.username && usr.password == login.password) {
                resInfo.success = 1;
                resInfo.info = "login success"//登录成功返回信息
            }
        });
        if (resInfo.success == 1) {
            resInfo.token = jwt.sign(login, "1511", {
                expiresIn: 60*60//设置tooken的超时
            })//进行加密设置token
        }
        res.end(JSON.stringify(resInfo))
    })

    //添加购物车接口
    app.post("/user/Cart/addCart", function (req, res) {
        //console.log(req.body)
        jwt.verify(req.body.token, "1511", (err, decoded) => {
            if (err) {
                res.end(JSON.stringify({
                    info: "登录过期,请重新登录",
                    detail: err.TokenExpiredError
                }))
            } else {//解析成功返回到cart_info.json中
                //console.log(decoded.username)//登录名
                let cartInfo = JSON.parse(fs.readFileSync(__dirname + "/cart_info.json", { encoding: "utf-8" }))
                if (cartInfo[decoded.username]) {
                    let recordList=cartInfo[decoded.username];
                    let flag=false//新加商品
                    recordList.forEach((item,index)=>{//购物车商品进行排重
                        if(item.goods_id==req.body.goods_info.goods_id){
                            ++item.count;
                            flag=true//重复商品
                        }
                    })
                    if(!flag){
                        let record=req.body.goods_info;
                        record.count=1;
                        record.select=0;
                        cartInfo[decoded.username].push(record)
                    }
                    
                } else {
                    let record=req.body.goods_info;
                    record.count=1;
                    record.select=0;
                    cartInfo[decoded.username] = [record]
                }
                //console.log(cartInfo)
                fs.writeFile(__dirname + "/cart_info.json", JSON.stringify(cartInfo), function () {
                    res.end("1")
                })

            }
        })//解密
    })
    //分类接口
    app.get("/mobile/Category/categorySon", function(req,res){//模拟Mock数据
        res.json(1)
    })
    //返回商品列表接口
    app.post("/user/Cart/goodsList",function(req,res){
        jwt.verify(req.body.token, "1511", (err, decoded) => {
            if (err) {
                res.end(JSON.stringify({
                    info: "登录过期,请重新登录",
                    detail: err.TokenExpiredError,
                    error:1
                }))
            }else{
                try{
                    let goodsRecord=JSON.parse(fs.readFileSync("./cart_info.json",{encoding:"utf-8"}))
                    res.json(goodsRecord[decoded.username])
                }
                catch(error){
                    res.json(error)
                }
            }
        })
    })
}