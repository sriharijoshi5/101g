import React, { Fragment } from 'react';
import Header from "./Header";
import Footer from "./Footer";
import Home from "./Home";
import Player from "./Player";
import About from "./About";
import VR from "./VR";
import {Switch,Route,Redirect, withRouter} from 'react-router-dom';
import { connect} from 'react-redux';

const MainComponent = (props) => {
	return(
		<Fragment >
			<Header className="align-items-start" />
			<Switch >
				<Route exact path={`/home`} component={Home}/>
				<Route exact path={`/VR`} component={VR}/>
				<Route exact path={`/about`} component={About}/>
                <Route path="/player/:id" component={Player}></Route>
				<Redirect to={`/home`} />
			</Switch>
            <Footer />
		</Fragment>
	)
}
export default withRouter(MainComponent)