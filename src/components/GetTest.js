import React,{useEffect,useState} from "react"
import {useSelector} from "react-redux"
import Navbar from "./Navbar";
import {useParams} from "react-router-dom"
import axios from "axios"
import {keys} from "../keys"
const GetTest=(props)=>{
const {test_id}=useParams();

const [data,setData]=useState([])
const [marks,setMarks]=useState(0)
const edit=(prob_id)=>{


  axios({
    method: 'put',
    url: 'http://43.224.110.202/api/tests/'+test_id+"/problems/"+prob_id,
    data: {marks:parseInt(marks)},
    headers:{
      'authorization':keys.authorization,
    }
  }).then(res=>{
   console.log(res.data)
    alert("Successfully update problem marks");
  
  }).catch(e=>console.log(e))




}
 useEffect(()=>{


  axios({
    method: 'get',
    url: 'http://43.224.110.202/api/tests/'+test_id,
   
    headers: {
      'authorization': keys.authorization,
    }
  }).then(res=>{
  setData(res.data.data[0].TestProblems)
  console.log(res.data.data[0].TestProblems)
  console.log(res.data)
  }).catch(e=>console.log(e))

  },[])
return (
    <>
    <Navbar/>

<div>

{data && data.map(d=>(

<div key={d.Problem.problem_id} class="card mt-5" style={{width:"20rem",margin:"auto"}}>
  <img class="card-img-top" src={d.Problem.logo} alt="Card image cap"/>
  <div class="card-body">
    <h2 class="card-title">{d.Problem.title}</h2>
<h4> Marks :{d.marks}</h4 >
 <button className="btn btn-primary ml-2 mt-5" type="button" data-toggle="collapse" data-target={'#collapse' + d.Problem.problem_id} aria-expanded="false" aria-controls="collapseExample" >Edit Marks</button>
  
 <div class="collapse" id={'collapse' + d.Problem.problem_id}>
                  <div class="card card-body">
                    <input onChange={(e) => setMarks(e.target.value) } placeholder="Enter marks" type="text" class="form-control" name="mappedProblemId" />
                    <button onClick={(e) => edit(d.Problem.problem_id)} className="btn btn-primary py-3 my-3" >Submit</button>

                  </div>
  
  </div>
</div>

</div>

))}
  
</div>

</>
	
)

}
export default GetTest;