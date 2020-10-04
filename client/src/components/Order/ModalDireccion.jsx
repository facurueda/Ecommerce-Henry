import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Col, Row, Button, Form, FormGroup, Label, Input } from "reactstrap";
import { actionSendDirectionToDB } from "../../redux/ordersActions";

const ModalDireccion = (props) => {

  const { closeModalDireccion, setMostrarPrecioEnvio, setPrecioEnvio, mostrarBotonCancelar, idOrderUser } = props;

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
    const {name, value} = e.target;
    setDireccion({
      ...direccion,
      [name]: value
    })
  }



  ///////////////

  const dispatch = useDispatch()

  const sendDireccionToDB = ({direccion, idOrderUser}) => {
    dispatch(actionSendDirectionToDB({direccion, idOrderUser}))
  }

  return (
    <Form
    style={{ backgroundColor: "white", padding: "50px", borderRadius: "10%" }}
    >
    <button style={{float:'right'}} onClick={e => {mostrarBotonCancelar()}}>x</button>
      <Row form>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleProvincia">Provincia *</Label>
            <Input
              type="text"
              name="provincia"
              id="exampleProvincia"
              placeholder="Ej: Córdoba"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={6}>
          <FormGroup>
            <Label for="exampleCiudad">Ciudad *</Label>
            <Input
              type="text"
              name="ciudad"
              id="exampleCiudad"
              placeholder="Ej: Carlos Paz"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <Row form>
        <Col md={8}>
          <FormGroup>
            <Label for="exampleCalle">Calle *</Label>
            <Input
              type="text"
              name="calle"
              id="exampleCalle"
              placeholder="Ej: Santa Rosa"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleNumeracion">Numeracion *</Label>
            <Input
              type="text"
              name="numeracion"
              id="exampleNumeracion"
              placeholder="Ej: 1088"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>

      <FormGroup>
        <Label for="exampleBarrio">Barrio *</Label>
        <Input
          type="text"
          name="barrio"
          id="exampleBarrio"
          placeholder="Ej: Barrio Alberdi"
          onChange={handleChange}
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
              onChange={handleChange}
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
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
        <Col md={4}>
          <FormGroup>
            <Label for="exampleCP">CP *</Label>
            <Input
              type="text"
              name="CP"
              id="exampleCP"
              placeholder="Ej: 5000"
              onChange={handleChange}
            />
          </FormGroup>
        </Col>
      </Row>
      <Button
        onClick={ e => { 
          e.preventDefault();
          if (!direccion.provincia || !direccion.ciudad || !direccion.calle || !direccion.numeracion || !direccion.barrio || !direccion.CP) return window.alert('Datos Obligatorios Vacios')
          sendDireccionToDB({direccion, idOrderUser});
          closeModalDireccion(); 
          setMostrarPrecioEnvio(true); 
          setPrecioEnvio(500); 
          mostrarBotonCancelar()}
      }>
        Confirmar Envío</Button>
    </Form>
  );
};

export default ModalDireccion;
