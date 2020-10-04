import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Modal, } from "reactstrap";
import ProductTable from './MenuCrudComponents/ProductTable';
import ModalAddProduct from './MenuCrudComponents/ModalAddProduct';
import ModalEditProduct from './MenuCrudComponents/ModalEditProduct';
import { actionUpdateProduct, actionGetProducts, actionDeleteProduct, actionPostProduct } from "../../redux/productsActions";
import { actionGetCategories } from "../../redux/categoriesActions";
import { connect, useDispatch, useSelector } from 'react-redux';
import './MenuCrud.css'

const MenuCrud = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetProducts())
    dispatch(actionGetCategories())
  }, [])


  //Estados
  const [modalAdd, setModalAdd] = useState(false);
  const [modalEdit, setModalEdit] = useState(false);
  const currentProduct = useSelector(store => store.productsReducer.product)

  //Funciones
  const modalAddView = () => setModalAdd(!modalAdd);
  const modalEditView = () => setModalEdit(!modalEdit);
  const modalCloseAdd = () => setModalAdd(false);
  const modalCloseEdit = () => setModalEdit(false);
  const deleteProduct = async (id) => {
    dispatch(actionDeleteProduct(id))
    await window.location.reload()
  }
  const addProduct = async (product) => {
    await dispatch(actionPostProduct(product))
    await window.location.reload();
  }

  const products = useSelector(state => state.productsReducer.products)
  const categories = useSelector(state => state.categoriesReducer.categories)

  return (
    <div>
      <Container>
        <br />
        <button id="buttonAdd" className='buttonLoginAndRegister' onClick={e => modalAddView()}> + </button>
        <br />
        <br />
        <ProductTable
          products={products}
          deleteProduct={deleteProduct}
          editProduct={modalEditView}
          categories={categories}
        />
      </Container>
      <Modal isOpen={modalAdd}>
        <ModalAddProduct id='modalAdd'
          products={products}
          addProduct={addProduct}
          modalCloseAdd={modalCloseAdd}
          categories={categories}
        />
      </Modal>
      <Modal isOpen={modalEdit}>
        <ModalEditProduct
          modalCloseEdit={modalCloseEdit}
        />
      </Modal>
    </div>
  )
}


export default MenuCrud;