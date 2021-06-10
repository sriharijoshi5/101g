import React from 'react';
import {
    Route,
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import Home from './Home';
import Player from './Player';
import './App.css';
import Header from './Header';
import Footer from './Footer';

function App() {
    return (
        <Router>
            <Switch>
            <Route exact path="/" component={Home}></Route>
            <Route path="/player/:id" component={Player}></Route>
            </Switch>
        </Router>
    );
}
export default App;

