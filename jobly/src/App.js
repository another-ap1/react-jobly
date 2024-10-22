import './App.css';
import React, { useState, useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import RoutesList from './RoutesList';
import Navigation from './Navigation';
import JoblyApi from './api';
import userContext from './UserContext';
import {jwtDecode} from 'jwt-decode';

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
	const [currentUser, setCurrentUser] = useState(null);
	const [userToken, setUserToken] = useState(JoblyApi.token);
  const [isLoading, setIsLoading] = useState(true);
	let activeUser = {
		username: currentUser?.username,
		firstName: currentUser?.firstName,
	};

  const navigate = useNavigate();

	useEffect(
		function fetchCurrentUserDataOnChange() {
			async function fetchCurrentUserData() {
				const { username } = jwtDecode(userToken);
				console.log('username', username);
				const user = await JoblyApi.getUser(username);
				setCurrentUser(user);
        setIsLoading(false);
			}
			if (userToken) {
				fetchCurrentUserData();
				localStorage.setItem('userToken', userToken);
			} else {
				localStorage.removeItem('userToken');
        setIsLoading(false)
			}
		},
		[userToken]
	);

	/** Submit server request to register user. */
	async function register(userData) {
		const token = await JoblyApi.signUp(userData);
		setUserToken(token);
	}

	/** Submit server request to log in user. */
	async function login(userData) {
		const token = await JoblyApi.login(userData);
		setUserToken(token);
	}

	/** Submit server request to update user. */
	async function profile(userData) {
		console.log('inside handleprof req app.js');
		const user = await JoblyApi.updateProfile(userData);
		setCurrentUser(user);
	}

	/** Logs out user, clears token and currentUser */
	function handleLogout() {
		setCurrentUser(null);
		setUserToken(null);
    navigate('/');
	}

  if (isLoading) return <p>Loading...</p>;

	return (
		<div className='App'>
			<userContext.Provider value={{ activeUser }}>
				<Navigation handleLogout={handleLogout} />
				<RoutesList
					register={register}
					login={login}
					profile={profile}
					currentUser={currentUser}
				/>
			</userContext.Provider>
		</div>
	);
}

export default App;
