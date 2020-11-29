import React,{Component} from "react"
import {useSelector} from "react-redux"
import {keys} from "../keys"
import axios from "axios"
import {fetchSerieses} from "../actions/seriesAction"
import {connect} from "react-redux"
import Series from "./Edit/Series"
class AllSerieses extends Component{
state={

name:"",
description:"",
serial:"",
islive:"",
nproblem:"",
logo:"",
topic_id:"",
currentSeries:null,
state:0

}
componentDidMount=()=>{
  this.props.serieses();
}
change=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}
setCurrentSeriesToNull=()=>{
  this.setState({currentSeries:null})
}
demo=(series)=>{

 return (
<div>
  <Series series={series}/>
</div>


 )
}
submit=()=>{
  let temp={}
  temp["series"]=this.state;
 
console.log(temp)
axios({
  method: 'post',
  url: 'https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/admin/addSeries',
  data: temp,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
  console.log(res.data)
  alert("Topic successfully edited")
}).catch(e=>console.log(e))



}
render(){

    return (
<div>

<button type="button" className="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#exampleModalLong">
 Add Series
</button>


<div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div class="form-group">
    <label for="series_title">Series Title</label>
    <input onChange={this.change} type="text" class="form-control" id="series_title" name="name"/>
  </div>
  <div class="form-group">
    <label for="series_des">Description</label>
    <textarea onChange={this.change}  type="text" class="form-control" id="series_des" name="description"/>
  </div>
  <div class="form-group">
    <label for="topic_id">Topic Id</label>
    <input onChange={this.change}  type="text" class="form-control" id="topic_id" name="topic_id"/>
  </div>
  <div class="form-group">
    <label for="series_logo">Logo</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_logo" name="logo"/>
  </div>
  <div class="form-group">
    <label for="series_live">isLive</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_live" name="islive"/>
  </div>
  <div class="form-group">
    <label for="series_nProblems">Number of Problem</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_nProblems" name="nproblem"/>
  </div>
  <div class="form-group">
    <label for="series_des">Serial</label>
    <input onChange={this.change}  type="text" class="form-control" id="series_des" name="serial"/>
  </div>
  

</form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={this.submit} type="button" class="btn btn-primary">Submit</button>
      </div>
    </div>
  </div>
</div>
{  this.props.allserieses&&this.props.allserieses.map((series,i)=>{

return (
<div  key={series.series_id} class="card mt-5" style={{width: '20rem',margin:"auto"}}>
  <img src={series.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
    <h2 className="card-title">{series.name}</h2>
    <p class="card-text">{series.description}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+series.series_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
  <button onClick={async()=>{await this.setState({currentSeries:series})}} type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editSeries">
 Edit
</button> 
{ this.state.currentSeries &&
<Series series={this.state.currentSeries} setCurrentSeriesToNull={this.setCurrentSeriesToNull}/>
}


 
</p>
<div class="collapse" id={'collapse'+series.series_id}>
  <div class="card card-body">
<h5>No of Problems : {series.nproblem}</h5>


  <h5>Serial: {series.serial}</h5>


  </div>
</div>
  </div>
</div>

)

})}
</div>


    )
}


}
const mapDispatchToProps=(dispatch)=>{
  return {
     serieses:async()=>await fetchSerieses(dispatch)
  }
  }
  const mapStateToProps=(state)=>{
  return{

  allserieses:state.seriesReducer}
  }


export default connect(mapStateToProps,mapDispatchToProps)(AllSerieses);