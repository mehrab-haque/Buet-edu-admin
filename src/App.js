import React from 'react';
import Navbar from "./components/Navbar"
import Welcome from "./components/Welcome"

import AllTopics from "./components/AllTopics"
import AllSerieses from "./components/AllSerieses"
import AllProblems from "./components/Allproblems"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import Tutorial from "./components/Tutorial"
import SeriesByTopic from "./components/SeriesByTopic"
import ProblemBySeries  from "./components/ProblemBySeries"
import ProblemEdit from "./components/Edit/ProblemEdit"
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
     <Route path='/topics/:id' component= {SeriesByTopic}/>
    <Route path='/series/:id' component= {ProblemBySeries}/>
     <Route path='/problem/:id' component= {ProblemEdit}/>
     </Switch>
    </div>

    </Router>
  );
}

export default App;
