import React, {useState} from 'react';
import DashboardHeader from "../../components/DashboardHeader";
import {Link, useNavigate} from "react-router-dom";
import FastAPIClient from '../../client';
import config from '../../config';
import Button from '../../components/Button/Button';
import FormInput from '../../components/FormInput/FormInput';

const client = new FastAPIClient(config);

const SignUp = () => {
  const [error, setError] = useState({ email: '', password: '', fullName: '' });
  const [registerForm, setRegisterForm] = useState({ email: '', password: '', fullName: '' });

  const [loading, setLoading] = useState(false)

  const navigate = useNavigate()

  const onRegister = (e) => {
    e.preventDefault();
    setLoading(true)
    setError(false);

    if(registerForm.fullName.length <= 0)
    {
      setLoading(false)
      return setError({fullName: "Please Enter Your Full Name"}) 
    }
    if(registerForm.email.length <= 0)
    {
      setLoading(false)
      return setError({email: "Please Enter Email Address"}) 
    }
    if(registerForm.password.length <= 0)
    {
      setLoading(false)
      return setError({password: "Please Enter Password"})
    }

    client.register(registerForm.email, registerForm.password, registerForm.fullName)
      .then( () => {
        navigate('/login')
      })
      .catch( (err) => {
        setLoading(false)
        setError(true);
        alert(err)
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
              <form onSubmit={(e) => onRegister(e)}>
                  <FormInput 
                    type={"text"} 
                    name={"fullName"} 
                    label={"Full Name"}
                    error={error.fullName} 
                    value={registerForm.fullName} 
                    onChange={(e) => setRegisterForm({...registerForm, fullName: e.target.value })} 
                  />
                  <FormInput 
                    type={"email"} 
                    name={"email"} 
                    label={"Email"} 
                    error={error.email}
                    value={registerForm.email} 
                    onChange={(e) => setRegisterForm({...registerForm, email: e.target.value })} 
                  />
                  <FormInput 
                    type={"password"} 
                    name={"password"} 
                    label={"Password"} 
                    error={error.password}
                    value={registerForm.password} 
                    onChange={(e) => setRegisterForm({...registerForm, password: e.target.value })} 
                  />
                <Button title={"Create Account"} error={error.password} loading={loading} />       
              </form>
              
              <footer>
                <Link className="text-indigo-700 hover:text-blue-900 text-sm float-right" to="/login">Already Have an account ?</Link>
              </footer> 
            </div>
          </div>
      </section>
    </>
  )
}

export default SignUp;


