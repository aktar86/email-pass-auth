import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "../../firebase/firebase.init";
import { FaEye, FaRegEyeSlash } from "react-icons/fa";
import { Link } from "react-router";

const Register = () => {
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    const terms = e.target.terms.checked;
    console.log("Register Click", email, password, terms);

    const passwordLenPattern = /^.{6,}$/;
    const casePattern = /^(?=.*[a-z])(?=.*[A-Z]).+$/;
    const specialPatternt = /[!@#$%&^*(),.?:"{}|<>]/;

    if (!passwordLenPattern.test(password)) {
      console.log("pass didn't match");
      setError("password should be 6 chc or more");
      return;
    } else if (!casePattern.test(password)) {
      setError(
        "Password must have at least one uppercase and one lowercase letter"
      );
      return;
    } else if (!specialPatternt.test(password)) {
      setError("Password must contain at least one special character");
      return;
    }

    //also we can check all condition together in one line regEx expression

    //reset status:
    setError("");
    setSuccess(false);

    if(!terms){
      setError('Please accept our terms and conditions')
      return;
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess(true);
        e.target.reset();
      })
      .catch((error) => {
        setError(error.message);
      });
  };

  const handleShowAndHidePassword = (event) => {
    event.preventDefault();
    setShowPassword(!showPassword)
  }

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col">
        <div className="text-center l">
          <h1 className="text-2xl font-bold">Register now!</h1>
        </div>
        <div className="card bg-base-100 w-full min-w-sm shrink-0 shadow-2xl">
          <div className="card-body">
            <form onSubmit={handleSubmit}>
              <fieldset className="fieldset">
                <label className="label">Email</label>
                <input
                  type="email"
                  name="email"
                  className="input w-full"
                  placeholder="Email"
                />
                <label className="label">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    className="input w-full"
                    name="password"
                    placeholder="Password"
                  />
                  <button 
                  onClick={handleShowAndHidePassword}
                  className="btn btn-xs absolute top-2 right-3 ">
                    {showPassword ? <FaRegEyeSlash/> : <FaEye/>}
                  </button>
                </div>

                {/* Checkbox */}
                <div>
                  <label class="label">
                    <input type="checkbox"
                    name="terms"
                    class="checkbox" />
                    accept our terms and conditions
                  </label>
                </div>
                <div>
                  <a className="link link-hover">Forgot password?</a>
                </div>
                <button className="btn btn-neutral mt-4">Register</button>
              </fieldset>
              {success && (
                <p className="text-green-500">Account Create Successfully </p>
              )}
              {error && <p className="text-red-500">{error}</p>}
              <p>Already have an account? Please <Link className="text-blue-500 underline" to="/login">Log in</Link></p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
