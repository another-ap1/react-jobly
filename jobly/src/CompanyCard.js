import './App.css';
import React, { useState } from 'react';


/**
 * Renders App
 *
 * Props:
 *  - none
 *
 * State:
 * - currentUser - object
 * - userToken - string
 *
 * Context:
 * - activeUser
 *
 * App -> { Navigation, RoutesList }
 *
 */
function App() {

  const [isLoading, setIsLoading] = useState(true);

	

	/** Submit server request to register user. */
	

	/** Submit server request to log in user. */
	

	/** Submit server request to update user. */
	

	/** Logs out user, clears token and currentUser */
	

  if (isLoading) return <p>Loading...</p>;

	return (
		<div className='App'>
			
		</div>
	);
}

export default App;