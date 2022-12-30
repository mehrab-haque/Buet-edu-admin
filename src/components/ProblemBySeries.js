import React,{useState} from "react"
import Navbar from "./Navbar"
import axios from 'axios';
import {keys} from "../keys"
import {useParams} from "react-router-dom"
import Series from "./Edit/Series"
import {Link} from "react-router-dom"
import firebase from "../firebase"
import {link} from "../base_url"
import Problem from "./Edit/Problem"
const ProblemBySeries = (props) => {
 
 const [des,setDes]=useState('');
const {id}=useParams();
const [problems,setProblems]=useState([]);
const [currentProblem,setCurrentProblem]=useState(null);
const [nproblem,setnproblem]=useState(0);
const [serial,setSerial]=useState(0);
const [series_id,setSeriesId]=useState(0);
const setCurrentProblemToNull=()=>{
 setCurrentProblem(null)
}
const delete2=(id,doc_id)=>{
  let data={};
  data["problem_id"]=id;
  axios({
    method: 'post',
    url: link.url+'admin/deleteProblem',
    data: data,
    headers:{
      'authorization':keys.authorization,
    }
  }).then(res=>{

console.log(res.data);
firebase.firestore().collection("problem").doc(doc_id).update({
  isApproved:false,


})
alert("Problem deleted");

  })
}

const submit=(prob,id)=>{
 let temp={};
prob["serial"]=this.state.serial;

prob["series_id"]=this.state.series_id;
prob["islive"]=true;
temp["problem"]=prob;
console.log(temp)
axios({
    method: 'post',
    url: link.url+'admin/addProblem',
    data: temp,
    headers:{
      'authorization':keys.authorization,
    }
  }).then(res=>{
    console.log(res.data.id);
    alert("problem successfully added");
    firebase.firestore().collection("problem").doc(id).update({
        isApproved:true,
        series_id:this.state.series_id,
        serial:this.state.serial,
        prob_id:res.data.id,
        isPending:false,
        isLive:true,
        isPremium:false,
        islive:true

    })
  }).catch(e=>console.log(e))



}
const loadProblems=()=>{
axios.get(link.url+'series/'+id,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
 setProblems(res.data);
	console.log(res.data)
}).catch(e=>console.log(e))


}
    return ( 
    <div>
      <Navbar/>
    <button type="button" onClick={loadProblems} className="btn btn-outline-primary btn-lg my-3 mx-3" data-toggle="modal" data-target="#exampleModalLongSeries">
 Get Problems
</button>
{  problems && problems.map((problem,i)=>{

return (
<div><div  key={problem.problem_id?problem.problem_id:problem.prob_id} class="card mt-5" style={{width: '20rem',margin:"auto"}} id={problem.problem_id?problem.problem_id:problem.prob_id}>
  <img src={problem.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">

    <h2 className="card-title">{problem.title}</h2>
    <p class="card-text" >Doc_Id -{problem.doc_id}</p>
  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+problem.doc_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>

{problem.translated!==true && problem.translated!==false?
  <button onClick={async()=> {setCurrentProblem(problem)  }} type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editProblem">
 Edit
</button>:(   <Link to={{ pathname:"/problem/"+problem.problem_id, myProps: {
            problem:problem
        }}} >    <button type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editProblem">
 Edit
</button></Link>)
}
{currentProblem && (currentProblem.translated!==true && currentProblem.translated!==false) &&
    <Problem problem ={currentProblem} setCurrentProbToNull={setCurrentProblemToNull}/>
  

  
}



  {problem.series_id?
  <button onClick={()=>delete2(problem.problem_id,problem.doc_id)} className="btn btn-danger ml-3 pl-3">Delete</button>:
  (<button className="btn btn-success ml-3 pl-3" type="button" data-toggle="collapse" data-target={'#collapse2'+problem.doc_id}  aria-expanded="false" aria-controls="collapseExample" >Approve</button>)
  }



<div class="collapse" id={'collapse'+problem.doc_id}>
  <div class="card card-body">

<h4>AnsType :{problem.data.ansType}</h4>
<h4>InteractiveType : {problem.data.interactiveType}</h4>


<h6>ProblemId {problem.problem_id?problem.problem_id:problem.prob_id}</h6>
  {
      problem.serial?<h5>Serial:{problem.serial}</h5>
:null  }
{
    problem.series_id?<h5>Series Id: {problem.series_id}</h5>:null
}


  </div>
</div>

<div class="collapse" id={'collapse2'+problem.doc_id}>
<div class="card card-body">
<input placeholder="Enter series id" type="text" class="form-control" name="series_id" onChange={(e)=>{setSerial(e.target.value)}}/>
<input placeholder="Enter serial " type="text"class="form-control my-3 py-3" name="serial" onChange={(e)=>{setSeriesId(e.target.value)}}/>

<button  className="btn btn-primary py-3 my-3" onClick={()=>{submit(problem,problem.doc_id)}}>Submit</button>

  </div>
</div>
  </div>
</div>
</div>
)

})}
</div>

 )



}
 
export default ProblemBySeries;