import React from "react"
import {useState} from "react"
import {useDispatch} from "react-redux"
import {searchText} from "../actions"
const Navbar=()=>{
const [search,setText]=useState("");
const dispatch=useDispatch();

return (
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Web Admin</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
      </li>
     
  
    </ul>
    
  <form class="form-inline  my-lg-0 search" style={{paddingBottom:"20px"}}>
<input name="search" onChange={(e)=>dispatch(searchText(e.target.value))} class="form-control mr-sm-2" type="search" placeholder="Search" aria-label="Search"/>
   </form>
  </div>
</nav>


	)

}

export default Navbar;