import React from "react";
import {
    Table,
    Button,
} from "reactstrap";
import './CategoryTable.css'

const CategoryTable = (props) => {
    // Destructuring props
    const {categories, editCategory, deleteCategory} = props;

    return (
            <Table className = 'categoryTable'>
                <thead>
                    <tr className = 'NameAndDesc'>
                        <th className = 'Name'>Nombre</th>
                        <th className = 'Desc'>Descripción</th>
                        <th className = 'buttons'/>
                    </tr>
                </thead>
                <tbody>

                    {/* ------- SE HACE UN IF PARA VERIFICAR QUE LO QUE LLEGA EN CATEGORIES TIENE ALGO, SINO SE DEVUELVE QUE NO EXISTEN CATEGORIAS ------- */}

                    {categories.length > 0 ? (

                    categories.map(category => (
                            <tr  className='categories' key={category.idCategory}>
                                <th className = 'categoryInfo'>{category.name}</th>
                                <th className = 'categoryInfo'>{category.description}</th>
                                <th className = 'buttonContainer'> 
                                    <button type="button" className = 'buttonEdit'
                                    onClick={() => editCategory(category)}>Edit
                                    </button>{" "}
                                    <button type="button" className = 'buttonEdit'
                                    onClick={() => deleteCategory(category)}>Delete
                                    </button>
                                </th>
                            </tr>
                    ))

                    )
                        :
                                // SI NO HAY DATOS EN PROPS.CATEGORIES DEVUELVE "NO HAY CATEGORIAS"
                    (
                        <tr>
                        <td>No Categories</td>
                        </tr>
                    )}
                </tbody>
            </Table>

    )
}
export default CategoryTable;