import React from 'react';
import './formcomponent.css';


const Form = props => {
	return (
		<div>
			<form className="pt-5">
				<div className="row">
					<div className="col-sm-3 offset-3">
						<input type="text" name="city" autoComplete="off" className="form-control form1" placeholder="Enter the City"/>
					</div>
					<div className="col-sm-3">
						<input type="text" name="country" autoComplete="off" className="form-control form1" placeholder="Enter the Country"/>
					</div>
					<div className="pr-3">
						<button type="button" className="btn btn-success" onClick={props.loadweather} >Search</button>
					</div>
				</div>
			</form>
		</div>
	)
}

export default Form;
