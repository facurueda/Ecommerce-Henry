import React, { useState, useEffect } from "react";
import TotalByProduct from "./orderComponents/totalByProduct";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCheckOut, actionDeleteDireccion } from "../../redux/ordersActions";
import { Modal } from "reactstrap";
import Loading from "../LoadingMiddleware/LoadingMiddleware";
import ModalDireccion from './ModalDireccion'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
const axios = require("axios");

const Order = (props) => {

  toast.configure()

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

  const clickButton = () => {
    dispatch(actionCheckOut(cancelarEnvio, idOrderUser));
    changeLoading();

  };

  /////////////////////////////////////////////////////////////////////

  const propsOrder = props.order;
  const storeOrder = useSelector((state) => state.ordersReducer.order);

  const order = () => {
    if (props.order) {
      return propsOrder;
    } else {
      return storeOrder;
    }
  };


  const or = order();

  const idOrderUser = or.idOrder
  const idUser = or.idUser


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
<<<<<<< HEAD
            <div className='shippingContainer'>

              {!cancelarEnvio ? (
                <button onClick={e => { openModalDireccion() }} className='buttonEnvio'><h5 className='shipbutton'>INCLUIR </h5>  <i class="fas fa-shipping-fast"></i></button>
              ) : (
                  <button onClick={e => { setCancelarEnvio(false); setPrecioEnvio(0); setMostrarPrecioEnvio(false) }} className='buttonEnvio'>CANCELAR ENVIO</button>
=======
            <div style={{ width: '60%' }}>

              {!cancelarEnvio ? (
                <button onClick={e => { openModalDireccion() }} className='buttonEnvio'>¿Agregar Envio?</button>
              ) : (
                  <button onClick={e => {
                    setCancelarEnvio(false); setPrecioEnvio(0); setMostrarPrecioEnvio(false); toast.error("Envío cancelado", {
                      position: "top-center",
                      autoClose: 1500,
                      hideProgressBar: false,
                      closeOnClick: true,
                      pauseOnHover: true,
                      draggable: true,
                      progress: undefined,
                    }); dispatch(actionDeleteDireccion(idOrderUser))
                  }} className='buttonEnvio'>Cancelar Envio</button>
>>>>>>> master
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


<<<<<<< HEAD
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
          <button className="buttonEndOrden" onClick={clickButton}>
              CONTINUAR COMPRANDO
              </button>
            <button className="buttonEndOrden" onClick={clickButton}>
              FINALIZAR COMPRA
              </button>
            <Modal isOpen={loading} toggle={loading}>
              <Loading isPayLoading={true} loadingClose={changeLoading} />
            </Modal>
          </div>
=======
            </div>
            <div style={{ width: '40%', display: "flex", alignItems: 'center', justifyContent: 'flex-end' }}>
              {mostrarPrecioEnvio ? (`$  ${precioEnvio}`) : ('')}
            </div>
          </div>
          <span className="textPrice">
            {" "}
              Total: $
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

          <div style={{ display: props.origin }} className='containerButtonEndOrden'>
            <button className="buttonEndOrden" onClick={clickButton}>
              Finalizar Orden
              </button>
            <Modal isOpen={loading} toggle={loading}>
              <Loading isPayLoading={true} loadingClose={changeLoading} />
            </Modal>
          </div>
>>>>>>> master

        </div>
      </div>
    );
  }
};
export default Order;
