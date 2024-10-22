import React,{useState,useEffect} from 'react';
import useLocalStorage from "./hooks/useLocalStorage"
import Navigation from './Navigation';
import RoutesList from "./RoutesList"
import JoblyApi from './api';
import UserContext from './auth/UserContext';
import {jwtDecode} from "jwt-decode"
import './App.css';

export const TOKEN_STORAGE_ID = "jobly-token";

function App() {
  const [applicationIds, setApplicationIds] = useState(new Set([]));
  const [currentUser, setCurrentUser] = useState({
    data: null,
    infoLoaded: false
  });
  const [token, setToken] = useLocalStorage(TOKEN_STORAGE_ID);

  console.debug(
    "App",
    "applicationIds=",
    applicationIds,
    "currentUser=",
    currentUser,
    "token=",
    token
  );

  useEffect(
    function loadUserInfo() {
      console.debug("App useEffect loadUserInfo", "token=", token);

      async function getCurrentUser() {
        if (token) {
          try {
            let { username } = jwtDecode(token);
            JoblyApi.token = token;
            let currentUser = await JoblyApi.getCurrentUser(username);

            setCurrentUser({
              infoLoaded: true,
              data: currentUser
            });
            setApplicationIds(new Set(currentUser.applications));
          } catch (err) {
            console.error("App loadUserInfo: problem loading", err);
            setCurrentUser({
              infoLoaded: true,
              data: null
            });
          }
        } else {
          setCurrentUser({
            infoLoaded: true,
            data: null
          });
        }
      }
      getCurrentUser();
    },
    [token]
  );

  function logout() {
    setApplicationIds(new Set([]));
    setCurrentUser({
      infoLoaded: true,
      data: null
    });
    setToken(null);
  }

  async function signup(signupData) {
    let token = await JoblyApi.signup(signupData);
    setToken(token);
  }

  async function login(loginData) {
    let token = await JoblyApi.login(loginData);
    setToken(token);
  }

  function hasAppliedToJob(id) {
    return applicationIds.has(id);
  }

  function applyToJob(id) {
    if (hasAppliedToJob(id)) return;
    JoblyApi.applyToJob(currentUser.username, id);
    setApplicationIds(new Set([...applicationIds, id]));
  }

  if (!currentUser.infoLoaded) return <div>Loading...</div>;

  return (
    <UserContext.Provider
      value={{
        currentUser: currentUser.data,
        setCurrentUser,
        hasAppliedToJob,
        applyToJob,
      }}
    >
      <div className="App">
        <Navigation logout={logout} />
        <RoutesList currentUser={currentUser.data} login={login} signup={signup} />
      </div>
    </UserContext.Provider>
  );
}

export default App;
