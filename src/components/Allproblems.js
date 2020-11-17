import React,{Component} from "react"
import {useSelector} from "react-redux"
import firebase from "../firebase"
import {connect} from "react-redux"
import {fetchProblems} from "../actions/problemAction"
class Allproblems extends Component{
state={

structure:[],
category:{},
f:[],
confirmed:[]


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
        t["description"]=doc.data().description;
       }
       t["doc_id"]=doc.id;
         t["category"]=cat;
        t["difficulty"]=doc.data().difficulty==1?"easy":(doc.data().difficulty==2?"medium":"hard");
       t["language"]=doc.data().language==1?"en":"bn";
       t["title"]=doc.data().title;
       t["interactiveType"]=doc.data().interactiveType==1?"none":"exclusion_grid";
       t["timestamp"]=doc.data().timestamp;

    t["logo"]=doc.data().logo;
    t["grade"]=doc.data().grade;
    t["ansType"]=doc.data().ansType==1?"mcq":(doc.data().ansType==2?"text":"interactive");
   t["series_id"]=this.state.category[cat];
   if(doc.data().isApproved==true||doc.data().isApproved==false){
       t["isApproved"]=doc.data().isApproved;
   }
else{
   
        t["isApproved"]=true;
}
   if(doc.data().tags){
       t["tags"]=doc.data().tags; 
   }
    temp["type"]=t.ansType;
    temp["statement"]=doc.data().statement;
    if(doc.data().restrictions){
        temp["restriction"]=doc.data().restrictions;
    }
temp["explanation"]=doc.data().explanation;
dataTemp["type"]=t.interactiveType;
if(temp.type=="mcq" && dataTemp.type=="none"){
mainData["options"]=doc.data().options;
mainData["answer"]=doc.data().options[doc.data().answer-1];

}
else if(temp.type=="text" && dataTemp.type=="none"){
    mainData["answer"]=doc.data().answer;
}
else if(dataTemp.type=="exclusion_grid")
{
    
   let ques=JSON.parse(doc.data().questionnaire);

   dataTemp["rowHeading"]=ques.rows;
   dataTemp["columnHeading"]=ques.cols;
dataTemp["cell"]=ques.data;
dataTemp["initialState"]=ques.state;
if(temp.type=="interactive"){
    let ans=JSON.parse(doc.data().answer);
mainData["answer"]=ans.state;

}
else if(temp.type=="mcq"){
mainData["options"]=doc.data().options;
mainData["answer"]=doc.data().options[doc.data().answer-1];
}
else if(temp.type=="text"){
    mainData["answer"]=doc.data().answer;
}

}
dataTemp["data"]=mainData;
temp["data"]=dataTemp;
tempData["problem"]=temp;
t["data"]=tempData;
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
    
    console.log(this.state.category)
    }
    disapprove=(id)=>{
    firebase.firestore().collection("problem").doc(id).update({
        isApproved:false
    })
     
    }
    approve=(id)=>{
        firebase.firestore().collection("problem").doc(id).update({
            isApproved:true
        })
         
        }   
    confirm=()=>{
        this.state.f.forEach(prob=>{

            if(prob.isApproved){
                this.state.confirmed.push(prob)
            }
        })

        console.log(this.state.confirmed)
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
    <p class="card-text">Timestamp :{prob.timestamp}</p>
    <p>

  <button className="btn btn-primary" type="button" data-toggle="collapse" data-target={'#collapse'+prob.doc_id}  aria-expanded="false" aria-controls="collapseExample">
     Details
  </button>
  {prob.isApproved?
  <button className="btn btn-danger ml-3 pl-3" onClick={()=>this.disapprove(prob.doc_id)}>Disapprove</button>:
  (<button className="btn btn-success ml-3 pl-3" onClick={()=>{this.approve(prob.doc_id)}}>Approve</button>)
  }
</p>
<div class="collapse" id={'collapse'+prob.doc_id}>
  <div class="card card-body">
<h4>AnsType : {prob.ansType}</h4>
<h4>InteractiveType : {prob.interactiveType}</h4>
 <h6>Status : {prob.isApproved?'Approved':'Not Approved'}</h6>
  <h6>Grade : {prob.grade}</h6>


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