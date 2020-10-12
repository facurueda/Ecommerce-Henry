import React, { useState, useRef} from "react";
import { Button, ModalHeader, ModalBody, ModalFooter, FormGroup } from 'reactstrap';
// import { useForm } from "react-hook-form";
import { useReducer } from "react";
import { useDispatch } from "react-redux";
import { actionDataUpdate } from "../../redux/usersActions";
import SelectImage from '../SelectImage/SelectImage'




const ModalEditData = (props) => {     

  const dispatch = useDispatch();
    
  const {modalEditViewFalse,user,name,email} = props;  
  // const {/* watch, */ register/* , handleSubmit,errors */ } = useForm({
  //    nativeValidation: true
  // });  


    const [datos, setDatos] = useState({    
      name,
      email,
      contraseña: ""
    })

    
    

    const handleInputChange = (event) => {      
      setDatos({
        ...datos,
        [event.target.name] : event.target.value,
        [event.target.email] : event.target.value,
        [event.target.contraseña] : event.target.value
      })
    }

   
    

    return (
      
      <div className="modalContent">
          <ModalHeader>
         <div><h3>Ingresa tus nuevos datos</h3></div>
          </ModalHeader>
          <ModalBody>
          <FormGroup >
         <form > 
    
         <label>
          Nuevo Nombre:
          <input 
          type="text"
          name= 'name'
          value= {name}
          className= "form-control"
          onChange= {handleInputChange}/>
         </label>
         <label>
          Nuevo  Email     :
          <input 
          type="text"
          name= "email"
          className= "form-control"
          value= {email} 
          onChange= {handleInputChange}/>
        </label>
        <label>
          Ingresa tu contraseña     :
          <input 
          type="password"
          name= "contraseña"
             
          className = "form-control"
          onChange = {handleInputChange}
/*           ref = {register({
            validate: value => 
           "The password doen´t match"}
          )}  */
        /> 

        </label>
         <div> 
         <Button ClassName='Confirm'  
         onClick={event => {
          event.preventDefault();

           if (!datos.name || !datos.email)   return window.alert(" Campos Vacios") 
           dispatch(actionDataUpdate(datos));
           modalEditViewFalse()
         }} 
        > 
        Confirmar</Button>   
                </div> 
         </form> 
        </FormGroup>        
        </ModalBody>

        <ModalFooter>
        <Button className='Cancelar'
                    onClick={event => {
                        event.preventDefault();
                        modalEditViewFalse()
                    }}
                > Cancelar </Button>
                </ModalFooter>

        </div>
    );
  }



  export default ModalEditData;
