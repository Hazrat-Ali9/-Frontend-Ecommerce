
import { useAuthState, useCreateUserWithEmailAndPassword, useSignInWithGoogle} from 'react-firebase-hooks/auth';
import React, { useEffect, useState } from "react";
import auth from '../../firebase.init';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Loading from '../Loading/Loading';
import {
  signInWithEmailAndPassword,
  sendSignInLinkToEmail,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  isSignInWithEmailLink,
  signInWithEmailLink,
} from 'firebase/auth'

const Register = () => {
  // ------------------------Link Verification-----------------------------------------
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

  const handleSendLink = () => {
    setLoginLoading(true);
    sendSignInLinkToEmail(auth, email, {
      url: 'http://localhost:3000/login',
      handleCodeInApp: true,
    })
      .then(() => {
        localStorage.setItem('email', email);
        setLoginLoading(false);
        setLoginError('');
        setInfoMsg('We have sent you an email with a link to sign in');
      })
      .catch((err) => {
        setLoginLoading(false);
        setLoginError(err.message);
      });
  };
  useEffect(() => {
    if (user) {
      if (user.emailVerified) {
        navigate('/');
      } else {
        navigate('/verify-email');
      }
    } else {
      if (isSignInWithEmailLink(auth, window.location.href)) {
        let email = localStorage.getItem('email');
        if (!email) {
          email = window.prompt('Please provide your email');
        }
        setInitialLoading(true);
        signInWithEmailLink(auth, email, window.location.href)
          .then((result) => {
            localStorage.removeItem('email');
            setInitialLoading(false);
            setInitialError('');
            if (result.user.emailVerified) {
              navigate('/');
            } else {
              navigate('/verify-email');
            }
          })
          .catch((err) => {
            setInitialLoading(false);
            setInitialError(err.message);
            navigate('/login');
          });
      }
    }
  }, [user, search, navigate]);

  const handleSignUp = (e) => {
    e.preventDefault();
    setLoginLoading(true);
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        sendEmailVerification(user, {
          url: 'http://localhost:3000',
          handleCodeInApp: true,
        }).then(() => {
          
          setLoginLoading(false);
          setInfoMsg('Verification email sent. Please check your inbox.');
        });
      })
      .catch((err) => {
        setLoginLoading(false);
        setLoginError(err.message);
      });
  };
  // ------------------------Link Verification-----------------------------------------

  const [signInWithGoogle, gLoading, gError] = useSignInWithGoogle(auth);
  const handleGoogleSignIn = async () => {
    try {
        await signInWithGoogle();
        const currentUser = auth.currentUser;
        if (currentUser) {
           
          const { email, displayName } = currentUser;
          const userData = {
              email: email,
              name: displayName
          };
            const apiResponse = await fetch('http://localhost:7000/user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                   
                },
                body: JSON.stringify(userData),
            });

            if (apiResponse.ok) {
                console.log('User data saved successfully');
                navigate("/");
            } else {
                console.error('Failed to save user data to the API');
               
            }
        } else {
            console.error('No user signed in or user data not available');
        }
    } catch (error) {
        console.error('Error occurred during Google sign-in or data saving:', error);
    }
};

  
// const {
//   register,
//   formState: { errors },
//   handleSubmit,
// } = useForm();
// const [createUserWithEmailAndPassword, loading, error] =
//   useCreateUserWithEmailAndPassword(auth);

// const navigate = useNavigate();

// let signInError;

// if (loading || gLoading) {
//   return <Loading/>;
// }

// if (error || gError) {
//   signInError = (
//     <p className="text-red-500">
//       <small>{error?.message || gError?.message}</small>
//     </p>
//   );
// }


// const onSubmit = async (data) => {
  
//   await createUserWithEmailAndPassword( data.email, data.password, data.name);
//   const userData = {
//     email: data.email,
//     name : data.name
//   };
//   try {
//     const apiResponse = await fetch('http://localhost:7000/user', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify(userData),
//     });

//     if (apiResponse.ok) {
//       console.log('User data saved successfully');
//       navigate("/all");
//     } else {
//       console.error('Failed to save user data to the API');
//     }
//   } catch (apiError) {
//     console.error('Error occurred while saving user data to the API', apiError);
//   }
// };

  return (
    <div>
        {/* <div className="flex h-screen justify-center items-center">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="text-center text-2xl font-bold">Sign Up</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="input input-bordered w-full max-w-xs"
                  {...register("name", {
                    required: {
                      value: true,
                      message: "Name is Required",
                    },
                  })}
                />
                <label className="label">
                  {errors.name?.type === "required" && (
                    <span className="label-text-alt text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
              </div>

              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="input input-bordered w-full max-w-xs"
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
              <div className="form-control w-full max-w-xs">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full max-w-xs"
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
              <input
                className="btn w-full max-w-xs bg-orange-600 text-white"
                type="submit"
                value="Sign Up"
              />
            </form>
            <p>
              <small>
                Already have an account?{" "}
                <Link className="text-primary" to="/login">
                  Please login
                </Link>
              </small>
            </p>
            <div className="divider">OR</div>
            <button
              onClick={() => handleGoogleSignIn()}
              className="btn btn-outline"
            >
              Continue with Google
            </button>
          </div>
        </div>
      </div> */}
      <div className='box'>
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
                <form className='form-group custom-form'>
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
                  <button type='button' className='btn btn-primary btn-md' onClick={handleSignUp}>
                    {loginLoading ? <span>Signing you up</span> : <span>Sign Up</span>}
                  </button>
                  {loginError !== '' && <div className='error-msg'>{loginError}</div>}
                  {infoMsg !== '' && <div className='info-msg'>{infoMsg}</div>}
                </form>
              )}
            </>
          )}
        </>
      )}
    </div>
    </div>
  );
};

export default Register;

// Register
