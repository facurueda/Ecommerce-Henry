import React from 'react'
import './Category.css'

const Category = ( props ) => {

    const { name , productsFilter } = props

    return (
        <div>
            <button class="btn-1" onClick = { e => productsFilter(name) }>
                <span>{name}</span>
            </button>
        </div>
    )
}

export default Category;