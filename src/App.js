import React from 'react';
import Navbar from "./components/Navbar"
import Welcome from "./components/Welcome"
import Topics from "./components/topics"
import Series from "./components/Series"
import {BrowserRouter as Router,Route,Switch} from "react-router-dom";
import './App.css';

function App() {
  return (
    <Router>
    <Navbar/>
    <div className="App">

     
     <Switch>
     <Route path='/' exact>
  

     <Topics/>
     </Route>
     <Route path='/topic/:id' component={Series}/>

     </Switch>
    </div>

    </Router>
  );
}

export default App;
