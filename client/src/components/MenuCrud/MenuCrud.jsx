import React, { useState,useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css"; 
import {   Button,   Container,   Modal, } from "reactstrap";
import ProductTable from './MenuCrudComponents/ProductTable';
import ModalAddProduct from './MenuCrudComponents/ModalAddProduct';
import ModalEditProduct from './MenuCrudComponents/ModalEditProduct';
import { actionUpdateProduct,actionGetProducts,actionDeleteProduct,actionPostProduct } from "../../redux/productsActions";
import { actionGetCategories } from "../../redux/categoriesActions";
import SelectImage from '../SelectImage/SelectImage'

import { connect, useSelector } from 'react-redux';


const MenuCrud = (props) => {
useEffect(() => {
    props.actionGetProducts()
},[])
useEffect(() => {
    props.actionGetCategories()
},[])

// const { products,categories } = props


  //Estados
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const [currentProduct, setCurrentProduct] = useState({})

  //Funciones
  const modalAddView = () => setModalAdd(!modalAdd);
  const modalEditView = () => setModalEdit(!modalEdit);
  const modalCloseAdd = () => setModalAdd(false);
  const modalCloseEdit = () => setModalEdit(false);
  const deleteProduct = async (id) => {
    await props.actionDeleteProduct(id)
    await window.location.reload()
  }
  const addProduct = async(product) => {
    await props.actionPostProduct(product)
    await window.location.reload();
  }
  const updateProduct = async (product) => {
    await props.actionUpdateProduct(product)
    await window.location.reload();
  }
  const editProduct = (product) => {
    setCurrentProduct(product);
    modalEditView();
  }

  const products = useSelector(state => state.productsReducer.products)
  const categories = useSelector(state => state.categoriesReducer.categories)

  return (
    <div>
      <Container>
        <br/>
          <Button
          style={{
            float:'right',
            height: "50px", width: "150px", borderRadius:"10px",
            margin:"15px"
          }}
          color='success' onClick = {e => modalAddView()}>Add product</Button>
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
        categories={categories}
        />
      </Modal>
      <Modal isOpen = {modalEdit}>
        <ModalEditProduct
        products = {products}
        currentProducts = {currentProduct}
        updateProduct = {updateProduct}
        modalCloseEdit = {modalCloseEdit}
        categories={categories}
        />
      </Modal>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return {
    actionGetProducts: () => {
      dispatch(actionGetProducts())
    },
    actionDeleteProduct: (id) => {
      dispatch(actionDeleteProduct(id))
    },
    actionGetCategories: () => {
      dispatch(actionGetCategories())
    },
    actionPostProduct: (product) => {
      dispatch(actionPostProduct(product))
    },
    actionUpdateProduct: (product) => {
      dispatch(actionUpdateProduct(product))
    }
  }
}

export default connect(() => {},mapDispatchToProps)(MenuCrud);