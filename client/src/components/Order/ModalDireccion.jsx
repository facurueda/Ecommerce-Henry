import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { actionSendDirectionToDB } from "../../redux/ordersActions";
import { actionGetAllDirections } from "../../redux/usersActions";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './ModalDireccion.css'


const ModalDireccion = (props) => {


  const { closeModalDireccion, setPrecioEnvio, setMostrarPrecioEnvio, idOrderUser } = props

  const initialState = {
    provincia: '',
    ciudad: '',
    calle: '',
    numeracion: '',
    barrio: '',
    piso: '',
    depto: '',
    CP: ''
  }

  const [direccion, setDireccion] = useState(initialState)

  const handleChange = e => {
    const { name, value } = e.target;
    setDireccion({
      ...direccion,
      [name]: value
    })
  }



  ///////////////

  const dispatch = useDispatch()

  const sendDireccionToDB = ({ direccion, idOrderUser }) => {
    dispatch(actionSendDirectionToDB({ direccion, idOrderUser }))
  }

  return (
    <div className='directionContainer'>
      <button className='closeButton' onClick={closeModalDireccion}>x</button>
      <div className='shipData'>
        <div className='labelInput'>
          <h3 for="exampleProvincia" className='labelAddress'>PROVINCIA *</h3>
          <input
            className='addressinput'
            type="text"
            name="provincia"
            id="exampleProvincia"
            placeholder="Provincia"
            onChange={handleChange}
          />
        </div>
        <div className='labelInput'>
          <h3 for="exampleCiudad" className='labelAddress'>CIUDAD *</h3>
          <input
            className='addressinput'
            type="text"
            name="ciudad"
            id="exampleCiudad"
            placeholder="Ciudad"
            onChange={handleChange}
          />
        </div>
      </div>

      <div className='shipData'>
        <div className='labelInput'>
          <h3 for="exampleCalle" className='labelAddress'>CALLE *</h3>
          <input
            className='addressinput'
            type="text"
            name="calle"
            id="exampleCalle"
            placeholder="Calle"
            onChange={handleChange}
          />
        </div>
        <div className='labelInput'>
          <h3 for="exampleBarrio" className='labelAddress'>BARRIO *</h3>
          <input
            className='addressinput'
            type="text"
            name="barrio"
            id="exampleBarrio"
            placeholder="Barrio"
            onChange={handleChange}
          />
        </div>      </div>

      <div className='shipDataNum'>
        
      <div className='labelInputNum'>
          <h3 for="exampleNumeracion" className='labelAddress'>NÚMERO*</h3>
          <input
            className='addressinputNum'
            type="text"
            name="numeracion"
            id="exampleNumeracion"
            placeholder="Nº"
            onChange={handleChange}
          />
        </div>
        <div className='labelInputNum'>
          <h3 for="examplePiso" className='labelAddress'>PISO</h3>
          <input
            className='addressinputNum'
            type="text"
            name="piso"
            id="examplePiso"
            placeholder="Piso"
            onChange={handleChange}
          />
        </div>
        <div className='labelInputNum'>
          <h3 for="exampleDepto" className='labelAddress'>DEPARTAMENTO</h3>
          <input
            className='addressinputNum'
            type="text"
            name="depto"
            id="exampleDepto"
            placeholder="DPTO"
            onChange={handleChange}
          />
        </div>
        <div className='labelInputNum'>
          <h3 for="exampleCP" className='labelAddress'>CP *</h3>
          <input
            className='addressinputNum'
            type="text"
            name="CP"
            id="exampleCP"
            placeholder="CP"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className='buttonContainerA'>

      <button className='buttonAdress'
        onClick={e => {
          e.preventDefault();
          if (!direccion.provincia || !direccion.ciudad || !direccion.calle || !direccion.numeracion || !direccion.barrio || !direccion.CP) return window.alert('Datos Obligatorios Vacios')
          sendDireccionToDB({ direccion, idOrderUser });
          closeModalDireccion();
          setMostrarPrecioEnvio(true);
          setPrecioEnvio(500);
        }
        }>
        CONFIRMAR ENVÍO</button>

      </div>
      
    </div>
  );
};

export default ModalDireccion;
