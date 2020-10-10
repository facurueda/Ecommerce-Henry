import React, { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Button, Form, FormGroup, Label, Input, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "reactstrap";
import { actionSendDirectionToDB } from "../../redux/ordersActions";
import { actionGetAllDirections } from "../../redux/usersActions";
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import './ModalDireccion.css'


const ModalDireccion = (props) => {

      toast.configure()

      const { closeModalDireccion, setMostrarPrecioEnvio, setPrecioEnvio, mostrarBotonCancelar, idOrderUser } = props;

      const dispatch = useDispatch()

      useEffect(() => {
            dispatch(actionGetAllDirections())
      }, [])


      ////////////////////////////////////////////////// State and functions to setDirections for send DB //////////////////////////////////////////////////

      const initialState = {
            referencia: '',
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

      const sendDireccionToDB = ({ direccion, idOrderUser }) => {
            dispatch(actionSendDirectionToDB({ direccion, idOrderUser }))
      }

      ////////////////////////////////////////////////// --- //////////////////////////////////////////////////

      const directionsUser = useSelector(state => state.usersReducer.direcciones)

      const setDirectionsSave = dir => {
            console.log('DIR', dir)
            const { referencia, provincia, ciudad, calle, numeracion, barrio, piso, depto, CP } = dir;
            setDireccion({
                  ...direccion,
                  referencia,
                  provincia,
                  ciudad,
                  calle,
                  numeracion,
                  barrio,
                  piso,
                  depto,
                  CP
            })
      }

      const [dropdownOpen, setDropdownOpen] = useState(false);
      const toggle = () => setDropdownOpen(prevState => !prevState);

      ////////////////////////////////////////////////// Para habilitar edicion de direccion //////////////////////////////////////////////////

      const [habilitarEdicion, setHabilitarEdicion] = useState(true)

      const functionHabilitarEdicion = () => {
            toast("Puede modificar los datos", {
                  position: "top-center",
                  autoClose: 1500,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
            setHabilitarEdicion(false)
      }


      return (

            directionsUser.length === 0 ? (
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
                        <Button  className='buttonAdress'
                              onClick={e => {
                                    e.preventDefault();
                                    if (!direccion.referencia || !direccion.provincia || !direccion.ciudad || !direccion.calle || !direccion.numeracion || !direccion.barrio || !direccion.CP) return toast.error("Datos obligatorios vacios", {
                                          position: "top-center",
                                          autoClose: 1500,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                    });

                                    toast("Envío confirmado", {
                                          position: "top-center",
                                          autoClose: 1500,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          pauseOnHover: true,
                                          draggable: true,
                                          progress: undefined,
                                    });
                                    sendDireccionToDB({ direccion, idOrderUser });
                                    closeModalDireccion();
                                    setMostrarPrecioEnvio(true);
                                    setPrecioEnvio(500);
                                    mostrarBotonCancelar()
                              }
                              }>
                              Confirmar Envío</Button>
                      </div>
                  </div>
            ) : (
                        <Form>
                              <FormGroup className="categoriesContainer">
                                    <label className='productDetail'>Selecciona una direccion: </label>
                                    <Dropdown className='dropdownCat' isOpen={dropdownOpen} toggle={toggle}>

                                          <DropdownToggle className='dropdownCat' caret>
                                                {direccion.referencia.length === 0 ?
                                                      ('Selecciona una direccion')
                                                      :
                                                      (direccion.referencia)}
                                          </DropdownToggle>
                                          <DropdownMenu className='dropdownCat' >
                                                {directionsUser.map(direccion => {
                                                      return (
                                                            <DropdownItem name='direcciones' value={direccion.referencia} onClick={e => setDirectionsSave(direccion)}>{direccion.referencia}</DropdownItem>
                                                      )
                                                })}
                                          </DropdownMenu>
                                    </Dropdown>
                              </FormGroup>

                              {direccion.referencia.length === 0 ? (
                                    <div>VACIO</div>
                              )
                                    :
                                    (
                                          <Form
                                                style={{ backgroundColor: "white", padding: "50px", borderRadius: "10%" }}
                                          >
                                                <Row form>
                                                      <Col md={6}>
                                                            <FormGroup>
                                                                  <Label for="exampleProvincia">Provincia</Label>
                                                                  <Input
                                                                        type="text"
                                                                        name="provincia"
                                                                        id="exampleProvincia"
                                                                        placeholder="Ej: Córdoba"
                                                                        value={direccion.provincia}
                                                                        onChange={handleChange}
                                                                        disabled={habilitarEdicion}
                                                                  />
                                                            </FormGroup>
                                                      </Col>
                                                      <Col md={6}>
                                                            <FormGroup>
                                                                  <Label for="exampleCiudad">Ciudad</Label>
                                                                  <Input
                                                                        type="text"
                                                                        name="ciudad"
                                                                        id="exampleCiudad"
                                                                        placeholder="Ej: Carlos Paz"
                                                                        value={direccion.ciudad}
                                                                        onChange={handleChange}
                                                                        disabled={habilitarEdicion}
                                                                  />
                                                            </FormGroup>
                                                      </Col>
                                                </Row>

                                                <Row form>
                                                      <Col md={8}>
                                                            <FormGroup>
                                                                  <Label for="exampleCalle">Calle</Label>
                                                                  <Input
                                                                        type="text"
                                                                        name="calle"
                                                                        id="exampleCalle"
                                                                        placeholder="Ej: Santa Rosa"
                                                                        value={direccion.calle}
                                                                        onChange={handleChange}
                                                                        disabled={habilitarEdicion}
                                                                  />
                                                            </FormGroup>
                                                      </Col>
                                                      <Col md={4}>
                                                            <FormGroup>
                                                                  <Label for="exampleNumeracion">Numeracion</Label>
                                                                  <Input
                                                                        type="text"
                                                                        name="numeracion"
                                                                        id="exampleNumeracion"
                                                                        placeholder="Ej: 1088"
                                                                        value={direccion.numeracion}
                                                                        onChange={handleChange}
                                                                        disabled={habilitarEdicion}
                                                                  />
                                                            </FormGroup>
                                                      </Col>
                                                </Row>

                                                <FormGroup>
                                                      <Label for="exampleBarrio">Barrio</Label>
                                                      <Input
                                                            type="text"
                                                            name="barrio"
                                                            id="exampleBarrio"
                                                            placeholder="Ej: Barrio Alberdi"
                                                            value={direccion.barrio}
                                                            onChange={handleChange}
                                                            disabled={habilitarEdicion}
                                                      />
                                                </FormGroup>
                                                <Row form>
                                                      <Col md={4}>
                                                            <FormGroup>
                                                                  <Label for="examplePiso">Piso</Label>
                                                                  <Input
                                                                        type="text"
                                                                        name="piso"
                                                                        id="examplePiso"
                                                                        placeholder="Ej: 4°"
                                                                        value={direccion.piso}
                                                                        onChange={handleChange}
                                                                        disabled={habilitarEdicion}
                                                                  />
                                                            </FormGroup>
                                                      </Col>
                                                      <Col md={4}>
                                                            <FormGroup>
                                                                  <Label for="exampleDepto">Depto</Label>
                                                                  <Input
                                                                        type="text"
                                                                        name="depto"
                                                                        id="exampleDepto"
                                                                        placeholder="Ej: B"
                                                                        value={direccion.depto}
                                                                        onChange={handleChange}
                                                                        disabled={habilitarEdicion}
                                                                  />
                                                            </FormGroup>
                                                      </Col>
                                                      <Col md={4}>
                                                            <FormGroup>
                                                                  <Label for="exampleCP">CP</Label>
                                                                  <Input
                                                                        type="text"
                                                                        name="CP"
                                                                        id="exampleCP"
                                                                        placeholder="Ej: 5000"
                                                                        value={direccion.CP}
                                                                        onChange={handleChange}
                                                                        disabled={habilitarEdicion}
                                                                  />
                                                            </FormGroup>
                                                      </Col>
                                                </Row>
                                          </Form>
                                    )}
                              {direccion.referencia.length === 0 || habilitarEdicion === false ?
                                    (
                                          ''
                                    ) : (

                                          habilitarEdicion === false ? (
                                                ''
                                          )
                                                :
                                                (
                                                      <div>
                                                            <Button onClick={e => { functionHabilitarEdicion() }}>
                                                                  ¿La direccion es erronea?
                                          </Button>

                                                      </div>

                                                )

                                    )}
                              {habilitarEdicion === false ? (
                                    <Button
                                          onClick={e => {
                                                e.preventDefault();
                                                toast("Direccion cambiada y envio aceptado", {
                                                      position: "top-center",
                                                      autoClose: 2500,
                                                      hideProgressBar: false,
                                                      closeOnClick: true,
                                                      pauseOnHover: true,
                                                      draggable: true,
                                                      progress: undefined,
                                                    });
                                                sendDireccionToDB({ direccion, idOrderUser });
                                                closeModalDireccion();
                                                setMostrarPrecioEnvio(true);
                                                setPrecioEnvio(500);
                                                mostrarBotonCancelar()

                                          }
                                          }>
                                          Aceptar cambios y confirmar envio</Button>
                              ) : (
                                          <Button
                                                onClick={e => {
                                                      e.preventDefault();
                                                      toast("Envío confirmado", {
                                                            position: "top-center",
                                                            autoClose: 2500,
                                                            hideProgressBar: false,
                                                            closeOnClick: true,
                                                            pauseOnHover: true,
                                                            draggable: true,
                                                            progress: undefined,
                                                          });
                                                      sendDireccionToDB({ direccion, idOrderUser });
                                                      closeModalDireccion();
                                                      setMostrarPrecioEnvio(true);
                                                      setPrecioEnvio(500);
                                                      mostrarBotonCancelar()
                                                }
                                                }>
                                                Confirmar Envío</Button>
                                    )}
                        </Form >
                  )


      );
};

export default ModalDireccion;
