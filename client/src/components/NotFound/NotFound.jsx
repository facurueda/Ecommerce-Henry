import React from "react";
import { Link } from 'react-router-dom';
import StylesNotFound from './StylesNotFound.css'; 
import video from './video.gif';


const NotFound = () => (
<div class = 'contenedorNotFound'>
<div class="moon"></div>
<div class="crater crater1"></div>
<div class="crater crater2"></div>
<div class="crater crater3"></div>

<div class="star star1"></div>
<div class="star star2"></div>
<div class="star star3"></div>
<div class="star star4"></div>
<div class="star star5"></div>

<div class="error">
  <div class="title">404</div>
  <div class="subtitle">Hmmm...</div>
  <div class="decription">It looks one of the coseria developers fell asleep</div>
  {/* <button class="button button--active">LOGIN</button> */}
  {/* <button class="button">CONTACT</button> */}
</div>

<div class="astronaut">
  <div class="backpack"></div>
  <div class="body"></div>
  <div class="body__chest"></div>
  <div class="arm-left1"></div>
  <div class="arm-left2"></div>
  <div class="arm-right1"></div>
  <div class="arm-right2"></div>
  <div class="arm-thumb-left"></div>
  <div class="arm-thumb-right"></div>
  <div class="leg-left"></div>
  <div class="leg-right"></div>
  <div class="foot-left"></div>
  <div class="foot-right"></div>
  <div class="wrist-left"></div>
  <div class="wrist-right"></div>
  <div class="cord">
    <canvas id="cord" height="500px" width="500px"></canvas>
  </div>
  <div class="head">
    <canvas id="visor" width="60px" height="60px"></canvas>
    <div class="head-visor-flare1"></div>
    <div class="head-visor-flare2"></div>
  </div>
</div>
    </div>
)






export default NotFound; 