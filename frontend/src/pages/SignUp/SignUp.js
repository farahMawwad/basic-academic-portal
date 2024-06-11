import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import img_wait from '../../assets/images/signup_wait.png';
import img_error from '../../assets/images/signup_error.png';
import '../../styles/pages/SignUp.css';

function SignUp() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [name, setName] = useState("");
  const [passConfirm, setPassConfirm] = useState("");
  const [stat, setStat] = useState({
    pass: { isRight: true, label: "" },
    confirmPass: { isRight: true, label: "" },
    email: { isRight: true, label: "" },
    img: { isRight: true, img: img_wait }
    
  });
  const ButtonSignIn =async (e)=>{
    try {
navigate('/signin')

    }catch(error){
        console.error("Axios Error:", error); 
    }
}
  const ButtonSignup = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://127.0.0.1:8080/user/signup', {email,pass,passConfirm,name});
      const data = response.data;
      if (typeof data === "object") {
        navigate("/signin");
      } else {
        handleErrorMessage(data);
      }
    } catch (error) {
      console.error('Axios Error:', error);
    }
  };

  const handleErrorMessage = (message) => {
    const newStat = { pass: { isRight: true, label: "" }, confirmPass: { isRight: true, label: "" }, email: { isRight: true, label: "" } };
    switch (message) {
      case "All fields must be filled":
        newStat.email = { isRight: false, label: "The field must be filled" };
        newStat.pass = { isRight: false, label: "The field must be filled" };
        newStat.img = { isRight: false, img: img_error };
        break;
      case "Email not valid":
        newStat.email = { isRight: false, label: "Email not valid" };
        newStat.img = { isRight: false, img: img_error };
        break;
      case "Email already in use":
        newStat.email = { isRight: false, label: "Email already in use" };
        newStat.img = { isRight: false, img: img_error };
        break;
      case "Password not strong enough":
        newStat.pass = { isRight: false, label: "Password not strong enough" };
        newStat.img = { isRight: false, img: img_error };
        break;
      case "Passwordconfirm is not match":
        newStat.confirmPass = { isRight: false, label: "Password confirm is not match" };
        newStat.img = { isRight: false, img: img_error };
      break;
      default :navigate('/signin')
      break;
 
    }

    setStat(newStat);
  };


  return (
    <div id='container_signup'>
    <div id='right'>
      <h1>Welcome!</h1>
      <h3>If you have an account<br /> please sign in  with your credentials.</h3>
      <div id='sign_btn'>
        <div id='btn' onClick={ButtonSignIn}>SIGN IN</div>
      </div>
        <img  src={stat.img.img} id='img' alt='img_sign-up'/>
    </div>
  
    <form onSubmit={ButtonSignup} id='left'>
      <input
        type='text'
        placeholder='Enter your name'
        onChange={(e) => setName(e.target.value)}
      />
      <input
        id='email'
        type='email'
        placeholder='Enter your email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <label htmlFor='email'>{stat.email.label}</label>
      <input
        id='pass'
        type='password'
        placeholder='Password'
        value={pass}
        onChange={(e) => setPass(e.target.value)}
      />
      <label htmlFor='pass'>{stat.pass.label}</label>
      <input 
        id='confirmpass'
        type='password'
        placeholder='Confirm Password'
        value={passConfirm}
        onChange={(e) => setPassConfirm(e.target.value)}
      />
      <label htmlFor='confirmpass'>{stat.confirmPass.label}</label>
      <div id='btn_sub' onClick={ButtonSignup}>SIGN UP</div>
    </form>
  </div>
  

  );
}

export default SignUp;
