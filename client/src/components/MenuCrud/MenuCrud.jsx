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
      images: ['http://www......'],
      categories:'Bastones'
    }, 
    {
      id: new Date().getTime() +1,
      name: 'Facu',
      description: 'No come?',
      price: '132123',
      stock: '233',
      images: ['http://www....'],
      categories: [ 'Termo', 'Verde' ]
    }
  ]

  const initialState = { 
      id: new Date().getTime(),
      name: '',
      description: '',
      price: '',
      stock: '',
      images: '',
      categories: []
  } 

  // SE AGREGA CATEGORIAS

  const totalCat = [{ name: 'Buzos' }, { name: 'Remeras' }, { name: 'Pantalones' }]

  //Estados
  // const [menuState, setMenuState] = useState(menuData);
  // const [currentMenuState, setCurrentMenuState] = useState(initialState);
  
  const [products, setProducts] = useState(menuData)
  const [currentProducts, setCurrentProducts] = useState(initialState)

  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);

  //Funciones
  const modalAddView = () => setModalAdd(!modalAdd);
  const modalEditView = () => setModalEdit(!modalEdit);
  const modalCloseAdd = () => setModalAdd(false);
  const modalCloseEdit = () => setModalEdit(false);  
  
  const deleteProduct = id => {
    setProducts(
      products.filter(product => product.id !== id)
    )
  }
  const editProduct = (product) => {
    setCurrentProducts({
        id: product.id,
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        images: product.images,
        categories: product.categories
    });
    modalEditView();
  }
  const addProduct = (product) => {
    product.id = new Date().getTime();
    setProducts([...products, product]);
  }
  const updateProduct = (id, updateProduct) => {
    setProducts(products.map(product => (
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
        products = {products} 
        deleteProduct = {deleteProduct} 
        editProduct = {editProduct} 
        />
      </Container>
      <Modal isOpen = {modalAdd}>
        <ModalAddProduct
        products = {products} 
        addProduct = {addProduct}
        modalCloseAdd = {modalCloseAdd}
        totalCat={totalCat}
        />
      </Modal>
      <Modal isOpen = {modalEdit}>
        <ModalEditProduct
        products = {products} 
        currentProducts = {currentProducts}
        updateProduct = {updateProduct}
        modalCloseEdit = {modalCloseEdit}
        totalCat={totalCat}
        />
      </Modal>
    </div>
  )
}

export default MenuCrud;