import React,{useState,useEffect} from "react"
import Navbar from "./Navbar";
import { keys } from "../keys"
import axios from "axios"
const AllTests = () => {

const [title,setTitle]=useState('');
const [time,setTime]=useState('');
const [probs,setProbs]=useState([])
const [probId,setProbId]=useState([])

const confirm=()=>{
    console.log(probId)
}
const change=(e)=>{
    var checkedValue = []; 
    var inputElements = document.getElementsByClassName('custom-control-input');
    for(var i=0; inputElements[i]; ++i){
          if(inputElements[i].checked){
               checkedValue.push(parseInt(inputElements[i].value));
               
          }
    }
    setProbId(checkedValue)
}
const click=()=>{
   
}
 useEffect(()=>{

    axios({
        method: 'get',
        url: 'https://zo3aw6p85g.execute-api.us-east-2.amazonaws.com/production/admin/getAllBanglaProblems',
  
        headers: {
          'authorization': keys.authorization,
        }
      }).then(res => {setProbs(res.data);console.log(res.data) })
        .catch(e => {  console.log(e)})
  console.log('j');

},[])


    return ( 
<>
<Navbar/>
<div>
<button onClick={click} type="button" className="btn btn-outline-success btn-lg my-3" data-toggle="modal" data-target="#exampleModalLong">
 Add Test
</button>






</div>
<div className="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Topic Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
      <form>
  <div class="form-group">
    <label for="topic_title">Test Title</label>
    <input onChange={(e)=>setTitle(e.target.value)} type="text" class="form-control" name="title" />
  </div>
  <div class="form-group">
  <button type="button" className="btn btn-outline-success btn-lg my-3" data-toggle="modal" data-target="#exampleModalLong2">
 Select Problems
</button>
</div>
<div class="form-group">
    <label for="topic_title">Test Time(in hours)</label>
    <input onChange={(e)=>setTime(e.target.value)} type="text" class="form-control" name="time" />
  </div>
  </form>
  <div className="modal-footer">
 
        <button type="button" class="btn btn-primary" onClick={confirm}>Confirm</button>
      </div>
      </div>
      </div>
      </div>
      </div>
      <div className="modal fade" id="exampleModalLong2" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLongTitle">Topic Data</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div className="modal-body">
          
      <h1>Problems List</h1> 
      <ul class="list-group list-group-flush">
     {
         probs && probs.map((data,i)=>{
return (
<div>
<li class="list-group-item">
    
    <div class="custom-control custom-checkbox">
      <input onChange={(e)=>change(e)} type="checkbox" class="custom-control-input" id={'check'+i} value={data.problem_id} />
      <label class="custom-control-label" for={'check'+i}>{data.title}</label>
    </div>
  </li>
</div>

)

         })
     }

  
   
 
  </ul>   

  {/* <button class="btn btn-primary"  data-dismiss="modal" aria-label="Close">Done</button> */}
  <div className="modal-footer">
  <button class="btn btn-primary"  data-dismiss="modal" aria-label="Close">Done</button>
      </div>  
          </div></div></div>
</div>

</>

     );
}
 
export default AllTests ;