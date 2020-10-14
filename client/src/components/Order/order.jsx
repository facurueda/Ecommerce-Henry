import React, { useState, useEffect, useReducer } from "react";
import TotalByProduct from "./orderComponents/totalByProduct";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCheckOut } from "../../redux/ordersActions";
import { Modal } from "reactstrap";
import Loading from "../LoadingMiddleware/LoadingMiddleware";
import ModalDireccion from './ModalDireccion'

import { actionSetModalLogin } from "../../redux/usersActions";

const axios = require("axios");

const Order = (props) => {

  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const changeLoading = () => setLoading(!loading);

  /////////////////////// ESTADOS PARA EL ENVIO ///////////////////////

  const [modalDireccion, setModalDireccion] = useState(false)
  const openModalDireccion = () => { setModalDireccion(!modalDireccion) }
  const closeModalDireccion = () => { setModalDireccion(false) }

  const [cancelarEnvio, setCancelarEnvio] = useState(false)
  const mostrarBotonCancelar = () => setCancelarEnvio(true)

  const [mostrarPrecioEnvio, setMostrarPrecioEnvio] = useState(false)

  const [precioEnvio, setPrecioEnvio] = useState(0)

  const modalLogin =  useSelector(state => state.usersReducer.modalLogin);
  const user =  useSelector(state => state.usersReducer.idUser);

  const clickButton = () => {


    if(level == 'GUEST'){               
    dispatch(actionSetModalLogin(!modalLogin))
     } else {
    
    dispatch(actionCheckOut(cancelarEnvio, idOrderUser,user));
    changeLoading();
     }
  };

  /////////////////////////////////////////////////////////////////////

  const propsOrder = props.order;
  const storeOrder = useSelector((state) => state.ordersReducer.order);
  const level = useSelector(state => state.usersReducer.level)
  

  

  const order = () => {
    if (props.order) {
      return propsOrder;
    } else {
      return storeOrder;
    }
  };

 
 
  const or = order();
  
  
  const idOrderUser = or.idOrder

  if (Object.keys(or).length < 1) {
    return (
      <div className="orderContainer">
        <h3 className="orderVacia">
          <b>El carrito esta vacio</b>
        </h3>
      </div>
    );
  } else {
    return (
      <div className="orderContainer">
        {or.products.map((product) => {
          return (
            <TotalByProduct
              product={product}
              className="target"
              key={product.idProduct}
            />
          );
        })}
        <div className="footerContent">
          <div className='containerButtonEnvio'>
            <div className='shippingContainer'>

              {!cancelarEnvio ? (
                <button onClick={e => { openModalDireccion() }} className='buttonEnvio'><h5 className='shipbutton'>INCLUIR </h5>  <i class="fas fa-shipping-fast"></i></button>
              ) : (
                  <button onClick={e => { setCancelarEnvio(false); setPrecioEnvio(0); setMostrarPrecioEnvio(false) }} className='buttonEnvio'>CANCELAR ENVIO</button>
                )
              }

              <Modal isOpen={modalDireccion}>
                <ModalDireccion
                  idOrderUser={idOrderUser}
                  closeModalDireccion={closeModalDireccion}
                  setPrecioEnvio={setPrecioEnvio}
                  setMostrarPrecioEnvio={setMostrarPrecioEnvio}
                  mostrarBotonCancelar={mostrarBotonCancelar}
                />
              </Modal>


            </div>
            <div className='totalPrice'>
              <div className='shipPrice' >
                ENVIO: {mostrarPrecioEnvio ? (`$  ${precioEnvio}`) : ('$ 0')}
              </div>
              <span className="textPrice">
                {" "}
              TOTAL: $
              {or.products
                  .reduce((acum, product) => {
                    return (
                      acum +
                      product.Inter_Prod_Order.price *
                      product.Inter_Prod_Order.quantity
                    );
                  }, precioEnvio)
                  .toFixed(2)}
              </span>
            </div>
          </div>
          <div style={{ display: props.origin }} className='containerButtonEndOrden'>
          <button className="buttonEndOrden" onClick={()=>{
            window.location.href = '/catalogue?filter=All categories'
          }}>
              CONTINUAR COMPRANDO
              </button>
            <button className="buttonEndOrden" onClick={clickButton}>
              FINALIZAR COMPRA
              </button>
            <Modal isOpen={loading} toggle={loading}>
              <Loading isPayLoading={true} loadingClose={changeLoading} />
            </Modal>
          </div>

        </div>
      </div>
    );
  }
};
export default Order;
