import React,{useState,useEffect} from "react"
import Navbar from "./Navbar";
import { keys } from "../keys"
import axios from "axios"
import {useParams} from "react-router-dom"
import {link} from "../base_url"

const AllTests = () => {

    const [tests,setTests]=useState([]);
    const [lang,setLang]=useState("");
    const [level,setLevel]=useState(0);
    const [type,setType]=useState(false);
    const [name,setName]=useState("")


const save=()=>{

let data={name:name,lang:lang,level_id:level,type:type}

axios({
    method: 'post',
    url: link.url+'api/tests',
    data: data,
    headers:{
      'authorization':keys.authorization,
    }
  }).then(res=>{
   console.log(res.data)
    alert("Successfully added test ");
  
  }).catch(e=>console.log(e))
}
const load=()=>{

    axios({
        method: 'get',
        url: link.url+'api/tests',
  
        headers: {
          'authorization': keys.authorization,
        }
      }).then(res => {  console.log(res.data) ;setTests(res.data.data)})
        .catch(e => {  console.log(e) })
  


}

 return ( 

    <>
<Navbar/>
<div>

<button type="button" class="btn btn-primary btn-lg  mx-5" data-toggle="modal" data-target="#exampleModal">
Add Test
</button>
<button onClick={load}  type="button" className="btn btn-outline-primary btn-lg my-3 mx-3" >
Load Tests
</button>




</div>


<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Add Test</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      <form>
      <div class="form-group">
    <label for="exampleInput3">Name</label>
    <input onChange={(e)=>setName(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput3"/>
  </div>
  <div class="form-group">
    <label for="exampleInput1">Language (en or bn) </label>
    <input onChange={(e)=>setLang(e.target.value)} style={{width:"50%",margin:"auto"}} type="text" class="form-control" id="exampleInput1" aria-describedby="emailHelp" />

  </div>
  <div class="form-group">
    <label for="exampleInput2">Level Id (6/7/8)</label>
    <input onChange={(e)=>setLevel(e.target.value)} style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput2"/>
  </div>
 
  <div class="form-group">
    <label for="exampleInput4">Type (0-Online, 1-Practice) </label>
    <input onChange={(e)=>setType(e.target.value)}  style={{width:"50%",margin:"auto"}}type="text" class="form-control" id="exampleInput4"/>
  </div>


</form>
 


      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button onClick={save} type="button" class="btn btn-primary">Save changes</button>
      </div>
 
    </div>
  </div>
</div>





{

tests && tests.map(test=>(

<div class="card mt-5" style={{width: "18rem",margin:"auto"}}>
 
 <div class="card-body">
   <h2 class="card-title">{test.name}</h2>
   <h5>Level - {test.level_id==6?"1":test.level_id==7?"2":"3"}</h5>
   { test.status==0?
(<h5 class="red">Not live</h5> ): test.status==1 ?(

  test.OnlineTest && (test.OnlineTest.duration*60*60*1000+parseInt(test.OnlineTest.test_date_time))<Date.now()?
  <h5 class="blue">Completed</h5>  :
<h5 class="green"> Live</h5> 
)  : (
<h5 class="blue">Completed</h5> 
)
}
  <a href={"/editTest/"+test.level_id+"/"+test.test_id+"/"+test.lang} class="btn btn-primary">Edit</a>
 
 {
 test.OnlineTest && (Object.keys(test.OnlineTest).length>0)?
 <a href={"/getResult/"+test.level_id+"/"+test.test_id+"/"+test.lang+"/"+test.name} class="btn btn-primary mx-2">Show Result</a>
:null
}
 
 
 </div>
</div>


))

}


    </>


)}

export default AllTests ;