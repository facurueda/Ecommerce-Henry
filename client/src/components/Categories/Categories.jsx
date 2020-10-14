import React, { useState, useEffect } from "react";
import CategoryTable from './CategoriesComponents/CategoryTable'
import FormModalAdd from './CategoriesComponents/FormModalAdd'
import FormModalEdit from './CategoriesComponents/FormModalEdit'
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Container, Modal, } from "reactstrap";
import './Categories.css'
import { connect, useDispatch, useSelector } from 'react-redux'
import { actionGetCategories, actionPostCategory, actionUpdateCategory, actionDeleteCategory } from "../../redux/categoriesActions";
import MenuUser from "../MyAccount/MenuUser";

const Categories = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(actionGetCategories())
  }, [])

  const categories = useSelector(store => store.categoriesReducer.categories)
  const [currentCategory, setCurrentCategory] = useState()
  const [modalAdd, modalInsert] = useState(false)
  const modalAddView = () => modalInsert(!modalAdd);
  const modalAddViewFalse = () => modalInsert(false);
  const [modalEdit, modalInsertEdit] = useState(false)
  const modalEditView = () => modalInsertEdit(!modalEdit);
  const modalEditViewFalse = () => modalInsertEdit(false);

  const deleteCategory = category => {
    dispatch(actionDeleteCategory(category))
  }
  const editCategory = category => {
    setCurrentCategory(category)
    modalEditView()
  }
  const addCategory = (category) => {
    dispatch(actionPostCategory(category))
  }
  const updateCategory = (updatedCategory) => {
    dispatch(actionUpdateCategory(updatedCategory))
  }
  
  return (
    <div className='myAccountContainer' >
    <MenuUser/>
    <div className='componentsContainer'>
      <Container>
        <button id="buttonAdd" className='buttonAdd' onClick={e => modalAddView()}> AGREGAR CATEGORIA </button>
        <br />
        <br />
        <CategoryTable 
        categories={categories} 
        deleteCategory={deleteCategory} 
        editCategory={editCategory} />
      </Container>
      <Modal isOpen={modalAdd}>
        <FormModalAdd 
        addCategory={addCategory} 
        modalAddViewFalse={modalAddViewFalse} 
        categories={categories} />
      </Modal>
      <Modal isOpen={modalEdit}>
        <FormModalEdit 
        currentCategory={currentCategory} 
        modalEditViewFalse={modalEditViewFalse} 
        updateCategory={updateCategory} 
        categories={categories} />
      </Modal>
    </div>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
  }
}



export default Categories;