import React, { forwardRef } from "react";
import './styles/button.css'

const Button = forwardRef(({ children, ...rest }, ref) => {
  return (
    <div className='buttonCropContainer'>
      <button className='buttonStyles' {...rest} ref={ref}>
        {children}
      </button>
    </div>
  );
});

Button.displayName = "Button";

export default Button;
