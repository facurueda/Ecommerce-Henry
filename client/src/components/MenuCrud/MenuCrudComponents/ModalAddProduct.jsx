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
import './ModalAddProduct.css'
import SelectImage from '../../SelectImage/SelectImage'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'

const ModalAddProduct = (props) => {

    toast.configure()

    const { products, addProduct, modalCloseAdd, categories } = props
    const initialState = {
        name: '',
        description: '',
        precio: '',
        stock: '',
        images: '',
        categories: 'Choose Category',
        rating: 1
    };
    const [product, setProduct] = useState(initialState);
    const handleChange = e => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            description: content,
            categories: category,
            [name]: value
        })
    }
    const [category, setCategory] = useState('')
    const [content, setContent] = useState('');
    const handleChangeDescription = (content, editor) => {
        if (content.length > 255) {
            toast.error("Maximo 255 caracteres", {
                position: "top-center",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
        content = content.replace('<p>', "")
        content = content.replace('</p>', '')
        content = '<p>' + content.slice(0, 250) + "</p>"
        setContent(content)
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
        setProduct({ ...product, images: file.secure_url })
        setImagesUpload(file.secure_url)
        setLoading(false)
    }
    const [fileNames, setFileNames] = useState([]);
    const handleDrop = acceptedFiles =>
        setFileNames(acceptedFiles.map(file => file.name));
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const toggle = () => setDropdownOpen(prevState => !prevState);
    return (
        <div className='addProdContainer'>
            <ModalHeader>
                <div>Add product</div>
            </ModalHeader>
            <ModalBody>
                <FormGroup className='uploadImage' style={{ display: "flex", justifyContent: 'center' }}>
                    <ListGroup horizontal className="inputContainer">
                        <SelectImage uploadImage={uploadImage} />
                    </ListGroup>
                </FormGroup>
                <FormGroup className='productName'>
                    <label className='productDetail'>Product name: </label>
                    <input className='inputName'
                        name='name'
                        type='text'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label className='productDetail'>Description: </label>
                    <form>
                        <Editor id='productEditor'
                            apiKey='efxwg61t4p8hkjnu4a5t9y0ah1jo0kf445jywqtnqljny3fy'
                            value={content}
                            init={{
                                height: 150,
                                menubar: false,
                            }}
                            onEditorChange={handleChangeDescription}
                        />
                    </form>
                </FormGroup>
                <ListGroup horizontal className="propertyContainer">
                    <FormGroup className="priceContainer">
                        <label className='productDetail'>Price: </label>
                        <input
                            className='form-control'
                            name='precio'
                            type='number'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="stockContainer">
                        <label className='productDetail' >Stock: </label>
                        <input
                            className='form-control'
                            name='stock'
                            type='number'
                            onChange={handleChange}
                            value={product.stock}
                        />
                    </FormGroup>
                    <FormGroup className="categoriesContainer">
                        <label className='productDetail'>Categories: </label>
                        <Dropdown className='dropdownCat' isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle className='dropdownCat' caret>
                                {product.categories}
                            </DropdownToggle>
                            <DropdownMenu className='dropdownCat' >
                                {categories.map(c => {
                                    return (
                                        <DropdownItem name='categories' value={c.name} onClick={handleChange}>{c.name}</DropdownItem>
                                    )
                                })}
                            </DropdownMenu>
                        </Dropdown>

                    </FormGroup>
                </ListGroup>
            </ModalBody>
            <ModalFooter>
                <Button className='buttonAdd'
                    onClick={e => {
                        e.preventDefault();
                        if (!product.name || !product.description || !product.precio || !product.stock) return toast.error("Todos los campos son obligatorios", {
                            position: "top-center",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        if (products.find(element => element.name.toUpperCase() === product.name.toUpperCase())) return toast.error("Este producto ya fue creado", {
                            position: "top-center",
                            autoClose: 2500,
                            hideProgressBar: false,
                            closeOnClick: true,
                            pauseOnHover: true,
                            draggable: true,
                            progress: undefined,
                        });
                        
                        addProduct(product);
                        setProduct(initialState)
                        modalCloseAdd();
                    }}
                > Submit</Button>
                <Button className='buttonExit' onClick={e => modalCloseAdd()}>Exit</Button>
            </ModalFooter>
        </div>
    )
}

export default ModalAddProduct;