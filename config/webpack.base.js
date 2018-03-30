//dev:开发模式 起服务 不用压缩
//build:不用起服务，要进行压缩，代码分离

const webpack=require("webpack")
let path=require("path");
let dir=process.cwd()//获取当前程序运行的目录
let UglifyPlugin=webpack.optimize.UglifyJsPlugin
let baseConfig={//commonjs规范
    entry:{//整个项目的入口文件
        "bundle":dir+'/src/main.js'
    },
    output:{
        "filename":"[name].js",
        "path":dir+"/dist",
        publicPath:"/"
    },
    module:{
        rules:[
            {
                test:/\.(jsx|js)$/,
                use:["babel-loader"]
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
            },
            {
                test: /\.(less)$/,
                use: ["style-loader", "css-loader","less-loader"],
            },
            {
                test:/\.(jpg|png|gif|eot|woff|svg|ttf)$/,
                use:['file-loader']
            }
        ]
    },
    plugins:[],
    resolve:{
        extensions:['.js','.jsx']
    }
} 
module.exports=baseConfig
// let config={}
// if(process.env.NODE_ENV=="development"){//开发模式
//     config={
//         ...baseConfig,
//         devServer:{
//             historyApiFallback:true,//H5页面刷新防止报404
//             inline:true,
//             open:true,
//             port:3000
//         },
//         devtool:"eval-source-map "
//     }
// }
// if(process.env.NODE_ENV=="production"){//生产模式
//     //往plugins中追加插件
//     baseConfig.plugins.push(new UglifyPlugin())
//     config={
//         ...baseConfig,
//     }
// }
// module.exports=config