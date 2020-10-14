import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import { actionPostCategory } from "../../../redux/categoriesActions";
import './FormModalAdd.css'

const FormModalAdd = (props) => {
    const { modalAddViewFalse } = props;
    const categories = useSelector(store => store.categoriesReducer.categories)
    const dispatch = useDispatch()
    const [category, setCategory] = useState()
    const handleChange = event => {
        const { name, value } = event.target
        setCategory({ ...category, [name]: value })
    }
    const addCategory = (category) => {
        dispatch(actionPostCategory(category))
        modalAddViewFalse()
    }
    return (
        <div className='addCategory'>
            <ModalHeader>
                <div><h3>AGREGAR CATEGORIAS</h3></div>
            </ModalHeader>
            <ModalBody className='addCatBody'>
                <FormGroup className='categoryName'>
                    <label className="categoryDetail"> Nombre</label>
                    <input className="inputName" name="name" type="text" onChange={handleChange}/>
                </FormGroup>
                <FormGroup className='categoryDescription'>
                    <label className="categoryDetail">Descripción</label>
                    <input className="inputName" name="description" type="text" onChange={handleChange}/>
                </FormGroup>
            </ModalBody>
            <ModalFooter className='footerButtons'>
                <Button className='buttonCat'
                    onClick={event => {
                        event.preventDefault()
                        if (!category.name || !category.description) return window.alert('Empty Inputs')
                        if (categories.find(
                            categories => categories.name.toUpperCase() === category.name.toUpperCase()
                        )) return window.alert('This name already been used')
                        addCategory(category)
                    }}
                > AGREGAR </Button>
                <Button className='buttonCat' onClick={e => modalAddViewFalse()}>SALIR</Button>
            </ModalFooter>
        </div>
    )
}

export default FormModalAdd;