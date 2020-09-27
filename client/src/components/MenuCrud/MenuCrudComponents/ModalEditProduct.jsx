import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
    ListGroup
} from "reactstrap";
import './ModalEditProduct.css'
import SelectImage from '../../SelectImage/SelectImage'
import { useDispatch, useSelector } from "react-redux";
import { actionUpdateProduct, actionUpdateProductLocalStore } from "../../../redux/productsActions";

const ModalEditProduct = (props) => {
    const dispatch = useDispatch()
    const { modalCloseEdit } = props
    const categories = useSelector(state => state.categoriesReducer.categories)
    const currentProduct = useSelector(store => store.productsReducer.product)
    const updateProduct = (product) => {
        dispatch(actionUpdateProduct(product))
        window.location.reload();
    }
    const [loading, setLoading] = useState(false)
    const [imagesUpload, setImagesUpload] = useState('')
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
        actionUpdateProductLocalStore({ ...currentProduct, images: file.secure_url })
        setImagesUpload(file.secure_url)
        setLoading(false)
    }
    const handleChange = (event) => {
        const { name, value } = event.target
        dispatch(actionUpdateProductLocalStore({
            ...currentProduct,
            [name]: value
        }))
    }
    const descriptionChange = (event) => {
        dispatch(actionUpdateProductLocalStore({
            ...currentProduct,
            description: event
        }))
    }
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
                        value={currentProduct.name}
                    />
                </FormGroup>
                <FormGroup>
                    <label className='productDetail'>Description: </label>
                    <form>
                        <Editor id='productEditor'
                            apiKey='efxwg61t4p8hkjnu4a5t9y0ah1jo0kf445jywqtnqljny3fy'
                            value={currentProduct.description}
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
                            value={currentProduct.precio}
                        />
                    </FormGroup>
                    <FormGroup className="stockContainer">
                        <label className="productDetail">Stock: </label>
                        <input
                            className='form-control'
                            name='stock'
                            type='number'
                            onChange={handleChange}
                            value={currentProduct.stock}
                        />
                    </FormGroup>
                    <FormGroup className="categoriesContainer">
                        <label className='productDetail'>Categories: </label>
                        <select className='form-control' name='categories' onChange={handleChange} >
                            {categories.map(c => {
                                return (
                                    (currentProduct.categories !== undefined) ? ((c.name === currentProduct.categories.name) ? (<option className='form-control' selected name='categories' value={c.name}>{c.name}</option>) :
                                        (<option className='form-control' name='categories' value={c.idCategory}>{c.name}</option>)) : (<option></option>)
                                )
                            })}
                        </select>
                    </FormGroup>
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <button className='buttonAdd'
                    onClick={e => {
                        e.preventDefault();
                        if (!currentProduct.name || !currentProduct.description || !currentProduct.precio || !currentProduct.stock) return window.alert('Empty input')
                        dispatch(actionUpdateProduct(currentProduct));
                        modalCloseEdit();
                        window.location.reload()
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