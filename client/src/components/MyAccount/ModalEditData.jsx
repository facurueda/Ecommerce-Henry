import React, { useState } from "react";
import { ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';

import { useDispatch } from "react-redux";
import { actionDataUpdate } from "../../redux/usersActions";

import './ModalEdit.css'




const ModalEditData = (props) => {

  const dispatch = useDispatch();
  const { modalEditViewFalse, name, email } = props;
  const [datos, setDatos] = useState({
    name,
    email,
    contraseña: ""
  })

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
      [event.target.email]: event.target.value,
      [event.target.contraseña]: event.target.value
    })
  }

  return (
    <div className='editDataUserCont'>
      <button className="closeButton" onClick={modalEditViewFalse}>
        <i class="fas fa-times"></i>
      </button>
      <ModalHeader className='editHeaderCont'>
        <div className='titleEditData'>Ingresa tus datos nuevos</div>
      </ModalHeader>
      <ModalBody className='editBodyCont'>
        <FormGroup className='editDataUser' >
          <div className='inputContEditUser'>
            <label className='editDataUserName'>
              Nombre
          <input className='inputDataUser'
          placeholder='nombre'
                type="text"
                name='name'
                value={name}
                onChange={handleInputChange} />
            </label>
            <label className='editDataUserName'>
              Email
          <input className='inputDataUser'
          placeholder='email'
                type="text"
                name="email"
                value={email}
                onChange={handleInputChange} />
            </label>
            <label className='editDataUserName'>
              Contraseña
          <input className='inputDataUser'
                type="password"
                placeholder='contraseña'
                name="contraseña"
                onChange={handleInputChange}
              />
            </label>
            </div>
            <div className='buttonContEditUser'>
              <button className='buttonAdd'
                onClick={event => {
                  event.preventDefault();
                  if (!datos.name || !datos.email) return window.alert(" Campos Vacios")
                  dispatch(actionDataUpdate(datos));
                  modalEditViewFalse()
                }}
              >Confirmar</button>
            </div>
        </FormGroup>
      </ModalBody>

      <ModalFooter className='buttonContEditData'>
        <button className='buttonAdd'
          onClick={event => {
            event.preventDefault();
            modalEditViewFalse()
          }}
        > Cancelar </button>
      </ModalFooter>

    </div>
  );
}



export default ModalEditData;
