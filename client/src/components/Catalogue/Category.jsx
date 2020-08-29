import React from 'react'
import { Button } from 'reactstrap'

const Category = ( props ) => {

    const { name , productsFilter } = props

    return (
        <div>
            <Button style = { { 
                borderStyle:'none',
                width: '300px'
            } } onClick = { e => productsFilter(name) } >{name}</Button>
        </div>
    )
}

export default Category;