import React, { useState } from "react"; 
import {   
    Button,
    ModalHeader,
    ModalBody,     
    FormGroup,     
    ModalFooter, 
} from "reactstrap";
import ProductTable from "./ProductTable";

const ModalAddProduct = (props) => {
    
    const { menuState, addProduct, modalCloseAdd } = props
    const initialState = { 
        id: new Date().getTime(),
        name: '',
        description: '',
        price: '',
        stock: '',
        images: []
    }; 
    const [product, setProduct] = useState(initialState);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [ name ] : value
        })
    }

    return (
        <div>
            <ModalHeader>
                <div><h3>Add product</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup>
                    <label>Product name: </label>
                    <input
                        className = 'form-control'
                        name = 'name'
                        type = 'text'
                        onChange = {handleChange}
                        value = {product.name}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Description: </label>
                    <input
                        className = 'form-control'
                        name = 'description'
                        type = 'text'
                        onChange = {handleChange}
                        value = {product.description}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Price: </label>
                    <input
                        className = 'form-control'
                        name = 'price'
                        type = 'number'
                        onChange = {handleChange}
                        value = {product.price}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Stock: </label>
                    <input
                        className = 'form-control'
                        name = 'stock'
                        type = 'number'
                        onChange = {handleChange}
                        value = {product.stock}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Images: </label>
                    <input
                        className = 'form-control'
                        name = 'images'
                        //cambiar type
                        type = 'text'
                        onChange = {handleChange}
                        value = {product.images}
                    />
                </FormGroup>
            </ModalBody>
            <ModalFooter>
                <Button color = 'success'
                onClick = {e => {
                    e.preventDefault();
                    if(!product.name || !product.description || !product.price || !product.stock) return window.alert('Empty input')
                    if(menuState.find(element => element.name.toUpperCase() === product.name.toUpperCase())) return window.alert('This name already been used')
                    addProduct(product);
                    setProduct(initialState)
                    modalCloseAdd();
                }}
                > Submit</Button>
                <Button color = 'danger' onClick = {e => modalCloseAdd()}>Exit</Button>
            </ModalFooter>
        </div>
    )
}

export default ModalAddProduct;