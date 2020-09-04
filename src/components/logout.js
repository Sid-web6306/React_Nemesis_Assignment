import React from 'react';
import {Link} from 'react-router-dom';

export default class logout extends React.Component {
	constructor(props){
		super(props)
		localStorage.removeItem("token1");
		localStorage.removeItem("token2");
	}

	render() {
		return (
			<div>
				
				<h2>You are now logged out.</h2>
				<h4>Click <Link className="f4" to ="/">here</Link> to Login Again.</h4>
			</div>
		)
	}
}