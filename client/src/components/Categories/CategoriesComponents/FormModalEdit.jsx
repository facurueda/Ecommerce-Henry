import React, { useState } from "react";
import {
  Button,
  ModalHeader,
  ModalBody,
  FormGroup,
  ModalFooter,
} from "reactstrap";

const FormModalEdit = (props) => {
  const { currentCategory, modalEditViewFalse, updateCategory } = props;

  const [category, setCategory] = useState(currentCategory);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCategory({ ...category, [name]: value });
  };

  return (
    <div>
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
          color="primary"
          onClick={(event) => {
            event.preventDefault();
            if (!category.name || !category.description) return window.alert('Faltan Datos')
            updateCategory(category.id, category);
            modalEditViewFalse();
          }}
        >
          Submit{" "}
        </Button>
        <Button color="danger" onClick={(e) => modalEditViewFalse()}>
          Exit
        </Button>
      </ModalFooter>
    </div>
  );
};

export default FormModalEdit;
