import React, { Component } from "react"
import axios from "axios"
import { keys } from "../../keys"
import firebase from "../../firebase"
import Navbar from "../Navbar"
import Ajv from "ajv";
import ace from "brace";
import "brace/mode/json";
import "brace/theme/github";
import { JsonEditor as Editor } from "jsoneditor-react";
import "jsoneditor-react/es/editor.min.css";

const ajv = new Ajv({ allErrors: true, verbose: true });

const obj={}
class ProblemEdit extends Component {

  state = {

    description: this.props.location.myProps?this.props.location.myProps.problem.data.description:"",
    serial:this.props.location.myProps? this.props.location.myProps.problem.serial :"" ,
    series_id: this.props.location.myProps?this.props.location.myProps.problem.series_id:"",
    title: this.props.location.myProps?this.props.location.myProps.problem.title:"",
      difficulty:this.props.location.myProps? this.props.location.myProps.problem.difficulty:"",
    ispremium:this.props.location.myProps? this.props.location.myProps.problem.ispremium === undefined ? false : this.props.location.myProps.problem.ispremium:"",
    isLive:this.props.location.myProps? (this.props.location.myProps.problem.isLive   || this.props.location.myProps.problem.islive):"",
    statement: this.props.location.myProps?this.props.location.myProps.problem.data.statement:"",
    explanation:this.props.location.myProps? this.props.location.myProps.problem.data.explanation:"",
    restriction:this.props.location.myProps? this.props.location.myProps.problem.data.restriction:"",
    restrictions: "",
    hint:this.props.location.myProps? this.props.location.myProps.problem.data.hint:"",
    hints: "",
    innerData:this.props.location.myProps?this.props.location.myProps.problem.data.data:"",
    finalInnerData:this.props.location.myProps?this.props.location.myProps.problem.data.data:"",
    loading:0



  }
  problemChange = (e) => {

    this.setState({
      [e.target.name]: e.target.value
    })
  }

  componentDidMount = () => {
    console.log(this.props.location.myProps)

    if(this.props.location.myProps){

    }
    else{
      document.getElementById("click").click();
    }
    // console.log(this.state.innerData);
    let res = "";
    let h = ""
    this.state.restriction && (this.state.hint instanceof Array)&& this.state.restriction.map((r, idx) => {
      return (
        idx === this.state.restriction.length - 1 ? res += r : res += r + "|"


      )
    })
    this.state.hint && (this.state.hint instanceof Array)&& this.state.hint.map((r, idx) => {
      return (
        idx === this.state.hint.length - 1 ? h += r : h += r + "|"


      )
    })
    this.setState({ restrictions: res })
    this.setState({ hints: h })
  }
  post = () => {
    let temp = {}
    let final = {}
    temp = this.props.location.myProps.problem;
    temp["serial"] = this.state.serial;
    temp["grade"] = this.state.grade;
    temp["series_id"] = this.state.series_id;
    temp["problem_id"] = temp["prob_id"] ? temp["prob_id"] : temp["problem_id"];
    temp["title"] = this.state.title;
    temp["difficulty"] = this.state.difficulty;
    temp["ispremium"] = this.state.ispremium;
    temp["islive"] = this.state.isLive;

    final["problem"] = temp;
    console.log(final)
    axios({
      method: 'post',
      url: 'https://zo3aw6p85g.execute-api.us-east-2.amazonaws.com/production/admin/editProblem',
      data: final,
      headers: {
        'authorization': keys.authorization,
      }
    }).then(res => {

      alert("Problem successfully edited");
      firebase.firestore().collection("problem").doc(this.props.problem.doc_id).update({
        title: this.state.title,
        grade: this.state.grade,
        difficulty: this.state.difficulty,
        serial: this.state.serial,
        series_id: this.state.series_id,
        isPending: false,
        isPremium: this.state.isPremium ? this.state.isPremium : false,
        isLive: this.state.isLive,
        islive: this.state.isLive



      })


    }).catch(e => console.log(e))
  }

