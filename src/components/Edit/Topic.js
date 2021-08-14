import React,{Component} from "react"
import axios from "axios"
import {keys} from "../../keys"
class Topic extends Component{

    state={

name:this.props.topic.name,
logo:this.props.topic.logo,
description:this.props.topic.description,
serial:this.props.topic.serial,
topic_id:this.props.topic.topic_id,
color:this.props.topic.color?this.props.topic.color:""

    }
    topicChange=(e)=>{

        this.setState({
            [e.target.name]:e.target.value
        })
    }

post=()=>{
  let temp={};
  temp["data"]=this.state;
  console.log(temp);

  axios({
    method: 'post',
    url: 'https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/admin/editTopic',
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
<div className="modal fade" id="editTopic" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
       
      </div>
      <div className="modal-body">
      <form>
  <div class="form-group">
    <label for="topic_title">Topic Title</label>
    <input onChange={this.topicChange} value ={this.state.name} type="text" class="form-control" name="name" />
  </div>
  <div class="form-group">
    <label for="topic_des">Description</label>
    <textarea onChange={this.topicChange}  value={this.state.description} type="text" class="form-control" name="description"></textarea>
  </div>
  
  <div class="form-group">
    <label for="topic_logo">Logo</label>
    <input onChange={this.topicChange} value={this.state.logo} type="text" class="form-control" name="logo"/>
  </div>

  <div class="form-group">
    <label for="topic_serial">Serial</label>
    <input onChange={this.topicChange}  value={this.state.serial} type="text" class="form-control" name="serial"/>
  </div>
   <div class="form-group">
    <label for="color">Color code</label>
    <input onChange={this.topicChange}  value={this.state.color} type="text" class="form-control" name="color"/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button onClick={()=>this.props.setCurrentTopicToNull()} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.post}>Submit</button>
      </div>
    </div>
  </div>
</div>


        )
    }
}

export default Topic;