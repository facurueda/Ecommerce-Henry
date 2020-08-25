import React, { useState } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"; 
import {   Button,   Container,   Modal, } from "reactstrap";
import ProductTable from './MenuCrudComponents/ProductTable';
import ModalAddProduct from './MenuCrudComponents/ModalAddProduct';
import ModalEditProduct from './MenuCrudComponents/ModalEditProduct';

const MenuCrud = () => {
  
  const menuData = [ 
    { 
      id: new Date().getTime(),
      name: 'Clara',
      description: 'Que hace?',
      price: 111,
      stock: 23,
      images: ['http://www......']
    }, 
    {
      id: new Date().getTime(),
      name: 'Facu',
      description: 'No come?',
      price: '132123',
      stock: '233',
      images: ['http://www....']
    }
  ]

  const initialState = { 
      id: new Date().getTime(),
      name: '',
      description: '',
      price: '',
      stock: '',
      images: []
  } 

  //Estados
  const [menuState, setMenuState] = useState(menuData);
  const [currentMenuState, setCurrentMenuState] = useState(initialState);
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  //Funciones
  const modalAddView = () => setModalAdd(!modalAdd);
  const modalEditView = () => setModalEdit(!modalEdit);
  const modalCloseAdd = () => setModalAdd(false);
  const modalCloseEdit = () => setModalEdit(false);  
  
  const deleteProduct = id => {
    setMenuState(
      menuState.filter(product => product.id !== id)
    )
  }
  const editProduct = (product) => {
    setCurrentMenuState({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images
    });
    modalEditView();
  }
  const addProduct = (product) => {
    product.id = new Date().getTime();
    setMenuState([...menuState, product]);
  }
  const updateProduct = (id, updateProduct) => {
    setMenuState(menuState.map(product => (
      (product.id === id ? updateProduct : product)
    )))
  }

  return (
    <div>
      <Container>
        <br/>
        <Button color='success' onClick = {e => modalAddView()}>Add product</Button>
        <br/>
        <br/>
        <ProductTable 
        menuState = {menuState} 
        deleteProduct = {deleteProduct} 
        editProduct = {editProduct} 
        />
      </Container>
      <Modal isOpen = {modalAdd}>
        <ModalAddProduct
        menuState = {menuState}
        addProduct = {addProduct}
        modalCloseAdd = {modalCloseAdd}
        />
      </Modal>
      <Modal isOpen = {modalEdit}>
        <ModalEditProduct
        menuState = {menuState}
        currentMenuState = {currentMenuState}
        updateProduct = {updateProduct}
        modalCloseEdit = {modalCloseEdit}
        />
      </Modal>
    </div>
  )
}

export default MenuCrud;