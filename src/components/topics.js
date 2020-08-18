import React,{Component} from "react"
import axios from "axios"
import {Redirect} from "react-router-dom"
import "../App.css"
import Navbar from "./Navbar"
import Pagination from "./Pagination"
import Welcome from "./Welcome"
import {connect} from "react-redux"
import {fetchTopics} from "../actions/topicAction"

class Topics extends Component{

constructor(props){
  super(props);
this.state={

  gotSeries:false,
  id:"",
  isEnglish:false,
  currentPage:1,
postPerPage:5,
pageNumber:1
  
}

} 
paginate=async(pageNumber)=>{
console.log("paginate",pageNumber)
await this.setState({currentPage:pageNumber})
window.scrollTo(0,0)

}
 componentDidMount(i=1){  

if(i==false)i=2;
if(i==true) i=1;
 
this.props.topics(i);



/*axios.get(`https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/topics/${i}`,{

headers:{
	'authorization':"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo0MiwiaWF0IjoxNTk3Mzg0MzI5fQ.o4Kl1bWGejMDZptKQkCv_UJpoHrxhIwbCqDxxISui4U",

}

}).then(res=>{
var p=res.data
	this.setState({
		alltopics:p,
    loading:false
	})

})
.catch(e=>console.log(e));
*/


}





click=(id)=>{

this.setState({
  gotSeries:true,
  id:id
})

}

toggle=()=>{
let bool=this.state.isEnglish;
this.setState({
  isEnglish:bool?false:true,
  
})

this.componentDidMount(this.state.isEnglish);
}


search=(e)=>{

  

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



render(props){
 
 var indexOfLastPost=this.state.currentPage*this.state.postPerPage;
 var indexOfFirstPost=indexOfLastPost-this.state.postPerPage;

 var currentPost=[]
if(this.state.gotSeries) return (<Redirect to={'/topic/'+this.state.id}/>)
	return (


<div>

<Welcome message="Topics"/>

<h1 style={{margin:'auto'}}>Topics List </h1>
{
  this.props.text?this.search(this.props.text):this.search('')
}
{
  this.props.alltopics?  ( 
 this.props.alltopics.forEach(topic=>currentPost.push(topic))):null
 
}


<div class="custom-control custom-switch" style={{position:'absolute',right:'5%'}}>
  <input  onClick={this.toggle} type="checkbox" class="custom-control-input" id="customSwitch1"/>
  <label class="custom-control-label" for="customSwitch1">English</label>
</div>
<p>{this.state.isEnglish?'English Version':'Bangla Version'}</p>

<h4>Topics : {this.props.alltopics?this.props.alltopics.length:0}</h4>

<h4>Page : {this.state.currentPage}</h4>

{!this.props.alltopics?(
<div><div class="spinner-grow text-primary" role="status">
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
  ):

(<div className="card-container">
{currentPost&&currentPost.slice(indexOfFirstPost,indexOfLastPost).map((topic,index)=>{

	return (
<div  key={topic.topic_id} class="card mt-5" style={{width: '18rem',margin:"auto"}}>
  <img src={topic.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
    <h2 onClick={()=>this.click(topic.topic_id)} className="card-title">{topic.name}</h2>
    <p class="card-text">{topic.description}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+topic.topic_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
</p>
<div class="collapse" id={'collapse'+topic.topic_id}>
  <div class="card card-body">
<h4>Subject : {topic.subject}</h4>
 <h6>Status : {topic .islive?'Approved':'Not Approved'}</h6>
  <h6>Serieses : {topic.nseries}</h6>
<h6>Problems : {topic.nproblem}</h6>

  </div>
</div>
  </div>
</div>

		)
})}</div>
)}
<div>
{this.props.alltopics?
<div>

<Pagination postsPerPage={this.state.postPerPage} totalPosts={this.props.alltopics.length} paginate={this.paginate}/>
</div>:null
}
</div>
</div>




		)
}





}



const mapDispatchToProps=(dispatch)=>{
return {
   topics:async(i)=>await fetchTopics(dispatch,i)
}
}
const mapStateToProps=(state)=>{
return{
text:state.searchReducer.text,
alltopics:state.topicReducer}
}


export default connect(mapStateToProps,mapDispatchToProps)(Topics);