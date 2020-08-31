import React, { useState } from "react";
import CategoryTable from './CategoriesComponents/CategoryTable'
import FormModalAdd from './CategoriesComponents/FormModalAdd'
import FormModalEdit from './CategoriesComponents/FormModalEdit'
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Button,
  Container,
  Modal,
} from "reactstrap";
import { connect, } from 'react-redux'
import fetchCategories from "../../redux/categoriesActions";

const categoryData = [
  { id: new Date().getTime(), name: 'Remeras', description: 'Remeritas cortas y largas' },
  { id: new Date().getTime() + 1, name: 'Pantalones', description: 'Pantalones largos y cortos' }
]
// Estado inicial que recibe de DB


const Categories = (props) => {


  const [categories, setCategories] = useState([])
  console.log(props)
  const getCategories = [];
  const postCategories = []

  // const initialFormState = { id: null, name: '', description: '' };
  // Estados

  // const [categories, setCategory] = useState(props.categories);
  // const [currentCategory, setCurrentCategory] = useState(initialFormState)
  const [currentCategory, setCurrentCategory] = useState()

  const [modalAdd, modalInsert] = useState(false)
  // Funcion para mostrar u ocultar el modal de agregar categoria
  const modalAddView = () => modalInsert(!modalAdd);
  const modalAddViewFalse = () => modalInsert(false);

  // -----------------------

  const [modalEdit, modalInsertEdit] = useState(false)
  // Funcion para mostrar u ocultar el modal de agregar categoria
  const modalEditView = () => modalInsertEdit(!modalEdit);
  const modalEditViewFalse = () => modalInsertEdit(false);

  // Funciones para Category Table

  const deleteCategory = id => {
    setCategories(categories.filter(category => category.id !== id))
  }

  const editCategory = category => {
    setCurrentCategory({ id: category.id, name: category.name, description: category.description })
    // PARA ABRIR EL MODAL DE EDIT
    modalEditView()
  }

  // Funciones para el Modal ADD PARAAA AGREGAAARR

  const addCategory = category => {
    // category.id = new Date().getTime()
    // setCategory([...categories, category])
    // props.postCategories(category)
  }


  // Update Category after edit
  const updateCategory = (id, updatedCategory) => {
    setCategories(categories.map(category => (category.id === id ? updatedCategory : category)))
  }



  return (
    <div>
      <Container>
        <br />
        <Button color="success" onClick={e => modalAddView()}>Add Category</Button>
        <br />
        <br />
        <CategoryTable categories={categories} deleteCategory={deleteCategory} editCategory={editCategory} />

        {/* ACA VA EL COMPONENTE CATEGORY TABLE */}
        {/* COMO PROPS SE LE ENVIA EL ESTADO -CATEGORIES-, FUNCION EDITAR Y FUNCION ELIMINAR */}
      </Container>


      <Modal isOpen={modalAdd}>
        {/* ACA VA EL COMPONENTE FORMMODAL-ADD QUE SE ABRE AL DARLECLICK EN ADD CATEGORY */}
        {/* COMO PROPS SE LE ENVIA LA FUNCION addCategory */}
        <FormModalAdd postCategories={addCategory} modalAddViewFalse={modalAddViewFalse} categories={categories} />

      </Modal>


      <Modal isOpen={modalEdit}>
        {/* ACA VA EL COMPONENTE FORMMODAL-EDIT QUE SE ABRE AL DARLECLICK EN EDIT CATEGORY */}
        <FormModalEdit currentCategory={currentCategory} modalEditViewFalse={modalEditViewFalse} updateCategory={updateCategory} categories={categories} />

      </Modal>
      <button onClick={() => {
        props.fetchCategories()
      }}>BOTON QUE HACE ESAS COSAS RARAS TEMPORALES</button>

    </div>
  )
}

const mapStateToProps = (store) => {
  return {
    categories: store.categories
  }
}
const mapDispatchToProps = (dispatch) => {
  return {
    fetchCategories: () => {
      dispatch(fetchCategories())
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
