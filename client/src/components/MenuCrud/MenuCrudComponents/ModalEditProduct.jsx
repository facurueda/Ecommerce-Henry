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
        // const files = e.target.files
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


        // setImagesUpload(file.secure_url)
        setProduct({ ...product, images: file.secure_url })
        setImagesUpload(file.secure_url)

        // setImagesUpload(true)

        setLoading(false)
    }

    // ESTADOS DESCRIPTION

    const [descriptionState, setDescriptionState] = useState(product.description)


    const descriptionChange = (value) => {
        // setDescriptionState(value)


        setProduct({
            ...product,
            description: value
        })
    }


    // const handleChange = (e) => {
    //     const { name, value } = e.target;
    //     setProduct({
    //         ...product,
    //         [ name ] : value
    //     });
    // }


    const setCategory = (e) => {
        setProduct({
            ...product,
            categories: e.target.value
        })
    }



    const [dropdownOpen, setDropdownOpen] = useState(false);

    const toggle = () => setDropdownOpen(prevState => !prevState);


    return (
        <div>

            <ModalHeader>
                <div><h3>Edit product</h3></div>
            </ModalHeader>

            <ModalBody>

                <FormGroup style={{ display: "flex", justifyContent: 'center' }}>

                    <ListGroup horizontal className="inputContainer">

                        <SelectImage uploadImage={uploadImage} />

                    </ListGroup>
                </FormGroup>



                {/* <FormGroup style={{ display: "flex", justifyContent: 'center' }}>
                    <ListGroup horizontal style={{ alignItems: 'center' }}>



                        <input type='file' name='file' placeholder='Upload' style={{ color: 'transparent' }} onChange={uploadImage} />
                        {
                            <img src={product.images} alt='' style={{ width: '150px', marginLeft: '-175px' }} />
                        }
                    </ListGroup>
                </FormGroup> */}

                <FormGroup>
                    <label>Product name: </label>
                    <input
                        className='form-control'
                        name='name'
                        type='text'
                        onChange={handleChange}
                        value={product.name}
                    />
                </FormGroup>

                <FormGroup>
                    <label>Description: </label>
                    <form>
                        <Editor
                            apiKey='efxwg61t4p8hkjnu4a5t9y0ah1jo0kf445jywqtnqljny3fy'
                            value={descriptionState}
                            init={{
                                height: 250,
                                menubar: false
                            }}
                            onEditorChange={descriptionChange}
                        />
                    </form>
                </FormGroup>
                <ListGroup horizontal style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                    <FormGroup>
                        <label>Price: </label>
                        <input
                            className='form-control'
                            name='precio'
                            type='number'
                            onChange={handleChange}
                            value={product.precio}
                        />
                    </FormGroup>
                    <FormGroup>
                        <label>Stock: </label>
                        <input
                            className='form-control'
                            name='stock'
                            type='number'
                            onChange={handleChange}
                            value={product.stock}
                        />
                    </FormGroup>
                    <FormGroup className="categoriesContainer">
                        <label>Categories: </label>

                        <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                            <DropdownToggle caret>
                            {product.categories}
                            </DropdownToggle>
                            <DropdownMenu>
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
                <Button
                    color='success'
                    onClick={e => {
                        e.preventDefault();
                        if (!product.name || !product.description || !product.precio || !product.stock) return window.alert('Empty input')
                        updateProduct(product);
                        console.log(product)
                        modalCloseEdit();
                    }}
                >Submit
                </Button>
                <Button
                    color='danger'
                    onClick={e => modalCloseEdit()}
                >Exit
                </Button>

                <Button
                    color='danger'
                    onClick={e => console.log(currentProducts.image)}
                >TEST
                </Button>
            </ModalFooter>
        </div>
    )
}

export default ModalEditProduct;