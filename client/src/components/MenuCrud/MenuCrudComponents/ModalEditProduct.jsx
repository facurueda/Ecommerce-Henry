import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
    ListGroup,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "reactstrap";
import './ModalEditProduct.css'
import SelectImage from '../../SelectImage/SelectImage'

const ModalEditProduct = (props) => {
    const { currentProducts, updateProduct, modalCloseEdit, categories } = props;
    const [product, setProduct] = useState(currentProducts);
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [name]: value
        });
    }
    // States Upload Image
    const [loading, setLoading] = useState(false)
    const [imagesUpload, setImagesUpload] = useState('')
    // Funciones Upload Image
    const uploadImage = async e => {
        const files = e
        const data = new FormData()
        data.append('file', files)
        data.append('upload_preset', 'ecommerceHenry')
        setLoading(true)
        const res = await fetch('https://api.cloudinary.com/v1_1/facu9685/image/upload',
            {
                method: 'POST',
                body: data
            })
        const file = await res.json()
        setProduct({ ...product, images: file.secure_url })
        setImagesUpload(file.secure_url)
        setLoading(false)
    }
    // ESTADOS DESCRIPTION
    const [descriptionState, setDescriptionState] = useState(product.description)
    const descriptionChange = (value) => {
        setProduct({
            ...product,
            description: value
        })
    }
    const setCategory = (e) => {
        setProduct({
            ...product,
            categories: e.target.value
        })
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div className='editProdContainer'>
            <ModalHeader>
                <div><h3>Edit product</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup className = 'uploadImage'  style={{ display: "flex", justifyContent: 'center' }}>
                   <ListGroup horizontal className="inputContainer">
                       <SelectImage uploadImage={uploadImage} />
                    </ListGroup>
                </FormGroup>              
                <FormGroup className = 'productName'>
                    <label className = 'productDetail'>Product name: </label>
                    <input
                        className = 'inputName'
                        name='name'
                        type='text'
                        onChange={handleChange}
                        value={product.name}
                    />
                </FormGroup>
                <FormGroup>
                    <label className = 'productDetail'>Description: </label>
                    <form>
                        <Editor id = 'productEditor'
                            apiKey='efxwg61t4p8hkjnu4a5t9y0ah1jo0kf445jywqtnqljny3fy'
                            value={descriptionState}
                            init={{
                                height: 150,
                                menubar: false
                            }}
                            onEditorChange={descriptionChange}
                        />
                    </form>
                </FormGroup>
                <ListGroup horizontal className="propertyContainer" style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                    <FormGroup className="priceContainer">
                        <label className="productDetail">Price: </label>
                        <input
                            className='form-control'
                            name='precio'
                            type='number'
                            onChange={handleChange}
                            value={product.precio}
                        />
                    </FormGroup>
                    <FormGroup  className="stockContainer">
                        <label  className="productDetail">Stock: </label>
                        <input
                            className='form-control'
                            name='stock'
                            type='number'
                            onChange={handleChange}
                            value={product.stock}
                        />
                    </FormGroup>
                    <FormGroup className="categoriesContainer">
                        <label className = 'productDetail'>Categories: </label>
                        <Dropdown className = 'dropdownCat' isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className = 'dropdownCat' caret>
                            {product.categories}
                            </DropdownToggle>
                            <DropdownMenu className = 'dropdownCat'>
                                {categories.map( c => {
                                    return(
                                        <DropdownItem name='categories' value={c.name} onClick={handleChange}>{c.name}</DropdownItem>
                                    )
                                })}                  
                            </DropdownMenu>
                        </Dropdown>
                    </FormGroup>
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <button className='buttonAdd'
                    onClick={e => {
                        e.preventDefault();
                        if (!product.name || !product.description || !product.precio || !product.stock) return window.alert('Empty input')
                        updateProduct(product);
                        console.log(product)
                        modalCloseEdit();
                    }}
                >Submit
                </button>
                <button className='buttonExit'
                    onClick={e => modalCloseEdit()}
                >Exit
                </button>
            </ModalFooter>
        </div>
    )
}
export default ModalEditProduct;