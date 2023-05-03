/* eslint-disable */
import InputField from "components/fields/InputField";
import { FcGoogle } from "react-icons/fc";
import Checkbox from "components/checkbox";
import { useState } from "react";
import { json } from "react-router-dom";
import { Link, Routes, Route, Navigate } from "react-router-dom";
export default function SignIn() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [response, setResponse] = useState("")
  const [showPopup, setShowPopup] = useState(false);

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };


  const signinAPI = (email, password) => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow'
    };

    fetch(`https://homeapplication251.herokuapp.com/admin/api/login?email=${email}&password=${password}`, requestOptions)
    .then(response => response.json())
      .then(result => {
        if (result.access_token) {
          localStorage.setItem("token", result.access_token)
          localStorage.setItem("username", result.user.username)
          localStorage.setItem("image", result.user.image)
          // Set the cookie with the token value
          
          const token = result.access_token;
          // document.cookie = `token=${token}`;

          // Redirect to dashboard
          window.location.href = "/admin"
        } else {
          setShowPopup(true);
          // Handle invalid credentials
          console.log("Invalid credentials")
        }
      })
      .catch(error => console.log('error', error));

  }

  return (
    <div className="mt-16 mb-16 flex h-full w-full items-center justify-center px-2 md:mx-0 md:px-0 lg:mb-10 lg:items-center lg:justify-start">
      {/* Sign in section */}
      <div className="mt-[10vh] w-full max-w-full flex-col items-center md:pl-4 lg:pl-0 xl:max-w-[420px]">
        <h4 className="mb-2.5 text-4xl font-bold text-navy-700 dark:text-white">
          Sign In
        </h4>
        <p className="mb-9 ml-1 text-base text-gray-600">
          Enter your email and password to sign in!
        </p>

        <InputField
          variant="auth"
          extra="mb-3"
          label="Email*"
          placeholder="mail@simmmple.com"
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />

        {/* Password */}
        <InputField
          variant="auth"
          extra="mb-3"
          label="Password*"
          placeholder="Min. 8 characters"
          id="password"
          type="password"
          onChange={handlePasswordChange}
        />
        {/* Checkbox */}
        <div className="mb-4 flex items-center justify-between px-2">
          <div className="flex items-center">
            <Checkbox />
            <p className="ml-2 text-sm font-medium text-navy-700 dark:text-white">
              Keep me logged In
            </p>
          </div>
          <a
            className="text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
            href=" "
          >
            Forgot Password?
          </a>
        </div>
        <Link >
          <button className="linear mt-2 w-full rounded-xl bg-brand-500 py-[12px] text-base font-medium text-white transition duration-200 hover:bg-brand-600 active:bg-brand-700 dark:bg-brand-400 dark:text-white dark:hover:bg-brand-300 dark:active:bg-brand-200"
            onClick={() => { signinAPI(email, password) }}
          >
            Sign In
          </button>
        </Link>
        <div className="mt-4">
          <span className=" text-sm font-medium text-navy-700 dark:text-gray-600">
            Not registered yet?
          </span>
          <a
            href=" "
            className="ml-1 text-sm font-medium text-brand-500 hover:text-brand-600 dark:text-white"
          >
            Create an account
          </a>
        </div>
        {showPopup && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-25">
            <div className="bg-white p-4 rounded shadow-md " style={{ width: '400px', height: 'fit-content', marginBottom: "1px" }}>
              <p className="text-red-500 font-bold mb-2">Sign-in Failed</p>
              <p className="text-gray-700 text-sm">Invalid email or password.</p>
              <button
                className="mt-4 px-4 py-2 bg-brand-500 text-white rounded-lg font-medium hover:bg-brand-600 transition duration-200"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
