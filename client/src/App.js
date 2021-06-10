import React from 'react';
import {BrowserRouter as Router} from "react-router-dom";
import './App.css';

import MainComponent from './Components/MainComponent';

function App() {
    return (
        <Router>
            <div className="App">
                <MainComponent />
            </div>
            {/* <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/player/:id" component={Player}></Route>
            </Switch> */}
        </Router>
    );
}
export default App;

