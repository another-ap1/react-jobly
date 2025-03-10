import React,{useContext} from "react";
import { Link } from "react-router-dom";
import UserContext from "./auth/UserContext";

const Welcome = () => {
    const { currentUser } = useContext(UserContext);
    console.debug("Homepage", "currentUser=", currentUser);

    return (
        <div className="Homepage">
            <div className="container text-center">
                <h1 className="mb-4 fw-bold">Jobly</h1>
                <p className="lead">All the jobs in one, convenient place.</p>
                {currentUser
                    ? <h2>Welcome Back, {currentUser.firstName || currentUser.username}!</h2>
                    : (
                        <p>
                            <Link className="btn btn-primary fw-bold me-3" to="/login">
                                Log in
                            </Link>
                            <Link className="btn btn-primary fw-bold" to="/signup">
                                Sign up
                            </Link>
                        </p>
                    )}
            </div>
        </div>
  );
}

export default Welcome;