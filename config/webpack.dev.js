//开发模式
const webpack=require("webpack")
let baseConfig=require("./webpack.base")
let DefinePlugin=webpack.DefinePlugin;//开发模式
baseConfig.plugins.push(new DefinePlugin({
    "process.env":'"development"'
}))
module.exports={
    ...baseConfig,
    devServer:{
        historyApiFallback:true,//H5页面刷新防止报404
        inline:true,
        open:true,
        port:3000,
        noInfo:true//取消小黑板的信息
    },
    devtool:"eval-source-map "
}