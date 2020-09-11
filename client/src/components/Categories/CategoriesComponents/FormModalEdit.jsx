import React, { useState } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";
import './FormModalEdit.css'

const FormModalEdit = (props) => {
  const { currentCategory, modalEditViewFalse, updateCategory, categories } = props;

  const [category, setCategory] = useState(currentCategory);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCategory({ ...category, [name]: value });
  };

  return (
    <div className= 'editCategory'>
      <ModalHeader>
        <div>
          <h3>Edit Category</h3>
        </div>
      </ModalHeader>

      <ModalBody>
        <FormGroup>
          <label>Category Name:</label>
          <input
            className="form-control"
            name="name"
            type="text"
            onChange={handleChange}
            value={category.name}
          />
        </FormGroup>

        <FormGroup>
          <label>Description:</label>
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
        <Button
          className='submitButton' 
          onClick={(event) => {
            event.preventDefault();
            if (!category.name || !category.description) return window.alert('Empty Inputs')
            if(categories.find(categories => categories.name.toUpperCase() === category.name.toUpperCase())) return window.alert('This name already been used')
            updateCategory(category);
            modalEditViewFalse();
          }}
        >
          Submit{" "}
        </Button>
        <Button className='exitButton' onClick={(e) => modalEditViewFalse()}>
          Exit
        </Button>
      </ModalFooter>
    </div>
  );
};

export default FormModalEdit;
