import React,{Component} from "react"
import axios from "axios"
class Problem extends Component{

    state={

grade:this.props.problem.grade,
serial:this.props.problem.serial,
series_id:this.props.problem.series_id


    }
    problemChange=(e)=>{

        this.setState({
            [e.target.name]:e.target.value
        })
    }
  
    post=()=>{
        let temp={}
        temp=this.props.problem;
        temp["serial"]=this.state.serial;
        temp["grade"]=this.state.grade;
        temp["series_id"]=this.state.series_id;
        console.log(this.state)
        console.log(temp);
    }
    render(){
        return (
<div className="modal fade" id="editProblem" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false"  aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Modal title</h5>
      
      </div>
      <div className="modal-body">
      <form>
<div class="form-group">
    <label for="serial">Serial</label>
    <input onChange={this.problemChange}  value={this.state.serial} type="text" class="form-control" name="serial"/>
  </div>
 
  <div class="form-group">
    <label for="series_id">Series id</label>
    <input onChange={this.seriesChange}  value={this.state.series_id} type="text" class="form-control" name="series_id"/>
  </div>

  <div class="form-group">
    <label for="grade">Grade</label>
    <input onChange={this.seriesChange}  value={this.state.grade} type="text" class="form-control" name="grade"/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button onClick={()=>this.props.setCurrentProbToNull()} type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={this.post}>Submit</button>
      </div>
    </div>
  </div>
</div>


        )
    }
}

export default Problem;