   handleChange = async(v)  =>{
    console.log(v);
  
    
   await  this.setState({ finalInnerData:v})
  }
  submit = async() => {
await this.setState({loading:1})
    let tempRes = this.state.restrictions.split("|");
    let tempHint = this.state.hints.split("|");
    let temp = {}
    let final = {}
    temp = this.props.location.myProps.problem
    temp["serial"] = this.state.serial;

    temp["series_id"] = this.state.series_id;
    temp["problem_id"] = temp["prob_id"] ? temp["prob_id"] : temp["problem_id"];
    temp["title"] = this.state.title;

    temp["ispremium"] = this.state.ispremium;
    temp["islive"] = this.state.isLive;
    temp["data"]["description"] = this.state.description;
    temp["data"]["statement"] = this.state.statement;
    temp["data"]["explanation"] = this.state.explanation;
    temp["data"]["restriction"] = tempRes;
    temp["data"]["hint"] = tempHint;
    temp["data"]["data"]=this.state.finalInnerData;
    final["problem"] = temp;
   
    console.log(final)
    axios({
      method: 'post',
      url: 'https://zo3aw6p85g.execute-api.us-east-2.amazonaws.com/production/admin/editProblem',
      data: final,
      headers: {
        'authorization': keys.authorization,
      }
    }).then(res => {

      alert("Problem successfully edited");

      this.setState({loading:0})

    }).catch(e => {console.log(e);
      this.setState({loading:0})
    })


  }

  render() {

    return (


      <div>
        <a id="click" href="/allProblems"></a>
        <Navbar />

        <form>
          <div class="mb-3">
            <label class="form-label">Title</label>
            <input onChange={this.problemChange} value={this.state.title} type="text" class="form-control" name="title" />

          </div>
          <div class="mb-3">
            <label class="form-label">Series Id</label>
            <input onChange={this.problemChange} value={this.state.series_id} type="text" class="form-control" name="series_id" />

          </div>
          <div class="mb-3">
            <label class="form-label">Serial</label>
            <input onChange={this.problemChange} value={this.state.serial} type="text" class="form-control" name="serial" />

          </div>
          <div class="mb-3">
            <label class="form-label">Description</label>
            <textarea onChange={this.problemChange} rows="4" value={this.state.description} type="text" class="form-control" name="description" />

          </div>
          <div class="mb-3">
            <label class="form-label">Statement</label>
            <textarea onChange={this.problemChange} rows="4" value={this.state.statement} type="text" class="form-control" name="statement" />

          </div>
          <div class="mb-3">
            <label class="form-label">Explanation</label>
            <textarea onChange={this.problemChange} rows="4" value={this.state.explanation} type="text" class="form-control" name="explanation" />

          </div>


          <div class="mb-3"> <label class="form-label">Restrictions </label>
            <textarea onChange={this.problemChange} rows="4" value={this.state.restrictions} type="text" class="form-control" name="restrictions" />

          </div>
          <div class="mb-3"> <label class="form-label">Hints </label>
            <textarea onChange={this.problemChange} rows="4" value={this.state.hints} type="text" class="form-control" name="hints" />

          </div>
          <div>
          <Editor
        value={this.state.innerData}
        onChange={this.handleChange}
        ace={ace}
        theme="ace/theme/github"
/>
          </div>

          {this.state.ispremium ?
            (
              <div class="form-check">
                <input onClick={(e) => this.setState({ ispremium: !this.state.ispremium })} class="form-check-input" type="checkbox" value={this.state.ispremium} id="flexCheckDefault" checked />
                <label class="form-check-label" for="flexCheckDefault">
                  Premium
                </label>
              </div>
            ) :
            (
              <div class="form-check">
                <input onClick={(e) => this.setState({ ispremium: !this.state.ispremium })} class="form-check-input" type="checkbox" value={this.state.ispremium} id="flexCheckDefault" />
                <label class="form-check-label" for="flexCheckDefault">
                  Premium
                </label>
              </div>
            )
          }
          {this.state.isLive ?
            (
              <div class="form-check">
                <input onClick={(e) => this.setState({ isLive: !this.state.isLive })} class="form-check-input" type="checkbox" value={this.state.isLive} id="flexCheckDefault2" checked />
                <label class="form-check-label" for="flexCheckDefault2">
                  IsLive
                </label>
              </div>
            ) :
            (
              <div class="form-check">
                <input onClick={(e) => this.setState({ isLive: !this.state.isLive })} class="form-check-input" type="checkbox" value={this.state.isLive} id="flexCheckDefault2" />
                <label class="form-check-label" for="flexCheckDefault2">
                  IsLive
                </label>
              </div>
            )
          }
          <div class="mb-3">

            {/* <button type="button " style={{marginTop:"21px",marginBottom:"26px"}} onClick={this.submit} class="btn btn-primary">Submit</button> */}
          </div>
           
          <button class="btn btn-primary" style={{marginTop:"21px",marginBottom:"26px"}} type="button" onClick={this.submit} >
 
 {this.state.loading==0?null:<><span class="spinner-grow spinner-grow-sm pr-2" role="status" aria-hidden="true"></span>
  <span class="sr-only mr-2">Loading..</span></>}
  Submit
  </button>
        </form>

      </div>


    )
  }
}

export default ProblemEdit;