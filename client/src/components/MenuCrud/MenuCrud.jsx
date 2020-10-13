import React, { useState, useEffect } from 'react'
import "bootstrap/dist/css/bootstrap.min.css";
import { Container, Modal, } from "reactstrap";
import ProductTable from './MenuCrudComponents/ProductTable';
import ModalAddProduct from './MenuCrudComponents/ModalAddProduct';
import ModalEditProduct from './MenuCrudComponents/ModalEditProduct';
import { actionGetProducts, actionPostProduct } from "../../redux/productsActions";
import { actionGetCategories } from "../../redux/categoriesActions";
import { useDispatch, useSelector } from 'react-redux';
import './MenuCrud.css'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'
import MenuUser from '../MyAccount/MenuUser';

const MenuCrud = () => {

  toast.configure()

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
  const modalCloseAdd = () => { setModalAdd(false); }
  const modalCloseEdit = () => setModalEdit(false);
  const addProduct = (product) => {
    dispatch(actionPostProduct(product))
    // window.location.reload();
    toast("Producto Agregado", {
      position: "top-center",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  }

  const products = useSelector(state => state.productsReducer.products)
  const categories = useSelector(state => state.categoriesReducer.categories)

  return (
    <div className='myAccountContainer' >
    <MenuUser/>
    <div className='menuCrudCont'>
      <Container>
        <br />
        <button id="buttonAdd" className='buttonAdd' onClick={e => modalAddView()}> AGREGAR PRODUCTO </button>
        <br />
        <br />
        <ProductTable
          products={products}
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
    </div>
  )
}


export default MenuCrud;