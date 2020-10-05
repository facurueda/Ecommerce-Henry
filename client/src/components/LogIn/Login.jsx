import React, { useState } from "react";
import { ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import "./Login.css";
import { useDispatch, useSelector } from "react-redux";
import { actionLogin } from "../../redux/usersActions";
import { actionGetOrder } from "../../redux/ordersActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const Login = (props) => {
  const dispatch = useDispatch();
  const { modalLoginClose, ChangeModal } = props;
  const [inputs, setInputs] = useState({});
  const idUser = useSelector((store) => store.usersReducer.idUser);

  toast.configure()

  const handleChancla = () => {
    console.log('dqwjdqkwldjkqwlwkdqw',inputs)
    if( !inputs.email || !inputs.password ){
      toast.error("Debe completar todos los datos", {
        position: "top-center",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    });
    } else {
      dispatch(actionLogin({ ...inputs, idUser: idUser }));
      modalLoginClose();
      dispatch(actionGetOrder(idUser))
      // setTimeout(() => {
      //   window.location.reload();
      // }, 200);
    }
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
        <input
          className="standardInput"
          id="email"
          type="email"
          placeholder="info@lacoseria.com"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              document.getElementById("password").focus();
            }
          }}
          onChange={handleInput}
        />
        <input
          className="standardInput"
          id="password"
          type="password"
          placeholder="··············"
          onKeyPress={(e) => {
            if (e.key === "Enter") {
              handleChancla(e);
            }
          }}
          onChange={handleInput}
        />
        <button
          className="buttonLoginAndRegister"
          onClick={(e) => {
            handleChancla(e);
          }}
        >
          LOGIN
        </button>
        <div>
          {" "}
          Or do you{" "}
          <a className="createAccount" href="/forgot">
            forgot your password?
          </a>{" "}
        </div>
      </ModalBody>
      <ModalFooter id="loginFooterContainer">
        <div className="LoginAccount">
          <a className="createComponent ">
            <div className="accountComponent">
              <p className="lookingFor">Looking for </p>
              <a className="createAccount" href="#" onClick={ChangeModal}>
                create account
              </a>
              ?
            </div>
          </a>
          <div className="LoginAccountAux">
            <p className="orLogin">or login with</p>
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
