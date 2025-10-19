import { sendPasswordResetEmail, signInWithEmailAndPassword } from "firebase/auth";
import React, { useRef, useState } from "react";
import { Link } from "react-router";
import { auth } from "../../firebase/firebase.init";

const Login = () => {
    const [error, setError] = useState('')
    const emailRef = useRef()

    const handleLogin = e => {
        e.preventDefault()
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        //reset status
        setError('')

        signInWithEmailAndPassword(auth, email, password)
        .then(result => {
            console.log(result.user);
            if(!result.user.emailVerified){
              alert("Please verify your email address first")
            }
        })
        .catch(error => {
            setError(error.message);
        })
    }

    //password reset handler
    const handleForgetPassword = () => {
      console.log("forget Password", emailRef.current);
      const email = emailRef.current.value;
      // console.log(email);
      sendPasswordResetEmail(auth, email)
      .then(() => {
        alert("Check your email")
      })
      .catch(error => {
        console.log(error);
      })
    }
  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center">
          <h1 className="text-5xl font-bold">Login now!</h1>
        </div>
        <div className="card bg-base-100 w-full min-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <fieldset className="fieldset">
                <label  className="label">Email</label>
                <input ref={emailRef} type="email" name="email" className="input" placeholder="Email" />
                <label className="label">Password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  placeholder="Password"
                />
                <div>
                  <a onClick={handleForgetPassword}
                  className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Login</button>
              </fieldset>
              <p>Don't have an account? Please <Link className="text-blue-500 underline" to="/register">Register Now</Link></p>
            
            {error && <p>{error}</p>}

            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

//farewellps.mccollege@gmail.com
//123456jH@