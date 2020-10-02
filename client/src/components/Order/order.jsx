import React, { useState, useEffect } from "react";
import TotalByProduct from "./orderComponents/totalByProduct";
import "./order.css";
import { useDispatch, useSelector } from "react-redux";
import { actionCheckOut } from "../../redux/ordersActions";
const axios = require("axios");

const Order = (props) => {
  const dispatch = useDispatch();

    const [sumaPrecios, setSumaPrecios] = useState({
        precioTotal: 0
    })

  const clickButton = async (sumaPrecios) => {
    dispatch(actionCheckOut(sumaPrecios));
  };

  const urlMercadoPago = useSelector(
    (state) => state.ordersReducer.urlCheckout
  )
  
  if (urlMercadoPago !== '') window.location.href = urlMercadoPago

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

  const finallyPriceCalculator = {precioTotal: or.products.reduce((acum, product) => {
      return (
        acum +
        product.Inter_Prod_Order.price *
          product.Inter_Prod_Order.quantity
      );
    }, 0)
    .toFixed(2)}

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
        <br />
        <div className="footerContent">
          <div className="footerOrder">
            <span className="textPrice">
              {" "}
              Total: $
              {
                finallyPriceCalculator.precioTotal

              }
            </span>
            <div style={{ display: props.origin }}>
              <button className="buttonEndOrden" onClick={clickButton}>
                Finalizar Orden
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
};
export default Order;
