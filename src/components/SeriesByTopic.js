import React,{useState} from "react"
import Navbar from "./Navbar"
import axios from 'axios';
import {keys} from "../keys"
import {useParams} from "react-router-dom"
import Series from "./Edit/Series"
import {Link} from "react-router-dom"
import {link} from "../base_url"
const SeriesByTopic = (props) => {
 
 const [des,setDes]=useState('');
const {id}=useParams();
const [serieses,setSerieses]=useState([]);
const [currentSeries,setCurrentSeries]=useState(null);
const [nproblem,setnproblem]=useState(0);

const setCurrentSeriesToNull=()=>{
 setCurrentSeries(null)
}
const submitNProblem=(id)=>{
 let  temp={
series_id:id,
nproblem:nproblem
  }
  axios({
    method: 'post',
    url: link.url+'admin/editSeriesProblemCount',
    data: temp,
    headers:{
      'authorization':keys.authorization,
    }
  }).then(res=>{
    console.log(res.data);
    alert("Successfully edited nproblem");
  
  }).catch(e=>console.log(e))


}
const submit=()=>{
  let temp={}
  temp["series"]=this.state;
 

axios({
  method: 'post',
  url: link.url+'admin/addSeries',
  data: temp,
  headers:{
    'authorization':keys.authorization,
  }
}).then(res=>{
  console.log(res.data);
  alert("Successfully created");

}).catch(e=>console.log(e))



}
const loadSerieses=()=>{
axios.get(link.url+'topic/'+id,{

headers:{
	'authorization':keys.authorization,

}

}).then(res=>{
 setSerieses(res.data);
	console.log(res.data)
}).catch(e=>console.log(e))


}
    return ( 
    <div>
      <Navbar/>
    <button type="button" onClick={loadSerieses} className="btn btn-outline-primary btn-lg my-3 mx-3" data-toggle="modal" data-target="#exampleModalLongSeries">
 Get Serieses
</button>
{  serieses && serieses.map((series,i)=>{

return (
<div><div  key={series.series_id} class="card mt-5" style={{width: '20rem',margin:"auto"}} id={series.series_id}>
  <img src={series.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
<a style={{textDecoration:"none"}} href={'/series/'+series.series_id}>    <h2 className="card-title">{series.name}</h2></a>
    <p class="card-text">{series.description}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+series.series_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
  <button onClick={async()=>{await setCurrentSeries(series)}} type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editSeries">
 Edit
</button> 
<button type="button" className="btn btn-primary ml-3" data-toggle="collapse" data-target={'#collapse2'+series.series_id}>
 nProblems
</button> 
<Link to={{
  pathname: `/addTutorial/${series.series_id}`,
 
}}>
<button type="button" className="btn btn-primary ml-1 mt-4" >
Add Tutorial
</button> </Link>
{currentSeries &&
<Series series={currentSeries} setCurrentSeriesToNull={setCurrentSeriesToNull}/>
}


 
</p>
<div class="collapse" id={'collapse'+series.series_id}>
  <div class="card card-body">
<h5>No of Problems : {series.nproblem}</h5>


  <h5>Serial: {series.serial}</h5>

  <h5>Series Id: {series.series_id} </h5>


  </div>
</div>

<div class="collapse" id={'collapse2'+series.series_id}>
<div class="card card-body">
<input onChange={(e)=>setnproblem(e.target.value)} placeholder="Enter no of problems" type="text" class="form-control" name="nProblem" />
<button onClick={()=>submitNProblem(series.series_id)} className="btn btn-primary py-3 my-3" >Submit</button>

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
 
export default SeriesByTopic;