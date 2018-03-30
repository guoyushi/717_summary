import React,{Component} from "react"
class Result extends Component{
    render(){
        return (
            <h1>Result页面</h1>
        )
    }
    componentDidMount(){
        let {location}=this.props
        console.log(location.state)
    }
}
export default Result