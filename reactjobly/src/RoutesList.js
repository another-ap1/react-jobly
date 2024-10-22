import React from "react";
import {Routes, Route, Navigate} from "react-router-dom";
import Welcome from "./Welcome";
import Companies from "./Companies";
import Jobs from "./Jobs";
import CompanyDetail from "./CompanyDetail";
import LoginForm from "./auth/LoginForm";
import SignupForm from "./auth/SignupForm";
import Profile from "./Profile";

function RoutesList({ login, signup, currentUser }) {
    console.debug(
      "Routes",
      `login=${typeof login}`,
      `register=${typeof register}`,
    );
  
    return (
      <div className="pt-5">
        <Routes>
          {!currentUser &&
          <>
            <Route path="/login"element={<LoginForm login={login} />} />
            <Route path="/signup"element={<SignupForm signup={signup} />} />
          </>
          }
  
          <Route path="/"element={<Welcome />} />
  
          {currentUser &&
          <>
            <Route path="/companies" element={<Companies />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/companies/:handle" element={<CompanyDetail />} />
            <Route path="/profile" element={<Profile />} />
  
          </>
        }
  
          <Route path="*" element={<Navigate to="/" />}/>
        </Routes>
      </div>
    );
  }
  
  export default RoutesList;