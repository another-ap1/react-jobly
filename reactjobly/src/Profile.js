import React, {useState} from "react";
import Alert from "./common/Alert";
import JoblyApi from "./api";
import UserContext from "./auth/UserContext";

const Profile = () => {

    const [currentUser, setCurrentUser] = useState(UserContext);
    const [formData, setFormData] = useState({
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        email: currentUser.email,
        username: currentUser.username,
    });

    const [formErrors, setFormErrors] = useState([]);
    const [saveConfirmed, setSaveConfirmed] = useState(false);

    async function handleSubmit(evt) {
        evt.preventDefault();
    
        let profileData = {
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
        };
    
        let username = formData.username;
        let updatedUser;
    
        try {
          updatedUser = await JoblyApi.saveProfile(username, profileData);
        } catch (errors) {
          setFormErrors(errors);
          return;
        }
    
        setFormData(f => ({ ...f }));
        setFormErrors([]);
        setSaveConfirmed(true);
    
        // trigger reloading of user information throughout the site
        setCurrentUser(currentUser => ({
          ...currentUser,
          data: updatedUser
        }));
      }
    
      /** Handle form data changing */
      function handleChange(evt) {
        const { name, value } = evt.target;
        setFormData(f => ({
          ...f,
          [name]: value,
        }));
        setFormErrors([]);
      }
    
      return (
        <div className="ProfileForm col-md-6 col-lg-4 offset-md-3 offset-lg-4">
          <h3>Profile</h3>
          <div className="card">
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label className="form-label">Username</label>
                  <input
                    disabled
                    className="form-control"
                    placeholder={formData.username}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">First Name</label>
                  <input
                    name="firstName"
                    className="form-control"
                    value={formData.firstName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Last Name</label>
                  <input
                    name="lastName"
                    className="form-control"
                    value={formData.lastName}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
    
                {formErrors.length
                  ? <Alert type="danger" messages={formErrors} />
                  : null}
    
                {saveConfirmed
                  ?
                  <Alert type="success" messages={["Updated successfully."]} />
                  : null}
    
                <div className="d-grid">
                  <button className="btn btn-primary" onClick={handleSubmit}>
                    Save Changes
                  </button>
                </div>
    
              </form>
            </div>
          </div>
        </div>
      );
}

export default Profile;