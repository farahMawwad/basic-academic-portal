import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import img_wait from '../../assets/images/signup_wait.png';
import img_error from '../../assets/images/signup_error.png';
import '../../styles/pages/SignIn.css';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [stat, setStat] = useState({
    pass: { isRight: true, label: "" },
    email: { isRight: true, label: "" },
    pass_email: { isRight: true, label: "" },
    img: { isRight: true, img: img_wait }
  });

  const ButtonSignUp = () => {
    navigate('/signup');
  };

  const Buttonlogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`http://127.0.0.1:8080/user/login`, { email, pass });
      const data = response.data;

      if (typeof data === "object") {
        localStorage.setItem('token', data.token);
        if (data.token) {
          axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
        }
        navigate("/Auth");
      } else {
        handleErrorMessage(data);
      }
    } catch (error) {
      console.error("Axios Error:", error);
    }
  };

  const handleErrorMessage = (message) => {
    const newStat = {
      pass_email: { isRight: true, label: "" },
      pass: { isRight: true, label: "" },
      email: { isRight: true, label: "" },
      img: { isRight: true, img: img_wait }
    };

    switch (message) {
      case "All fields must be filled":
        newStat.email = { isRight: false, label: "The field must be filled" };
        newStat.pass = { isRight: false, label: "The field must be filled" };
        newStat.img = { isRight: false, img: img_error };
        break;
      case "Incorrect email":
        newStat.pass_email = { isRight: false, label: "Incorrect password or email" };
        newStat.img = { isRight: false, img: img_error };
        break;
      case "Incorrect password":
        newStat.pass_email = { isRight: false, label: "Incorrect password or email" };
        newStat.img = { isRight: false, img: img_error };
        break;
      default:
        newStat.email = { isRight: false, label: "An unexpected error occurred" };
        break;
    }

    setStat(newStat);
  };

  return (
    <div id='container_signup'>
      <div id='right'>
        <h1>Welcome!</h1>
        <h3>Welcome! If you're new here<br /> please sign up to create an account.</h3>
        <div id='sign_btn'>
          <div id='btn' onClick={ButtonSignUp}>SIGN UP</div>
        </div>
        <img src={stat.img.img} id='img' alt='img_sign-up' />
      </div>
      <form onSubmit={Buttonlogin} id="left">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email Address"
        />
        <label htmlFor="email" >
          {stat.email.label}
        </label>
        <input
          type="password"
          id="password"
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="Enter Password"
        />
        <label htmlFor="password" >
          {stat.pass.label}
        </label>
        <div>{stat.pass_email.label}</div>
        <div onClick={Buttonlogin} id="btn_sub">Sign In</div>
      </form>
    </div>
  );
}

export default SignIn;
