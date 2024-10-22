import React, {useState} from "react";
import {Form, FormGroup, Label, Input, Button} from "reactstrap"

const Login = ({loginUser}) => {
    const INITIAL_VALUES = {
        username:"",
        password:""
    }
    const [formData, setFormData] = useState(INITIAL_VALUES);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setFormData((data) => ({
            ...data,
            [name]:value
        }));
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        try {
            loginUser(formData)
            setFormData(INITIAL_VALUES);
        } catch(e) {
            console.error("Something went wrong: ", e)
        }
    }

    return (
        <>
            <h1>Hello Welcome Back!</h1>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for="">Username: </Label>
                    <Input 
                        type="text"
                        name="username"
                        id="username"
                        value={formData.username}
                        onChange={handleChange}
                        required/>
                    
                    <Label for="">Password: </Label>
                    <Input 
                        type="text"
                        name="password"
                        id="password"
                        value={formData.password}
                        onChange={handleChange}
                        required/>
                </FormGroup>
                <Button type="submit">Submit</Button>
            </Form>
        </>
    )
}

export default Login;