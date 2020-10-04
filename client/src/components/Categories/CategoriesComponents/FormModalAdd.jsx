import React, { useState } from "react";
import {
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";
import './FormModalAdd.css'

const FormModalAdd = (props) => {
    const { addCategory, modalAddViewFalse, categories } = props;
    const [category, setCategory] = useState(categories)
    const handleChange = event => {
        const { name, value } = event.target
        setCategory({ ...category, [name]: value })
    }
    return (
        <div className='addCategory'>
            <ModalHeader>
                <div><h3>Add Category</h3></div>
            </ModalHeader>
            <ModalBody className='addCatBody'>
                <FormGroup className='categoryName'>
                    <label className="categoryDetail"> Nombre de la categoría</label>
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
                        modalAddViewFalse()
                    }}
                > Submit </Button>
                <Button className='buttonCat' onClick={e => modalAddViewFalse()}>Exit</Button>
            </ModalFooter>
        </div>
    )
}

export default FormModalAdd;