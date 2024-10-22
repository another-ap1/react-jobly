/**
 *  Renders alert box on page when error is encountered
 *
 *  { LoginForm, RegisterForm, ProfileForm } -> Alert
 */

function Alert({error}) {

    return (
      <div className="Alert">
        <p>{error}</p>
      </div>
    )
  };
  
  export default Alert;