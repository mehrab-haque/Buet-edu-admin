import axios from "axios"
import React,{Component} from "react"
import {keys} from "../keys"
import {fetchTopics} from "../actions/topicAction"
import Topic from "./Edit/Topic"

import {connect} from "react-redux"

class AllTopics extends Component{
state={

  name:"",
  subject:"",
  description:"",
  logo:"",
  islive:"",
  nseries:"",
  lang:"",
  serial:"",
  nproblem:"",
  currentTopic:null

  


}
componentDidMount=()=>{

this.props.topics();

}

setCurrentTopicToNull=()=>{
  this.setState({currentTopic:null})
}

change=(e)=>{
  this.setState({
    [e.target.name]:e.target.value
  })
}
submit=async()=>{

console.log(this.state);
let temp={};
temp["topic"]=this.state;
console.log(temp)
axios({
  method: 'post',
  url: 'https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/admin/addTopic',
  data: temp,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
  console.log(res.data)
}).catch(e=>console.log(e))


}

render(){
{

  
console.log(this.props.alltopics)
}
    return (
<div>








<button type="button" className="btn btn-outline-success btn-lg" data-toggle="modal" data-target="#exampleModalLong">
 Add Topic
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
    <label for="topic_title">Topic Title</label>
    <input onChange={this.change} type="text" class="form-control" name="name" />
  </div>
  <div class="form-group">
    <label for="topic_des">Description</label>
    <textarea onChange={this.change}  type="text" class="form-control" name="description"></textarea>
  </div>
  <div class="form-group">
    <label for="topic_sub">Subject</label>
    <input onChange={this.change}  type="text" class="form-control" name="subject"/>
  </div>
  <div class="form-group">
    <label for="topic_logo">Logo</label>
    <input onChange={this.change}  type="text" class="form-control" name="logo"/>
  </div>
  <div class="form-group">
    <label for="topic_live">isLive</label>
    <input onChange={this.change}  type="text" class="form-control" name="islive"/>
  </div>
  <div class="form-group">
    <label for="topic_nSeries">Number of Series</label>
    <input onChange={this.change}  type="text" class="form-control" name="nseries"/>
  </div>
  <div class="form-group">
    <label for="topic_nSeries">Number of Problems</label>
    <input onChange={this.change}  type="text" class="form-control" name="nproblem"/>
  </div>
  <div class="form-group">
    <label for="topic_lang">Language</label>
    <input onChange={this.change}  type="text" class="form-control" name="lang"/>
  </div>
  <div class="form-group">
    <label for="topic_serial">Serial</label>
    <input onChange={this.change}  type="text" class="form-control" name="serial"/>
  </div>
 

</form>
      </div>
      <div className="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.submit}>Submit</button>
      </div>
    </div>
  </div>
</div>
{  this.props.alltopics&&this.props.alltopics.map(topic=>{
return (
<div  key={topic.topic_id} class="card mt-5" style={{width: '20rem',margin:"auto"}}>
  <img src={topic.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
    <h2 className="card-title">{topic.name}</h2>
    <p class="card-text">{topic.description}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+topic.topic_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
  <button onClick={()=>this.setState({currentTopic:topic})} className="btn btn-info ml-3"  data-toggle="modal" data-target="#editTopic">
    Edit
 </button>
 {this.state.currentTopic &&
  <Topic topic={this.state.currentTopic} setCurrentTopicToNull={this.setCurrentTopicToNull}/>

 }
</p>
<div class="collapse" id={'collapse'+topic.topic_id}>
  <div class="card card-body">
<h5>No of Problems : {topic.nproblem}</h5>
<h5>No of Serieses : {topic.nseries}</h5>

  <h5>Serial: {topic.serial}</h5>


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
     topics:async()=>await fetchTopics(dispatch)
  }
  }
  const mapStateToProps=(state)=>{
  return{

  alltopics:state.topicReducer}
  }
  
export default connect(mapStateToProps,mapDispatchToProps)(AllTopics);