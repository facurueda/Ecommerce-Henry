import { useHistory } from "react-router-dom";
import React from 'react';

import Bottomback from './Bottomback.css';


function  Item () {
  
  let history = useHistory();
  return (
  
      <>
        <button class="btn" onClick={() => history.goBack()}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
      </>
     
  );
};


export default Item; 