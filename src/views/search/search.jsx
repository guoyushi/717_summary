//搜索页
import React,{Component} from "react"
import "./search.less"
class Search extends Component{
    constructor(){
        super()
        this.toSearch=this.toSearch.bind(this)
        this.clearHistory=this.clearHistory.bind(this)
        this.state={
            historylist:[]
        }
    }
    render(){
        let {historylist}=this.state
        return (
            <div id="search">
                <header><input type="text" ref="keyWords"/><button onClick={this.toSearch}>搜索</button></header>
                <section className="recent-search">
                    <p>最近搜索<span onClick={this.clearHistory} className="iconfont icon-home"></span></p>
                    {
                        historylist.length==0?<p>暂无搜索记录...</p>:
                        <ul className="ks-clear"> 
                            {
                                this.state.historylist.map((item,index)=>{
                                    return <li onClick={()=>{this.toResult(item)}} key={index}>{item}</li>
                                })
                            }
                        </ul>
                    }
                </section>
                <section className="common-search">
                    <ol className="ks-clear">
                        <li>巧克力</li>
                    </ol>
                </section>
            </div>
        )
    }
    clearHistory(){//清空history
        localStorage.removeItem("searchHistory")
        this.setState({
            historylist:[]//数组清空
        })
    }
    toSearch(){
        if(!this.refs.keyWords.value) return;//关键词不存在直接返回
        let keyWords=this.refs.keyWords.value;
        let ls=localStorage;
        if(ls.getItem("searchHistory")){
            let shArr=JSON.parse(ls.getItem("searchHistory"));
            if(shArr.indexOf(keyWords)>-1)return;//如果localStorage中存在关键词则直接返回
            shArr.push(keyWords)//不存在把关键词push到localStorage中
            ls.setItem("searchHistory",JSON.stringify(shArr))
        }else{ 
            ls.setItem("searchHistory",JSON.stringify([keyWords]))//keyWords关键词//localStorage存储数据第一个函数名或属性名第二个是值必须是字符串
        }
        
        this.props.history.push("./index/result",{
            key_words:keyWords//搜索关键词
        })
    }
    toResult(keyWords){
        this.props.history.push("./index/result",{
            key_words:keyWords//搜索关键词
        })
    }
    componentDidMount(){
        if(localStorage.getItem("searchHistory")){
            this.setState({
                historylist:JSON.parse(localStorage.getItem("searchHistory"))
            })
        }
    }
}
export default Search