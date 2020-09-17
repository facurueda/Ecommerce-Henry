import React, { useEffect, useState } from "react";
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
import { actionGetProduct } from "../../../redux/productsActions";
import { useDispatch, useSelector } from "react-redux";
import { compose } from "redux";

const ModalEditProduct = (props) => {
    const dispatch = useDispatch()
    const { currentProduct, updateProduct, modalCloseEdit, categories } = props;
    const [productEdited, setProductEdited] = useState(currentProduct)
    console.log("edited: ",productEdited)
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProductEdited({
            ...productEdited,
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
        setProductEdited({ ...productEdited, images: file.secure_url })
        setImagesUpload(file.secure_url)
        setLoading(false)
    }
    // ESTADOS DESCRIPTION
    const [descriptionState, setDescriptionState] = useState(currentProduct.description)
    const descriptionChange = (value) => {
        setProductEdited({
            ...productEdited,
            description: value
        })
    }
    const setCategory = (e) => {
        setProductEdited({
            ...productEdited,
            categories: e.target.value
        })
    }
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    console.log(currentProduct)
    return (
        <div className='editProdContainer'>
            <ModalHeader>
                <div><h3>Edit product</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup className='uploadImage' style={{ display: "flex", justifyContent: 'center' }}>
                    <ListGroup horizontal className="inputContainer">
                        <SelectImage uploadImage={uploadImage} />
                    </ListGroup>
                </FormGroup>
                <FormGroup className='productName'>
                    <label className='productDetail'>Product name: </label>
                    <input
                        className='inputName'
                        name='name'
                        type='text'
                        onChange={handleChange}
                        value={productEdited.name}
                    />
                </FormGroup>
                <FormGroup>
                    <label className='productDetail'>Description: </label>
                    <form>
                        <Editor id='productEditor'
                            apiKey='efxwg61t4p8hkjnu4a5t9y0ah1jo0kf445jywqtnqljny3fy'
                            value={productEdited.description}
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
                            value={productEdited.precio}
                        />
                    </FormGroup>
                    <FormGroup className="stockContainer">
                        <label className="productDetail">Stock: </label>
                        <input
                            className='form-control'
                            name='stock'
                            type='number'
                            onChange={handleChange}
                            value={productEdited.stock}
                        />
                    </FormGroup>
                    <FormGroup className="categoriesContainer">
                        <label className='productDetail'>Categories: </label>
                        <select className='form-control' name='categories' onChange={handleChange} >
                            {categories.map(c => {
                                return (
                                    (currentProduct.categories !== undefined )?((c.name === currentProduct.categories[0].name) ? (<option className='form-control' selected name='categories' value={c.name}>{c.name}</option>) :
                                        (<option className='form-control' name='categories' value={c.idCategory}>{c.name}</option>)): (<option></option>)
                                )
                            })}
                        </select>
                        {/*<Dropdown className='dropdownCat' isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className='dropdownCat' caret>
                                {product.categories}
                            </DropdownToggle>
                            <DropdownMenu className='dropdownCat' >
                            </DropdownMenu>
                        </Dropdown>*/}
                    </FormGroup>
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <button className='buttonAdd'
                    onClick={e => {
                        e.preventDefault();
                        if (!productEdited.name || !productEdited.description || !productEdited.precio || !productEdited.stock) return window.alert('Empty input')
                        updateProduct(productEdited);
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