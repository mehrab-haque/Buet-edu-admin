import React from 'react';
import Navbar from "./components/Navbar"
import Welcome from "./components/Welcome"

import AllTopics from "./components/AllTopics"
import AllSerieses from "./components/AllSerieses"
import AllProblems from "./components/Allproblems"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Tutorial from "./components/Tutorial"
import './App.css';

function App() {
  return (
    <Router>
   
    <div className="App">

     
     <Switch>
     <Route path='/' exact>
  

     <AllTopics/>
     </Route>
     
     <Route path='/allTopics' component={AllTopics}/>
     <Route path='/allSerieses' component={AllSerieses}/>
     <Route path='/allProblems' component={AllProblems}/>
     <Route path='/addTutorial/:id' component= {Tutorial}/>
     </Switch>
    </div>

    </Router>
  );
}

export default App;
