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
    contraseña: "",
    nuevaContraseña: "",
  })

  const handleInputChange = (event) => {
    setDatos({
      ...datos,
      [event.target.name]: event.target.value,
      [event.target.email]: event.target.value,
      [event.target.nuevaContraseña]: event.target.value,
      [event.target.nuevaContraseña1]: event.target.value,
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
              Cambiar Contraseña
               <input className='inputDataUser'
                placeholder='Ingrese nueva contraseña'
                type="password"
                name='nuevaContraseña'
                value={name}
                onChange={handleInputChange} />
            </label>
            <label className='editDataUserName'>
               <input className='inputDataUser'
                placeholder='Repita nueva contraseña'
                type="password"
                name='nuevaContraseña1'
                value={name}
                onChange={handleInputChange} />
            </label>


            <label className='editDataUserName'>
              Ingrese su contraseña actual para confirmar
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
                if(!datos.contraseña) return window.alert("Debe colocar su contraseña actual para confirmar los cambios")
                if(datos.nuevaContraseña){
                  if (datos.nuevaContraseña !== datos.nuevaContraseña1) return window.alert("Las contraseñas nuevas no coinciden")
                }
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
