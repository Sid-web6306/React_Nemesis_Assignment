import React,{Component} from 'react';
import Signin from './components/signin';

import Logout from './components/logout';
import Home from './components/Home';

import { Link, Switch, Route} from 'react-router-dom';


import './App.css';

class App extends Component {
  render(){
    return( 
        <div>
          <Switch>
            <Route exact path = "/" component={Signin}/>
            <Route  path = "/home/" component={Home}/>
            <Route  exact path = "/logout" component={Logout}/>
          </Switch>
        </div>
    )
  }
}

export default App;
