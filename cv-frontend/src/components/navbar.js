import React from "react";
import { Link, useLocation } from "react-router-dom";
import '../styles/navbar.css'

const Navbar = () => {
	const location = useLocation().pathname
	
	const CheckIfActive = (page) =>{
		// console.log(page)
		if (page === location){
			return 'navbar-button-active'
		}
		return 'navbar-button'
		
	}

	return (
		<div className='navbar-container'>
			<li className={CheckIfActive('/')}>
				<Link to="/">About</Link>
			</li>
			<li className={CheckIfActive('/Page1')}>
				<Link to="/Page1">Page1</Link>
			</li>
			<li className={CheckIfActive('/Page2')}>
				<Link to="/Page2">Page2</Link>
			</li>
			<li className={CheckIfActive('/Page3')}>
				<Link to="/Page3">Page3</Link>
			</li>
			<li className={CheckIfActive('/Recipe')}>
				<Link to="/Recipe">RecipeMachine</Link>
			</li>
		</div>
	);
};

export default Navbar;