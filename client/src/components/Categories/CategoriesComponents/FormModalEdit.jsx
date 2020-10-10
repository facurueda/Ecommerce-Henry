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
    <div className='addCategory'>
      <ModalHeader>
        <div>
          <h3>Editar Categoria</h3>
        </div>
      </ModalHeader>
      <ModalBody className='addCatBody'>
                <FormGroup className='categoryName'>
          <label className="categoryDetail">Nombre:</label>
          <input
            className="inputName" 
            name="name"
            type="text"
            onChange={handleChange}
            value={category.name}
          />
        </FormGroup>
        <FormGroup className='categoryDescription'>
          <label className="categoryDetail">DESCRIPCION:</label>
          <input
            className="inputName" 
            name="description"
            type="text"
            onChange={handleChange}
            value={category.description}
          />
        </FormGroup>
      </ModalBody>
      <ModalFooter className='footerButtons'>
                <Button className='buttonCat'
          onClick={(event) => {
            event.preventDefault();
            if (!category.name || !category.description) return window.alert('Empty Inputs')
            if (categories.find(
              categories => categories.name.toUpperCase() === category.name.toUpperCase()
            )) return window.alert('This name already been used')
            updateCategory(category);
            modalEditViewFalse();
          }}
        > AGREGAR
        </Button>
        <Button className='buttonCat' onClick={(e) => modalEditViewFalse()}>
          SALIR
        </Button>
      </ModalFooter>
    </div>
  );
};

export default FormModalEdit;
