import React,{Component} from "react"
import {Link} from "react-router-dom"
import axios from "axios"
import Pagination from "./Pagination"
import Welcome from "./Welcome"
import "../App.css"
import {connect} from "react-redux"
import {fetchSerieses} from "../actions/seriesAction"


class Series extends Component{
state={
currentPage:1,
postPerPage:5,
pageNumber:1,



}
paginate=async(pageNumber)=>{
console.log("paginate",pageNumber)
await this.setState({currentPage:pageNumber})
window.scrollTo(0,0);

}
search=e=>{

	

let elem=document.getElementsByClassName("card");	

Array.from(elem).forEach(function(element){
let tag=element.getElementsByTagName("h2")[0];
let text;
if(tag){
text=tag;



if(text.innerText.includes(e)){
	element.style.display="block"
}
else{

	element.style.display="none"
}
}
})


}
componentDidMount(){
	this.props.serieses(this.props.match.params.id);
/*let s=[];
axios.get(`https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/topic/${this.props.match.params.id}`,{

headers:{
	'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MiwiaWF0IjoxNTk3Mzg0MzI5fQ.o4Kl1bWGejMDZptKQkCv_UJpoHrxhIwbCqDxxISui4U",

}

}).then(res=>{

var p=res.data
this.setState({allserieses:res.data,loading:false})

this.componentMount(p);
	
})
.catch(e=>console.log(e));

*/


}


	render(){

 var indexOfLastPost=this.state.currentPage*this.state.postPerPage;
 var indexOfFirstPost=indexOfLastPost-this.state.postPerPage;

 var currentPost=[]

		return (

<div>
<Welcome message="Serieses"/>
<Link to="/"><button className="btn btn-light back"><svg width="1em" height="1em" viewBox="0 0 16 16" class="bi bi-arrow-left" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
  <path fill-rule="evenodd" d="M5.854 4.646a.5.5 0 0 1 0 .708L3.207 8l2.647 2.646a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 0 1 .708 0z"/>
  <path fill-rule="evenodd" d="M2.5 8a.5.5 0 0 1 .5-.5h10.5a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
</svg></button></Link>


<h1 style={{margin:'auto'}}>Serieses List</h1><br/>
{
  this.props.text?this.search(this.props.text):this.search('')
}
{
  this.props.allserieses?  ( 
 this.props.allserieses.forEach(series=>currentPost.push(series))):null
 
}

<h3>Total serieses : {this.props.allserieses&&this.props.allserieses.length}</h3>
<h4>Page no : {this.state.currentPage}</h4> <br/>
{!this.props.allserieses?(
 <div>
 <div class="spinner-grow text-primary" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-dark" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-success" role="status">
  <span class="sr-only">Loading...</span>
</div>
<div class="spinner-grow text-info" role="status">
  <span class="sr-only">Loading...</span>
</div>
</div>

	):(
<div className="card-container">
{currentPost&& currentPost.slice(indexOfFirstPost,indexOfLastPost).map(series=>{

	return (
<div  key={series.series_id} class="card mt-5" style={{width: '18rem',margin:"auto"}}>
  <img src={series.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
    <h2  className="card-title series_name">{series.name}</h2>
    <p class="card-text">{series.description}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+series.series_id}  aria-expanded="false" aria-controls="collapseExample">
    Details
  </button>
</p>
<div class="collapse" id={'collapse'+series.series_id}>
  <div class="card card-body">

  <h6>Status : {series.islive?'Approved':'Not Approved'}</h6>
<h6>Problems : {series.nproblem }</h6>

  </div>
</div>
  </div>
</div>

		)
})}
</div>)}
{this.props.allserieses?
<div>

<Pagination postsPerPage={this.state.postPerPage} totalPosts={this.props.allserieses.length} paginate={this.paginate}/>
</div>:null
}


</div>

			)
	}
}
const mapStateToProps=(state)=>{
return{
text:state.searchReducer.text,
allserieses:state.seriesReducer
 }
}
const mapDispatchToProps=(dispatch)=>{
return {
   serieses:async(i)=>await fetchSerieses(dispatch,i)
}
}
export default connect(mapStateToProps,mapDispatchToProps)(Series);