import React,{useState,useEffect} from "react"
import Navbar from "./Navbar";
import { keys } from "../keys"
import axios from "axios"
import {link} from "../base_url"
import {useParams} from "react-router-dom"

const GetResult = () => {

const [users,setUsers]=useState([]);
const [userId,setUserIds]=useState([]);
    var {level_id,test_id,lang,name}=useParams();
const publish=()=>{

let data={user_ids:userId};
console.log(data);

  axios({
    method: 'post',
    url: link.url+'api/tests/'+test_id+'/leaderboard',
   data:data,
    headers: {
      'authorization': keys.authorization,
    }
  }).then(res =>{ alert("Successfully added users to the leaderboard")})
    .catch(e => {  console.log(e)})
 
    
    
}
    const change=(e,d)=>{
      var checkedValue = []; 
     
      var inputElements = document.getElementsByClassName('custom-control-input');
      for(var i=0; inputElements[i]; ++i){
        if(inputElements[i].checked){
          checkedValue.push(parseInt(inputElements[i].value));

        }

      }
console.log(checkedValue);
setUserIds(checkedValue);
    }  

    useEffect(()=>{
console.log(test_id)
        axios({
            method: 'get',
            url: link.url+'api/tests/'+test_id+'/users/marks',
        
            headers: {
              'authorization': keys.authorization,
            }
          }).then(res =>{console.log(res.data);setUsers(res.data.data)})
            .catch(e => {  console.log(e)})


    },[])
return (

<>

<Navbar/>
<h3>Test : {name}</h3>
<div style={{width:"70%",margin:"auto"}} class="l">
{
      
   users && users && users.length>0 ?
   
       users.map((data,i)=>{
return (
<div key={i}>
<li class="list-group-item" style={{marginTop:"5px"}} >
    
    <div class="custom-control custom-checkbox" >
    <input onChange={(e)=>change(e,data)} type="checkbox" class="custom-control-input" id={'check'+data.user_id} value={data.user_id} />
     
  
    <label class="custom-control-label" for={'check'+data.user_id}>{data.name} <span class="badge badge-secondary" style={{marginLeft:"20px"}}> Marks : {data.obtained_marks}</span></label>
   
      
    </div>
  </li>
  
</div>

)

         }):(

          <h1>No user attempted this test</h1>
         )
        
         }
          {users && users.length>0 ?<button type="button" onClick={publish} class="btn btn-primary btn-md  my-5" style={{float:"right"}} >
         Publish Leader board
         </button>:null}
        
</div>

</>



)

}
export default GetResult;