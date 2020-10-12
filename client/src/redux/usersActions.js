import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  SET_MODAL_LOGIN,
  RESET_STATUS_RESET,
  GET_ALL_USERS,
  RESET_OK,
  RESET_FAILED,
  RESET_PASSWORD,
  GET_USER_BY_ID,
  USER_CREATED,
  POST_LOGIN,
  USER_LOGGED_IN,
  AUTH_FAILED,
  USER_LOGGED_OUT,
  SET_VERIFIED,
  SET_COOKIE_TO_STORE,
  GET_ORDER_BY_ID,
  USER_TO_ADMIN,
  ADMIN_TO_USER,
  DELETE_USER,
  GET_ALL_DIRECTIONS,
  UPDATE_USER,
} from "./constants";
const url = "http://localhost:3000/";
var qs = require("qs");
axios.defaults.withCrendentails = true;

<<<<<<< HEAD

=======
export const actionUpdateUser = (inputs) => {
  return (dispatch) => {
    axios.put(url + 'user/' + inputs.idUser, inputs, { withCredentials: true }).then((res) => {
      dispatch({ type: UPDATE_USER, payload: res.data })
    })
  }
}
>>>>>>> 2ca37099541b003f4508aefde276d050d85aa36d
export const actionGetUsers = () => {
  return (dispatch) => { 
    axios.get(url + "user/", { withCredentials: true }).then((res) => {
        dispatch({ type: GET_ALL_USERS, payload: res.data });
      });
  };
};
export const actionSetModalLogin = (bool) => {
  return (dispatch) => {
    dispatch({ type: SET_MODAL_LOGIN, payload: bool })
  }
}
export const actionSetAdminUser = (user) => {
  return (dispatch) => {
    axios
      .put(url + "auth/promote/" + user.idUser, qs.stringify(user), {
        withCredentials: true,
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      })
      .then(() => {
        dispatch({ type: USER_TO_ADMIN });
        return dispatch(actionGetUsers());
      });
  };
};
export const actionSetUser = (user) => {
  return (dispatch) => {
    axios
      .put(url + "auth/degrade/" + user.idUser, qs.stringify(user), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        withCredentials: true,
      })
      .then(() => {
        dispatch({ type: ADMIN_TO_USER });
        return dispatch(actionGetUsers());
      });
  };
};
export const actionDeleteUser = (user) => {
  return (dispatch) => {
    var data = qs.stringify(user);
    var config = {
      withCredentials: true,
      method: "DELETE",
      url: "http://localhost:3000/user/" + user.idUser,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config).then(() => {
      dispatch({
        type: DELETE_USER,
      });
      return dispatch(actionGetUsers());
    });
  };
};

export const actionSetCookieToStore = (cookie) => {
  return (dispatch) => {
    dispatch({
      type: SET_COOKIE_TO_STORE,
      payload: cookie,
    });
  };
};

export const actionGetUserById = (idUser) => {
  return (dispatch) => {
    axios
      .get(url + "user/" + idUser, {
        withCredentials: true,
      })
      .then((res) => {
        dispatch({
          type: GET_USER_BY_ID,
          payload: res.data,
        });
      });
  };
};
export const actionVerifyCookies = (cookie) => {
  return (dispatch) => {
    axios
      .post(url + "auth/cookie", cookie, {
        withCredentials: true,
      })
      .then((res) => {
        if (res.verified) {
          dispatch({
            type: AUTH_FAILED,
            payload: res.data,
          });
        } else {
          dispatch({
            type: USER_LOGGED_IN,
            payload: res.data,
          });
        }
        return res;
      });
  };
};
export const actionResetStatusReset = () => {
  return (dispatch) => {
    dispatch({
      type: RESET_STATUS_RESET,
    });
  };
};
export const actionPasswordUpdate = (obj) => {
  return (dispatch) => {
    axios.post(url + "auth/reset?token=" + obj.token, { password: obj.password }, { withCredentials: true })
      .then(() => {
        dispatch({ type: RESET_OK, payload: ["Contraseña aplicada con éxito"] });
      }).catch(() => {
        dispatch({ type: RESET_FAILED, payload: [
            "Algo falló al intentar cambiar la contraseña, intentelo denuevo.",
          ]});
      });
  };
};

export const actionUserCreate = (props) => {
  return (dispatch) => {
    axios .post(url + "user", props, { withCredentials: true })
      .then((res) => {
        toast("¡Usuario Creado!", {
          position: "top-center",
          autoClose: 3500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        return dispatch({
          type: USER_CREATED,
        });
      });
  };
};
export const actionLogin = (inputs) => {
  return (dispatch) => {
    var data = qs.stringify(inputs);
    var config = {
      withCredentials: true,
      method: "post",
      url: "http://localhost:3000/auth/login",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: data,
    };
    axios(config)
      .then(() => {
        axios
          .get(url + "auth/me", {
            withCredentials: true,
          })
          .then((res) => {
            toast("¡Bienvenido!", {
              position: "top-center",
              autoClose: 1500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
            });
            return dispatch({
              type: POST_LOGIN,
              payload: res.data.dataValues,
            });
          });
      })
      .catch((error) => {
        console.log("errorr");
        toast.error("Email o contraseña invalido", {
          position: "top-center",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      });
  };
};

export const actionGetMe = () => {
  return (dispatch) => {
    var config = {
      withCredentials: true,
      method: "get",
      url: "http://localhost:3000/auth/me",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios(config).then((res) => {
      return dispatch({
        type: POST_LOGIN,
        payload: res.data.dataValues,
      });
    });
  };
};

export const actionLogOut = () => {
  return (dispatch) => {
    axios
      .post(
        url + "auth/logout",
        {},
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        return dispatch({
          type: USER_LOGGED_OUT,
          payload: res.data,
        });
      });
  };
};

export const actionSetVerified = (bool) => {
  return (dispatch) => {
    dispatch({
      type: SET_VERIFIED,
      payload: bool,
    });
  };
};

export const actionResetPassword = (email) => {
  return (dispatch) => {
    axios
      .post(url + "auth/forgot", email, {
        withCredentials: true,
      })
      .then((res) => {
        return dispatch({
          type: RESET_PASSWORD,
          payload: res.data,
        });
      });
  };
};

//////////////////////////////////// ACTIONS TO DIRECTIONS

export const actionGetAllDirections = () => {
  return (dispatch) => {
    var config = {
      withCredentials: true,
      method: "POST",
      url: "http://localhost:3000/user/directions",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    };
    axios(config).then((res) => {
      return dispatch({
        type: GET_ALL_DIRECTIONS,
        payload: res.data,
      });
    });
  };
};
