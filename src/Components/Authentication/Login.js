import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuthState, useSignInWithEmailAndPassword, useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useForm } from "react-hook-form";
import auth from "../../firebase.init";
import Loading from "../Loading/Loading";
import { signInWithEmailAndPassword } from "firebase/auth";

const Login = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const location = useLocation();
  const { search } = location;
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState('');
  const [infoMsg, setInfoMsg] = useState('');
  const [initialLoading, setInitialLoading] = useState(false);
  const [initialError, setInitialError] = useState('');
  const handleLogin = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        setLoginLoading(false);
        setLoginError('');
      })
      .catch((err) => {
        setLoginLoading(false);
        setLoginError(err.message);
      });
  };
  return (
    <div>
      {/* <div class="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-lg dark:bg-gray-800 lg:max-w-4xl">
        <div
          class="hidden bg-cover lg:block lg:w-1/2"
          style={{
            backgroundImage: `url('https://i.postimg.cc/SsT5LcQp/2314950.jpg'`,
          }}
        ></div>

        <div class="w-full px-6 py-8 md:px-8 lg:w-1/2">
          <div class="flex justify-center mx-auto">
            <div className="avatar">
              <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTezVZRoHiOL2h1sfPm3xB_MY_sKqFAcopRqQ&usqp=CAU"
                  alt="use"
                />
              </div>
            </div>
          </div>

          <p class="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
            Welcome
          </p>

          <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

            <h5 class="text-lg font-bold text-center text-gray-500 ">
              {" "}
              Login Now
            </h5>

            <span class="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
          </div>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div class="mt-4">
              <label
                class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                for="LoggingEmailAddress"
              >
                Email Address
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is Required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                    message: "Provide a valid Email",
                  },
                })}
                id="LoggingEmailAddress"
                class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="email"
              />
              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="label-text-alt text-red-500">
                    {errors.email.message}
                  </span>
                )}
              </label>
            </div>

            <div class="mt-4">
              <div class="flex justify-between">
                <label
                  class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200"
                  for="loggingPassword"
                >
                  Password
                </label>
              </div>

              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is Required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be 6 characters or longer",
                  },
                })}
                id="loggingPassword"
                class="block w-full px-4 py-2 text-gray-700 bg-white border rounded-lg dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                type="password"
              />
              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="label-text-alt text-red-500">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {signInError}
            <div class="mt-6">
              <input
                className="w-full px-6 py-3 text-sm font-medium tracking-wide border-solid border border-sky-400 text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-amber-800"
                type="submit"
                value="Login"
              />
            </div>
          </form>

          <div class="flex items-center justify-between mt-4">
            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

            <a
              href="/"
              class="text-md font-semibold text-gray-500 dark:text-gray-400 hover:underline"
            >
              Social Media Login
            </a>

            <span class="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
          </div>
          <button onClick={() => signInWithGoogle()} class="bg-white w-full flex items-center text-gray-700 dark:text-gray-300 justify-center gap-x-3 text-sm sm:text-base  dark:bg-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 rounded-lg hover:bg-gray-100 duration-300 transition-colors border px-8 py-2.5">
            <svg
              class="w-5 h-5 sm:h-6 sm:w-6"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clip-path="url(#clip0_3033_94454)">
                <path
                  d="M23.766 12.2764C23.766 11.4607 23.6999 10.6406 23.5588 9.83807H12.24V14.4591H18.7217C18.4528 15.9494 17.5885 17.2678 16.323 18.1056V21.1039H20.19C22.4608 19.0139 23.766 15.9274 23.766 12.2764Z"
                  fill="#4285F4"
                />
                <path
                  d="M12.2401 24.0008C15.4766 24.0008 18.2059 22.9382 20.1945 21.1039L16.3276 18.1055C15.2517 18.8375 13.8627 19.252 12.2445 19.252C9.11388 19.252 6.45946 17.1399 5.50705 14.3003H1.5166V17.3912C3.55371 21.4434 7.7029 24.0008 12.2401 24.0008Z"
                  fill="#34A853"
                />
                <path
                  d="M5.50253 14.3003C4.99987 12.8099 4.99987 11.1961 5.50253 9.70575V6.61481H1.51649C-0.18551 10.0056 -0.18551 14.0004 1.51649 17.3912L5.50253 14.3003Z"
                  fill="#FBBC04"
                />
                <path
                  d="M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z"
                  fill="#EA4335"
                />
              </g>
              <defs>
                <clipPath id="clip0_3033_94454">
                  <rect width="24" height="24" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <span>Sign in with Google</span>
          </button>
          <p class="text-center text-sm text-white mt-2">
            Don't have an account?{" "}
            <Link className="text-sky-400 underline" to="/register">
              Sign Up Now
            </Link>
          </p>
        </div>
      </div> */}
      {initialLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {initialError !== '' ? (
            <div className='error-msg'>{initialError}</div>
          ) : (
            <>
              {user ? (
                <div>Please wait...</div>
              ) : (
                <form className='form-group custom-form' onSubmit={handleLogin}>
                  <label>Email</label>
                  <input
                    type='email'
                    required
                    placeholder='Enter Email'
                    className='form-control'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label>Password</label>
                  <input
                    type='password'
                    required
                    placeholder='Enter Password'
                    className='form-control'
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button type='submit' className='btn btn-success btn-md'>
                    {loginLoading ? <span>Logging you in</span> : <span>Login</span>}
                  </button>
                  {loginError !== '' && <div className='error-msg'>{loginError}</div>}
                  {infoMsg !== '' && <div className='info-msg'>{infoMsg}</div>}
                </form>
              )}
            </>
          )}
        </>
      )}
      <Link to = "/register"> Sign Up</Link>
    </div>
  );
};

export default Login;

// Login
