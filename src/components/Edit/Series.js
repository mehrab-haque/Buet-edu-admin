import React,{Component} from "react"
import axios from "axios"
import {keys} from "../../keys"
class Series extends Component{

    state={

name:this.props.series.name,
logo:this.props.series.logo,
description:this.props.series.description,
serial:this.props.series.serial,
//topic_id:this.props.series.topic_id,
series_id:this.props.series.series_id

    }
    seriesChange=(e)=>{

        this.setState({
            [e.target.name]:e.target.value
        })
    }
    post=()=>{
      let temp={};
      temp["data"]=this.state;
      axios({
        method: 'post',
        url: 'https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/admin/editSeries',
        data: temp,
        headers:{
          'authorization':keys.authorization,
        }
      }).then(res=>{
        console.log(res.data)
        alert("Series successfully edited")
      }).catch(e=>console.log(e))
    }
    render(){
        return (
<div className="modal fade" id="editSeries" tabindex="-1" role="dialog"  data-backdrop="static" data-keyboard="false" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit Series</h5>
       
      </div>
      <div className="modal-body">
      <form>
  <div class="form-group">
    <label for="title">Series Title</label>
    <input onChange={this.seriesChange} value ={this.state.name} type="text" class="form-control" name="name" />
  </div>
  <div class="form-group">
    <label for="des">Description</label>
    <textarea onChange={this.seriesChange}  value={this.state.description} type="text" class="form-control" name="description"></textarea>
  </div>
  
  <div class="form-group">
    <label for="logo">Logo</label>
    <input onChange={this.seriesChange} value={this.state.logo} type="text" class="form-control" name="logo"/>
  </div>

  <div class="form-group">
    <label for="serial">Serial</label>
    <input onChange={this.seriesChange}  value={this.state.serial} type="text" class="form-control" name="serial"/>
  </div>
 
  <div class="form-group">
    <label for="topic_id">Topic_id</label>
    <input onChange={this.seriesChange}  value={this.props.series.topic_id} type="text" class="form-control" name="topic_id"/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button onClick={async()=>await this.props.setCurrentSeriesToNull(null)} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.post}>Submit</button>
      </div>
    </div>
  </div>
</div>


        )
    }
}

export default Series;