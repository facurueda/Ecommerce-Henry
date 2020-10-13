import React from 'react';
import { useHistory } from "react-router-dom";



const itemBack = () => {
  let history = useHistory();
  return (
    <button class="closeButton" onClick={() => history.goBack()}><i class="fa fa-angle-left" aria-hidden="true"></i></button>
  );
};


export default itemBack; 