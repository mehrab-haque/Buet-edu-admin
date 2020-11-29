import React,{Component} from "react"
import {useSelector} from "react-redux"
import firebase from "../firebase"
import {connect} from "react-redux"
import {fetchProblems} from "../actions/problemAction"
import {keys} from "../keys"
import axios from "axios"
import Problem from "./Edit/Problem"

class Allproblems extends Component{
state={

structure:[],
category:{},
f:[],
confirmed:[],
serial:"",
series_id:"",
currentProblem:null

}
componentDidMount=()=>{

let p=[];
let t={};
let tempData={}
let temp={};
let dataTemp={};
let mainData={}
    firebase.firestore().collection('problem').where("draft","==",false).get().then(docs=>{
        docs.forEach(doc=>{
            tempData={}
             temp={};
             t={}
            dataTemp={};
            mainData={}
           console.log(doc.data())
            let cat=doc.data().cat.split(">")[1];
            if(cat){
              if(!(this.state.category.hasOwnProperty(cat.toLowerCase())))  
              this.state.category[cat.toLowerCase()]=Object.keys(this.state.category).length+1;
            }
            else{
                cat=doc.data().cat.toLowerCase();
                if(!(this.state.category.hasOwnProperty(doc.data().cat.toLowerCase())))  
                this.state.category[doc.data().cat.toLowerCase()]=Object.keys(this.state.category).length+1;

            }
temp["version"]=1;


         t["author_id"]=doc.data().uid;
       if(doc.data().description){
        temp["description"]=doc.data().description;
       }
       t["doc_id"]=doc.id;
         temp["category"]=cat;
        t["difficulty"]=doc.data().difficulty==1?"easy":(doc.data().difficulty==2?"medium":"hard");
       temp["lang"]=doc.data().language==1?"en":"bn";
       t["title"]=doc.data().title;
       temp["interactiveType"]=doc.data().interactiveType==1?"none":"exclusion_grid";
       t["timestp"]=doc.data().timestamp;

    t["logo"]=doc.data().logo;
    t["grade"]=doc.data().grade;
    temp["ansType"]=doc.data().ansType==1?"mcq":(doc.data().ansType==2?"text":"interactive");
   if(doc.data().prob_id){
     t["prob_id"]=doc.data().prob_id
   }
   if(doc.data().isApproved==true||doc.data().isApproved==false){
       t["islive"]=doc.data().isApproved;
   }
else{
   
        t["islive"]=false;
}
   if(doc.data().tags){
       temp["tags"]=doc.data().tags; 
   }
   if(doc.data().serial){
    t["serial"]=doc.data().serial
}
if(doc.data().series_id){
    t["series_id"]=doc.data().series_id
}
    temp["type"]=temp.interactiveType;
    temp["statement"]=doc.data().statement;
    if(doc.data().restrictions){
        temp["restriction"]=doc.data().restrictions;
    }
   
temp["explanation"]=doc.data().explanation;
dataTemp["type"]=temp.ansType;
if(dataTemp.type=="mcq" && temp.type=="none"){
mainData["options"]=doc.data().options;
mainData["answer"]=doc.data().options[doc.data().answer-1];

}
else if(temp.type=="none" && dataTemp.type=="text"){
    mainData["answer"]=doc.data().answer;
}
else if(temp.type=="exclusion_grid")
{
    
   let ques=JSON.parse(doc.data().questionnaire);

   dataTemp["rowHeading"]=ques.rows;
   dataTemp["columnHeading"]=ques.cols;
dataTemp["cell"]=ques.data;
dataTemp["initialState"]=ques.state;
if(dataTemp.type=="interactive"){
    let ans=JSON.parse(doc.data().answer);
mainData["answer"]=ans.state;

}
else if(dataTemp.type=="mcq"){
mainData["options"]=doc.data().options;
mainData["answer"]=doc.data().options[doc.data().answer-1];
}
else if(dataTemp.type=="text"){
    mainData["answer"]=doc.data().answer;
}

}
dataTemp["data"]=mainData;
temp["data"]=dataTemp;

t["data"]=temp;
    p.push(t);

        })
    })
 
this.setState({structure:p})
    }
    click=()=>{
        console.log((this.state.structure))
        this.setState({
            f:this.state.structure
        })
    
    console.log(this.state.structure)
    }
    disapprove=(id)=>{
    firebase.firestore().collection("problem").doc(id).update({
        isApproved:false
    })
     
    
  }
  setCurrentProbToNull=()=>{
    this.setState({
      currentProblem:null
    })
  }

     
approve=(id,prob)=>{

}
submit=(prob,id)=>{
let temp={};
prob["serial"]=this.state.serial;
prob["series_id"]=this.state.series_id;
prob["islive"]=true;
temp["problem"]=prob;
console.log(temp)
axios({
    method: 'post',
    url: 'https://0jymup9y4j.execute-api.ap-south-1.amazonaws.com/d/admin/addProblem',
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
        prob_id:res.data.id

    })
  }).catch(e=>console.log(e))
}
    
    

        render(){

            var currentTopics=[];
           
return (
  
<div >
    <button className="btn btn-dark my-3" onClick={this.click}>Load Problems</button>
 
{  this.state.f.map(prob=>{
return (
<div  key={prob.doc_id} class="card mt-5" style={{width: '20rem',margin:"auto"}}>
  <img src={prob.logo} className="img-fluid rounded-circle w-50 mb-3 m-auto" alt="..."/>
  <div className="card-body">
    <h2 className="card-title">{prob.title}</h2>
    <p class="card-text">Timestamp :{prob.timestp}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+prob.doc_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
  <button onClick={()=>this.setState({currentProblem:prob})} type="button" className="btn btn-info ml-3" data-toggle="modal" data-target="#editProblem">
 Edit
</button>
{this.state.currentProblem&&
  <Problem problem={this.state.currentProblem} setCurrentProbToNull={this.setCurrentProbToNull}/>
}


  {prob.islive?
  <button className="btn btn-danger ml-3 pl-3 disabled=''" >Approve</button>:
  (<button className="btn btn-success ml-3 pl-3" type="button" data-toggle="collapse" data-target={'#collapse2'+prob.doc_id}  aria-expanded="false" aria-controls="collapseExample" >Approve</button>)
  }
</p>
<div class="collapse" id={'collapse'+prob.doc_id}>
  <div class="card card-body">
<h4>AnsType : {prob.ansType}</h4>
<h4>InteractiveType : {prob.interactiveType}</h4>
 <h6>Status : {prob.islive?'Approved':'Not Approved'}</h6>
  <h6>Grade : {prob.grade}</h6>
<h6>ProblemId {prob.prob_id}</h6>
  {
      prob.serial?<h5>Serial:{prob.serial}</h5>
:null  }
{
    prob.series_id?<h5>Series Id: {prob.series_id}</h5>:null
}


  </div>
</div>
<div class="collapse" id={'collapse2'+prob.doc_id}>
  <div class="card card-body">
<input placeholder="Enter series id" type="text" class="form-control" name="series_id" onChange={(e)=>{this.setState({[e.target.name]:e.target.value})}}/>
<input placeholder="Enter serial " type="text"class="form-control my-3 py-3" name="serial" onChange={(e)=>{this.setState({[e.target.name]:e.target.value})}}/>

<button  className="btn btn-primary py-3 my-3" onClick={()=>{this.submit(prob,prob.doc_id)}}>Submit</button>


  </div>
</div>




  </div>
</div>

)

})}
<div>
    <button className="btn btn-primary" onClick={this.confirm}>Post</button>
</div>
</div>
	)

}
}


export default (Allproblems);