import React, { useState, useEffect } from "react";
import CategoryTable from './CategoriesComponents/CategoryTable'
import FormModalAdd from './CategoriesComponents/FormModalAdd'
import FormModalEdit from './CategoriesComponents/FormModalEdit'
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Modal,
} from "reactstrap";
import { connect } from 'react-redux'
import { actionGetCategories, actionPostCategory, actionUpdateCategory, actionDeleteCategory } from "../../redux/categoriesActions";



const Categories = (props) => {

  useEffect(() => {
    if (props.categories.length < 1) {
      props.actionGetCategories()
    }
  })
  const [categories, setCategories] = useState(props.categories)
  const [currentCategory, setCurrentCategory] = useState()
  const [modalAdd, modalInsert] = useState(false)
  // Funcion para mostrar u ocultar el modal de agregar categoria
  const modalAddView = () => modalInsert(!modalAdd);
  const modalAddViewFalse = () => modalInsert(false);

  const [modalEdit, modalInsertEdit] = useState(false)




  // Funcion para mostrar u ocultar el modal de agregar categoria
  const modalEditView = () => modalInsertEdit(!modalEdit);
  const modalEditViewFalse = () => modalInsertEdit(false);




  // Funciones para Category Table:
  const deleteCategory = category => {
    props.actionDeleteCategory(category)
  }

  const editCategory = category => {
    setCurrentCategory(category)
    modalEditView()
  }




  // Funciones para el Modal ADD:
  const addCategory = async (category) => {
    await props.actionPostCategory(category);
    await window.location.reload(false)
  }




  // Update Category after edit
  const updateCategory = (updatedCategory) => {
    props.actionUpdateCategory(updatedCategory)
  }




  return (
    <div>
      <Container>
        <br />
        <Button color="success" onClick={e => modalAddView()}>Add Category</Button>
        <br />
        <br />
        <CategoryTable categories={props.categories} deleteCategory={deleteCategory} editCategory={editCategory} />
      </Container>


      <Modal isOpen={modalAdd}>
        <FormModalAdd addCategory={addCategory} modalAddViewFalse={modalAddViewFalse} categories={categories} />

      </Modal>


      <Modal isOpen={modalEdit}>
        <FormModalEdit currentCategory={currentCategory} modalEditViewFalse={modalEditViewFalse} updateCategory={updateCategory} categories={categories} />

      </Modal>
    </div>
  )
}

const mapStateToProps = (state) => {
  return {
    categories: state.categoriesReducer.categories,
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    actionGetCategories: () => {
      dispatch(actionGetCategories())
    },
    actionPostCategory: (category) => {
      dispatch(actionPostCategory(category))
    },
    actionUpdateCategory: (category) => {
      dispatch(actionUpdateCategory(category))
    },
    actionDeleteCategory: (category) => {
      dispatch(actionDeleteCategory(category))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);