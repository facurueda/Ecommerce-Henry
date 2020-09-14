import React from "react";
import { Link } from 'react-router-dom';
import StylesNotFound from './StylesNotFound.css'; 
import video from './video.gif';


const NotFound = () => (
    <div class = 'contenedorNotFound'>
        <h1 class = 'textNotFound'> 404- Not Found!</h1>        
{/*        <button class="btn btn-primary"><Link to = '/' class='textGoHome'>
            Go Home 
        </Link></button>  */}
        <div class='cajadino'><img src={video} class= 'dino'></img></div>
    </div>
)

export default NotFound; 