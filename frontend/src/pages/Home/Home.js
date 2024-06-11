import React from 'react';
import Nav from '../../components/Navbar/Navbar'
import '../../styles/pages/Home.css'
import landing_img from '../../assets/images/landing_img.png'
function Home() {
  return (
<div id='main'> 
<Nav /> 
<div id='contaner_home'>
<div id='welcome_message'>
  <p>"Welcome to Edupro, where you can unlock your potential,</p>
   <p>explore new horizons,and achieve your goals.  </p>
  <p>Start your journey to knowledge and growth today with us." </p> 
  </div>
 <div>
  <img src={landing_img} alt='edu'></img>
  </div>

</div>
</div>
  );
}

export default Home;