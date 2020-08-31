import React, { useState } from "react"; 
import { Editor } from "@tinymce/tinymce-react";
import {
    Button,   
    ModalHeader,   
    ModalBody,   
    FormGroup,   
    ModalFooter, 
    ListGroup
} from "reactstrap";

const ModalEditProduct = (props) => {

    const { products, currentProducts, updateProduct, modalCloseEdit, totalCat } = props;

    const [product, setProduct] = useState(currentProducts);
    
    const handleChange = (e) => {
        const { name, value } = e.target;
        setProduct({
            ...product,
            [ name ] : value
        });
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


    // ESTADOS DESCRIPTION

    const [ descriptionState, setDescriptionState ] = useState(product.description)


    const descriptionChange = (value) => {
        // setDescriptionState(value)


        setProduct({
            ...product,
            description:value
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


    return (
        <div>

            <ModalHeader>
                <div><h3>Edit product</h3></div>
            </ModalHeader>

            <ModalBody>

            <FormGroup style={{ display: "flex", justifyContent: 'center' }}>
                    <ListGroup horizontal style={{ alignItems: 'center' }}>
                        <input type='file' name='file' placeholder='Upload' style={{color:'transparent'}} onChange={uploadImage} />
                        {
                            
                                    <img src={product.images} alt='' style={{ width: '150px', marginLeft:'-175px' }} />
                                
                        }
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

                        // ============== VEEEEEEEEEEEEERRRRRRRRRRR
                            onChange={e => {
                                setCategory(e)
                            }}
                        >
                            {totalCat.map(c => (<option key={c.name}> {c.name} </option>))}
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
                <Button 
                    color = 'success'
                    onClick = {e => {
                        e.preventDefault();
                        if(!product.name || !product.description || !product.price || !product.stock) return window.alert('Empty input')
                        updateProduct(product.id, product);
                        console.log(product)
                        modalCloseEdit();
                    }}
                >Submit
                </Button>
                <Button 
                    color = 'danger' 
                    onClick = {e => modalCloseEdit()}
                >Exit
                </Button>
                
                {/* <Button 
                    color = 'danger' 
                    onClick = {e => console.log(currentProducts)}
                >TEST
                </Button> */}
            </ModalFooter>
        </div>
    )
}

export default ModalEditProduct;