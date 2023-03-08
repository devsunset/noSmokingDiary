import React, {useState} from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import {Link, useNavigate} from "react-router-dom";
import FastAPIClient from '../../client';
import config from '../../config';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';

const client = new FastAPIClient(config);

const Login = () => {
  const [error, setError] = useState({email: "", password: ""});
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onLogin = (e) => {
    e.preventDefault();
    setError(false);
    setLoading(true)

    if(loginForm.email.length <= 0)
    {
      setLoading(false)
      return setError({email: "Please Enter Email Address"}) 
    }
    if(loginForm.password.length <= 0)
    {
      setLoading(false)
      return setError({password: "Please Enter Password"})
    }

    client.login(loginForm.email, loginForm.password)
      .then( () => {
        navigate('/my-diaries')
      })
      .catch( (err) => {
        setLoading(false)
        setError(true);
        console.err(err)
      });
  }


  return (
      <>
      <section className="bg-black ">
        <DashboardHeader />
        <div className="flex items-center justify-center min-h-screen bg-gray-100 text-left ">
            <div className="w-full max-w-xs m-auto bg-indigo-100 rounded p-5 shadow-lg">  
              <header>
                {/* <img className="w-20 mx-auto mb-5" src="https://img.icons8.com/fluent/344/year-of-tiger.png" /> */}
                <div className="flex items-center justify-center w-20 h-20 mx-auto mb-5 bg-indigo-500 rounded-full ">
                <img src="/logo_no_smoking_icon.png"></img>
                </div>
              </header>
              <form onSubmit={(e) => onLogin(e)}>
                <FormInput 
                  type={"text"}
                  name={"email"}
                  label={"Email"}
                  error={error.email}
                  value={loginForm.email}
                  onChange={(e) => setLoginForm({...loginForm, email: e.target.value })}
                />
                <FormInput 
                  type={"password"}
                  name={"password"}
                  label={"Password"}
                  error={error.password}
                  value={loginForm.password} 
                  onChange={(e) => setLoginForm({...loginForm, password: e.target.value })}
                />
                <Button 
                  title={"Login"}  
                  loading={loading}
                  error={error.password}
                  />      
              </form>
              <footer>
                <Link className="text-indigo-700 hover:text-blue-900 text-sm float-right" to="/sign-up">Create Account</Link>
              </footer> 
            </div>
          </div>
      </section>
    </>
  )
}

export default Login;


