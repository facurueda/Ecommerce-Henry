import React, { useState } from "react";
import {
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
} from "reactstrap";

const FormModalAdd = (props) => {

    const {addCategory, modalAddViewFalse, categories} = props;


    const initialFormState = { id: null, name: '', description: '' }
    const [category, setCategory] = useState(initialFormState)

    const handleChange = event => {
        const { name, value } = event.target

        setCategory({ ...category, [name]: value })
    }

    return (
        <div>
            <ModalHeader>
                <div><h3>Add Category</h3></div>
            </ModalHeader>

            <ModalBody>
                <FormGroup >
                    <label>
                        Category Name:
                    </label>
                    <input
                        className="form-control"
                        name="name"
                        type="text"
                    onChange={handleChange}
                    value={category.name}
                    />
                </FormGroup>

                <FormGroup>
                    <label>
                        Description:
                        </label>
                    <input
                        className="form-control"
                        name="description"
                        type="text"
                    onChange={handleChange}
                    value={category.description}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color='primary'

                    onClick={event => {
                        event.preventDefault()
                        if (!category.name || !category.description) return window.alert('Faltan Datos')
                        if(categories.find(categories => categories.name.toUpperCase() === category.name.toUpperCase())) return window.alert('This name already been used')
                        addCategory(category)
                        setCategory(initialFormState)
                        modalAddViewFalse()
                    }}

                >
                Submit </Button>
                <Button color='danger' onClick={e => modalAddViewFalse()}>Exit</Button>
            </ModalFooter>
        </div>
    )
}

export default FormModalAdd;