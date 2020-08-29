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

const ModalAddProduct = (props) => {

    const { products, addProduct, modalCloseAdd } = props
    const initialState = {
        id: new Date().getTime(),
        name: '',
        description: '',
        price: '',
        stock: '',
        images: '',
        categories: []
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

    const totalCat = [{ name: 'Buzos' }, { name: 'Remeras' }, { name: 'Pantalones' }]

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
        const files = e.target.files
        const data = new FormData()
        data.append('file', files[0])
        data.append('upload_preset', 'ecommerceHenry')
        setLoading(true)

        const res = await fetch('https://api.cloudinary.com/v1_1/facu9685/image/upload',
            {
                method: 'POST',
                body: data
            })

        const file = await res.json()


        // setImagesUpload(file.secure_url)
        setProduct({...product, images: file.secure_url})
        setImagesUpload(file.secure_url)

        // setImagesUpload(true)

        setLoading(false)

        console.log(product)
    }


    return (
        <div>
            <ModalHeader>
                <div><h3>Add product</h3></div>
            </ModalHeader>
            <ModalBody>
                <FormGroup style={{ display: "flex", justifyContent: 'center' }}>
                    <ListGroup horizontal style={{ alignItems: 'center' }}>
                        <input type='file' name='file' placeholder='Upload' onChange={uploadImage} />
                        {
                            loading ? (
                                <h3>Loading...</h3>
                            ) : (
                                    <img src={imagesUpload} alt='' style={{ width: '150px' }} />
                                )
                        }
                        {/* <img src={imageDefault} alt="" style={{width:'150px'}}/>
                    <img src={imageDefault} alt="" style={{width:'150px', margin:'5px'}}/>
                    <img src={imageDefault} alt="" style={{width:'150px'}}/> */}
                        {/* <Media object data-src="holder.js/64x64" alt="Generic placeholder image" />  */}
                        {/* <ListGroupItem>{imageDefault}</ListGroupItem> */}
                        {/* <ListGroupItem>{imageDefault}</ListGroupItem> */}
                    </ListGroup>
                </FormGroup>

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
                            value={content}
                            init={{
                                height: 250,
                                menubar: false
                            }}
                            onEditorChange={handleChangeDescription}
                        />
                    </form>
                    {/* <input
                        className = 'form-control'
                        name = 'description'
                        type = 'text'
                        onChange = {handleChange}
                        value = {product.description}
                    /> */}
                </FormGroup>
                <ListGroup horizontal style={{ alignItems: 'center', justifyContent: 'space-around' }}>
                    <FormGroup>
                        <label>Price: </label>
                        <input
                            className='form-control'
                            name='price'
                            type='number'
                            onChange={handleChange}
                            value={product.price}
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
                    <FormGroup>
                        <label>Categories: </label>
                        {/* <input
                            className = 'form-control'
                            name = 'categories'
                            type = 'text'
                            onChange = {handleChange}
                            value = {product.categories}
                        /> */}
                        <select multiple class="form-control"
                            onChange={e => {
                                setCategory(e.target.value)
                            }}
                        >
                            {totalCat.map(c => (<option key={c.name}>{c.name}</option>))}
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
                        if (!product.name || !product.description || !product.price || !product.stock) return window.alert('Empty input')
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