import React from 'react'
import { Button } from 'reactstrap'
import './Category.css'

const Category = ( props ) => {

    const { name , productsFilter } = props

    return (
        <div>
            <Button className = 'categoryImage' 
            onClick = { e => productsFilter(name) } >{name}</Button>
        </div>
    )
}

export default Category;