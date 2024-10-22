import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Alert from './Alert';

/**

 * Renders login form and makes request to authenticate login
 *
 * Props:
 *  - handleRequest(): submit request to backend
 *
 * State:
 * - formData - object
 * - error - string
 *
 * App -> RoutesList -> { Homepage, CompanyList, CompanyDetail,
 *                      JobList, LoginForm, LoginForm, ProfileForm }
 *
 */
function LoginForm({ handleRequest }) {
	const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [formData, setFormData] = useState({
		username: '',
		password: '',
	});

	/** Handle the server request and log in the user. */
	async function handleSubmit(evt) {
		evt.preventDefault();
		try {
			await handleRequest(formData);
			navigate('/');
		} catch (err) {
			setError(err[0]);
		}
	}

	/** Update formData on each change of input field value. */
	function handleChange(evt) {
		const { name, value } = evt.target;
		setFormData(fData => ({
			...fData,
			[name]: value,
		}));
	}

	return (
		<div className='LoginForm'>
			<h1>Log in</h1>
			{error && <Alert error={error} />}
			<div className='LoginForm-card card'>
				<form
					id='LoginForm-form'
					onSubmit={handleSubmit}>
					<div>
						<label htmlFor='username'>Username</label>
						<input
							id='username'
							name='username'
							value={formData.username}
							onChange={handleChange}></input>
					</div>

					<div>
						<label htmlFor='password'>Password</label>
						<input
							id='password'
							name='password'
							type='password'
							value={formData.password}
							onChange={handleChange}></input>
					</div>
					<div>
						<button type='submit'>Submit</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default LoginForm;
