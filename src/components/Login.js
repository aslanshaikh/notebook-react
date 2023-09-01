import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const [credentials, setCredentials] = useState({email: "", password: ""});
  let navigate  = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        const response = await fetch("http://localhost:3000/api/auth/login", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json', 
            },
            body: JSON.stringify({email: credentials.email, password: credentials.password})
          });

          const json = await response.json();
          console.log(json);
          if(json.success){
            localStorage.setItem('token', json.authToken);
           
            props.showAlert(
              "Logged in Successfully ", "success"
              )
            navigate("/");
          }
          else {
            props.showAlert(
              "invalid details ", "danger"
             )
          }
    }
    const onChange = (e) => {    
        setCredentials({...credentials, [e.target.name]: e.target.value})
    }
    return (
        <div className='container mt-2'>
          <h2>Login To Continue</h2>
            <form  onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="exampleInputEmail1">Email address</label>
                    <input type="email" className="form-control" value={credentials.email} onChange={onChange}  id="email" aria-describedby="emailHelp" name='email' placeholder="Enter email"/>
                        <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                </div>
                <div className="form-group">
                    <label htmlFor="exampleInputPassword1">Password</label>
                    <input type="password" className="form-control" value={credentials.password} onChange={onChange} id="password" name='password' placeholder="Password"/>
                </div>
                
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Login
