import { useContext, useState } from 'react';
import React, { Component }  from 'react';
import { userContext } from '../../App';
import { useNavigate } from 'react-router-dom';
import { createUser, handleGoogleSignIn, handleSignOut, initializeLoginFramWork, signInUser } from './loginManager';

function Login() {
    const [newUser, setNewUser] = useState(false);
    const [userData, setUserData] = useState({
    isSignedIn: false,
    name: '',
    photo: '',
    email: '',
    password: '',
    error: false,
    success: false,
  })

  initializeLoginFramWork();
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const navigate = useNavigate();
  
  const handleBlur = (event) => {
    let emailAndPass;
    if (event.target.name === 'name'){
      emailAndPass = event.target.value
    }
    if (event.target.name === 'email') {
      emailAndPass = /^\S+@\S+\.\S+$/.test(event.target.value)
    }
    if (event.target.name === 'password') {
      emailAndPass = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(event.target.value)
    }
    if (emailAndPass) {
      const newUserInfo = {...userData}
      newUserInfo[event.target.name] = event.target.value
      setUserData(newUserInfo)
    }
  };

  const googleSignIn = () => {
    handleGoogleSignIn()
    .then(res => {
      handleResponse(res, true);
    });
  }

  const googleSignOut = () => {
    handleSignOut()
    .then(res => {
      handleResponse(res, false);
    });
  }

  const handleSubmit = (event) => {
  if (userData.email && userData.password) {
    createUser(userData.name, userData.email, userData.password)
    .then(res => {
      handleResponse(res, true);
    })
  }

  if (!newUser && userData.email && userData.password) {
    signInUser(userData.email, userData.password)
    .then(res => {
      handleResponse(res, true);
    })
  };
    event.preventDefault();
  };

  const handleResponse = (res, redirect) => {
    setUserData(res);
    setLoggedInUser(res);
    if (redirect) {
      navigate("/shipment");
    }
  }

  return (
    <div style={{textAlign:'center'}}>
      { userData.isSignedIn ? <button onClick={googleSignOut}>Sign Out</button>
      : <button onClick={googleSignIn}>Sign in</button>
      }
      {
        userData.isSignedIn && <h1>Welcome, {userData.name}</h1>
      }
      <h1>Our Own Authantication</h1>
      <form onSubmit={handleSubmit}>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="" />
        <label htmlFor="">New User Form</label>
        <br />
        { newUser && <input type="text" onBlur={handleBlur} name='name' placeholder='Your Name' />}
        <br />
        <input type="email" name="email" onBlur={handleBlur} required placeholder='Your Email Address' />
        <br />
        <input type="password" name="password" onBlur={handleBlur} required placeholder='Your Password'/>
        <br />
        <input type="submit" value={newUser ? 'Sign Up' : 'Sign in'} />
      </form>
      {
        userData.error && <p style={{color: 'red'}}>This user already have an account</p>
      }
      {
        userData.success && <p style={{color: 'green'}}>You { newUser? 'Created' : 'Signed In'} Successfully</p>
      }
    </div>
  );
}
export default Login;
