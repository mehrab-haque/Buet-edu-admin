import React,{Component} from "react"
import axios from "axios"
import {keys} from "../../keys"
import firebase from "../../firebase"
class Problem extends Component{

    state={

grade:this.props.problem.grade,
serial:this.props.problem.serial,
series_id:this.props.problem.series_id,
title:this.props.problem.title,
difficulty:this.props.problem.difficulty,
isPremium:this.props.problem.isPremium,
isLive:this.props.problem.isLive



    }
    problemChange=(e)=>{

        this.setState({
            [e.target.name]:e.target.value
        })
    }
  
    post=()=>{
        let temp={}
        let final={}
        temp=this.props.problem;
        temp["serial"]=this.state.serial;
        temp["grade"]=this.state.grade;
        temp["series_id"]=this.state.series_id;
        temp["problem_id"]=temp["prob_id"];
        temp["title"]=this.state.title;
        temp["difficulty"]=this.state.difficulty;
        temp["isPremium"]=this.state.isPremium;
        temp["islive"]=this.state.isLive;
       
        
        final["problem"]=temp;
       console.log(final)
       axios({
        method: 'post',
        url: 'https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/admin/editProblem',
        data: final,
        headers:{
          'authorization':keys.authorization,
        }
      }).then(res=>{
        
        alert("Problem successfully edited");
        firebase.firestore().collection("problem").doc(this.props.problem.doc_id).update({
          title:this.state.title,
          grade:this.state.grade,
          difficulty:this.state.difficulty,
          serial:this.state.serial,
          series_id:this.state.series_id,
          isPending:false,
          isPremium:this.state.isPremium,
          isLive:this.state.isLive
         


  
      })


      }).catch(e=>console.log(e))
      }
     
       
    
    render(){
        return (
   
<div className="modal fade " id="editProblem" tabindex="-1" role="dialog" data-backdrop="static" data-keyboard="false"  aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Edit Problem</h5>
      
      </div>
      <div className="modal-body">
      <form>

      <div class="form-group">
    <label for="grade">Title</label>
    <input onChange={this.problemChange}  value={this.state.title} type="text" class="form-control" name="title"/>
  </div>

<div class="form-group">
    <label for="serial">Serial</label>
    <input onChange={this.problemChange}  value={this.state.serial} type="text" class="form-control" name="serial"/>
  </div>
 
  <div class="form-group">
    <label for="series_id">Series id</label>
    <input onChange={this.problemChange} value={this.state.series_id} type="text" class="form-control" name="series_id"/>
  </div>

  <div class="form-group">
    <label for="grade">Grade</label>
    <input onChange={this.problemChange}  value={this.state.grade} type="text" class="form-control" name="grade"/>
  </div>
  
  <div class="form-group">
    <label for="Difficulty">Difficulty</label>
    <input onChange={this.problemChange}  value={this.state.difficulty} type="text" class="form-control" name="difficulty"/>
  </div>
{this.state.isPremium?
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isPremium:!this.state.isPremium})} class="form-check-input" type="checkbox" value={this.state.isPremium} id="flexCheckDefault" checked />
  <label class="form-check-label" for="flexCheckDefault">
    Premium
  </label>
</div>  
):
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isPremium:!this.state.isPremium})} class="form-check-input" type="checkbox" value={this.state.isPremium} id="flexCheckDefault" />
  <label class="form-check-label" for="flexCheckDefault">
    Premium
  </label>
</div>  
)
}

{this.state.isLive?
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isLive:!this.state.isLive})} class="form-check-input" type="checkbox" value={this.state.isLive} id="flexCheckDefault2" checked />
  <label class="form-check-label" for="flexCheckDefault2">
    IsLive
  </label>
</div>  
):
(
<div class="form-check">
  <input onClick={(e)=>this.setState({isLive:!this.state.isLive})} class="form-check-input" type="checkbox" value={this.state.isLive} id="flexCheckDefault2" />
  <label class="form-check-label" for="flexCheckDefault2">
    IsLive
  </label>
</div>  
)
}
    
  
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