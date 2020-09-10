import React, { useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import {
    Button,
    ModalHeader,
    ModalBody,
    FormGroup,
    ModalFooter,
    ListGroup,
} from "reactstrap";
import './ModalAddProduct.css'
import SelectImage from '../../SelectImage/SelectImage'

const ModalAddProduct = (props) => {

    const { products, addProduct, modalCloseAdd, categories } = props
    const initialState = {
        name: '',
        description: '',
        precio: '',
        stock: '',
        images: '',
        categories: [],
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

    // const totalCat = [{ name: 'Buzos' }, { name: 'Remeras' }, { name: 'Pantalones' }]

    const [category, setCategory] = useState('')

    // States
    const [content, setContent] = useState('');

    // Functions
    const handleChangeDescription = (content, editor) => {
        setContent(content)
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

        console.log(product)
    }

    // States DropdownCategories

    // const [dropdownOpen, setDropdownOpen] = useState(false);

    // const toggle = () => setDropdownOpen(prevState => !prevState);


    const [fileNames, setFileNames] = useState([]);
    const handleDrop = acceptedFiles =>
        setFileNames(acceptedFiles.map(file => file.name));



    return (
        <div>
            <ModalHeader>
                <div className="addProductTitle">Add product</div>
            </ModalHeader>
            <ModalBody>
                <FormGroup style={{ display: "flex", justifyContent: 'center' }}>

                    <ListGroup horizontal className="inputContainer">
                        <SelectImage uploadImage={uploadImage}/>
                        
                        {/* <button onClick={console.log(e => console.log(getInputProps))}/> */}




                        {/* <div class="myButton"><input type="image" name="" value=""/></div> */}

                        {/* <input className="inputImage" type='file' name='file' onChange={uploadImage}/>
                        {
                            loading ? (
                                <h3 style={{ width: '150px', marginLeft: '-175px' }}>Loading...</h3>
                            ) : (
                                    <img src={imagesUpload} alt='' style={{ width: '150px', marginLeft: '-175px' }} />
                                )
                        } */}

                    </ListGroup>
                </FormGroup>

                <FormGroup>
                    <label>Product name: </label>
                    <input
                        className='form-control'
                        name='name'
                        type='text'
                        onChange={handleChange}
                    />
                </FormGroup>
                <FormGroup>
                    <label>Description: </label>
                    <form>
                        <Editor
                            apiKey='efxwg61t4p8hkjnu4a5t9y0ah1jo0kf445jywqtnqljny3fy'
                            value={content}
                            init={{
                                height: 250,
                                menubar: false
                            }}
                            onEditorChange={handleChangeDescription}
                        />
                    </form>
                </FormGroup>
                <ListGroup horizontal className="propertyContainer">
                    <FormGroup className="priceContainer">
                        <label>Price: </label>
                        <input
                            className='form-control'
                            name='precio'
                            type='number'
                            onChange={handleChange}
                        />
                    </FormGroup>
                    <FormGroup className="stockContainer">
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

                        {/* <Dropdown isOpen={dropdownOpen} toggle={toggle} onChange={e => {
                                setCategory(e.target.value)
                            }}>
                            <DropdownToggle caret>
                                Select Categorie
                            </DropdownToggle>
                            <DropdownMenu>
                                {totalCat.map(c => (<DropdownItem key={c.name}>{c.name}</DropdownItem>))}   
                            </DropdownMenu>
                        </Dropdown> */}


                        <select multiple class="form-control"
                            onChange={e => {
                                setCategory(e.target.value)
                            }}
                        >
                            {categories.map(c => (<option key={c.name}>{c.name}</option>))}
                        </select>
                    </FormGroup>
                </ListGroup>
                {/* <FormGroup>
                    <label>Images: </label>
                    <input
                        className = 'form-control'
                        name = 'images'
                        //cambiar type
                        type = 'text'
                        onChange = {handleChange}
                        value = {product.images}
                    />
                </FormGroup> */}
            </ModalBody>
            <ModalFooter>
                <Button color='success'
                    onClick={e => {
                        e.preventDefault();
                        if (!product.name || !product.description || !product.precio || !product.stock) return window.alert('Empty input')
                        if (products.find(element => element.name.toUpperCase() === product.name.toUpperCase())) return window.alert('This name already been used')
                        addProduct(product);
                        setProduct(initialState)
                        modalCloseAdd();
                    }}
                > Submit</Button>
                <Button color='danger' onClick={e => modalCloseAdd()}>Exit</Button>
            </ModalFooter>
        </div>
    )
}

export default ModalAddProduct;