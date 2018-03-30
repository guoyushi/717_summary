import React,{Component} from "react"
import $http from "../../utils/http"
import SwiperComponent from "../../components/swiper/swiperComp"
import "./home.less"
import GoodsItem from "../../components/goodsComp/goodsItem"
class Home extends Component{
    constructor(){
        super()
        this.state={
            goodslist:[],
            channel_id:3,
            caniquery:true
        }
        this.toSearch=this.toSearch.bind(this)
        this.scrolling=this.scrolling.bind(this)
    }
    toSearch(){
        let {history}=this.props;
        history.push("/index/search")
    }
    render(){
        return (
            <div id="home" onScroll={this.scrolling} ref="scroller">
                <div ref="doc">
                    <header><input type="text" placeholder="搜索" onFocus={this.toSearch}/></header>
                    <div>
                        <SwiperComponent></SwiperComponent>
                    </div>
                    <section className="home-cat ks-clear">
                        <dl>
                            <dt><img src={require('../../static/img/a.png')}/></dt>
                            <dd>家乡味道</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/b.png')}/></dt>
                            <dd>牛奶乳品</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/c.png')}/></dt>
                            <dd>休闲零食</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/d.png')}/></dt>
                            <dd>米面粮油</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/e.png')}/></dt>
                            <dd>调味调料</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/f.png')}/></dt>
                            <dd>生鲜果蔬</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/g.png')}/></dt>
                            <dd>进口食品</dd>
                        </dl>
                        <dl>
                            <dt><img src={require('../../static/img/h.png')}/></dt>
                            <dd>进口食品</dd>
                        </dl>
                    </section>
                    <div className="goods-list ks-clear">
                        {
                            this.state.goodslist.map((item,index)=>{
                                return <GoodsItem key={index} data={item} history={this.props.history} location={this.props.location}></GoodsItem>//商品列表
                            })
                        }
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount(){
        $http.post("/mall/index/getGoodsChannel",{channel_id:this.state.channel_id})//前端传给后端的数据
        .then(res=>{
            console.log(JSON.parse(res).data.data)
            this.setState({
                goodslist:JSON.parse(res).data.data
            })
            //console.log(JSON.parse(res))//后端返回的数据网站的真实数据
        })
        
    }
    scrolling(){//scrollTop+windowHeight=documentHeight
        if(this.state.channel_id>9) return;
        if(!this.state.caniquery) return;
        let {scroller,doc}=this.refs
        let st=scroller.scrollTop;//home高度
        let sw =scroller.offsetHeight//文档的高度
        let dh=doc.offsetHeight;

        if(dh-(st+sw)<50){
            this.setState({
                caniquery:false
            })
            console.log("满足条件,请求数据")
            this.setState({
                channel_id:++this.state.channel_id
            })
            let {goodslist} = this.state;
            $http.post("/mall/index/getGoodsChannel",{channel_id:this.state.channel_id})//前端传给后端的数据
            .then(res=>{
                this.setState({
                    goodslist:[...goodslist,...JSON.parse(res).data.data]
                })
                console.log(JSON.parse(res))//后端返回的数据网站的真实数据

                this.setState({
                    caniquery:true
                })
            })
        }
    }
}
export default Home