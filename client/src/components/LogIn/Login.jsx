import React, { useState } from "react";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { actionLogin } from "../../redux/usersActions";
import { actionGetOrder } from "../../redux/ordersActions";


const Login = (props) => {
  const dispatch = useDispatch();
  const { modalLoginClose, ChangeModal } = props;
  const [inputs, setInputs] = useState({});
  const idUser = useSelector((store) => store.usersReducer.idUser);

  const handleChancla = () => {
    dispatch(actionLogin({ ...inputs, idUser: idUser }));
    modalLoginClose();
    dispatch(actionGetOrder(idUser))
    //setTimeout(() => {
    //  window.location.reload();
    //}, 200);
  };
  const handleInput = (e) => {
    const { type, value } = e.target;
    setInputs({
      ...inputs,
      [type]: value,
    });
  };

  const ClicktoSign = () => {
    props.setGoogle(true);
    window.open("http://localhost:3000/auth/google");
  };

  const ClicktoSignGit = () => {
    props.setGithub(true);
    window.open("http://localhost:3000/auth/github");
  };

  return (
    <div className="loginContainer">
      <button className="closeButton" onClick={modalLoginClose}>
        x
      </button>
      <ModalHeader id="loginHeaderContainer">
        <div className="addProductTitle">Login </div>
      </ModalHeader>
      <ModalBody id="loginBodyContainer">
        <div className='input-icons'>
          <i class="fa fa-user icon"></i>
          <input
            className="input-field "
            id="email"
            type="email"
            placeholder="Email"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                document.getElementById("password").focus();
              }
            }}
            onChange={handleInput}
          />
        </div>
        <div  className='input-icons'>
          <i class="fa fa-lock"></i>
          <input
            className="input-field "
            id="password"
            type="password"
            placeholder="Password"
            onKeyPress={(e) => {
              if (e.key === "Enter") {
                handleChancla(e);
              }
            }}
            onChange={handleInput}
          />
        </div>

        <button
          className="buttonLoginAndRegister"
          onClick={(e) => {
            handleChancla(e);
          }}
        >
         Iniciar sesión
        </button>
        <div>
          <a className="createAccount" href="/forgot">
            ¿olvidaste tu contraseña?
          </a>
        </div>
      </ModalBody>
      <ModalFooter id="loginFooterContainer">
        <div className="LoginAccount">
          <a className="createComponent ">
            <div className="accountComponent">
              <a className="createAccount" href="#" onClick={ChangeModal}>
                Crear una tu cuenta
              </a>
      
            </div>
          </a>
          <div className="LoginAccountAux">
            <p className="orLogin">Iniciar sesión con</p>
            <button onClick={ClicktoSign} className='btnGoogle' >
              <div class="google-btn">
                <div class="google-icon-wrapper">
                  <img
                    class="buttonLoginGoogle"
                    src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                  />
                </div>
                <div class="btn-text">
                </div>
              </div>
            </button>
            <button onClick={ClicktoSignGit} class="btn btn-block social-login github">
              <span class="social-icons">
                <i class="fab fa-github fa-lg">
                </i>
              </span>
            </button>
          </div>
        </div>
      </ModalFooter>
    </div>
  );
};

export default Login;
