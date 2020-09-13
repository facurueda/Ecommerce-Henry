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
            <Table>
                <thead>
                    <tr className = 'NameAndDesc'>
                        <th className = 'Name'>Name</th>
                        <th className = 'Desc'>Description</th>
                        <th className = 'buttons'/>
                    </tr>
                </thead>
                <tbody>

                    {/* ------- SE HACE UN IF PARA VERIFICAR QUE LO QUE LLEGA EN CATEGORIES TIENE ALGO, SINO SE DEVUELVE QUE NO EXISTEN CATEGORIAS ------- */}

                    {categories.length > 0 ? (

                    categories.map(category => (
                            <tr  className='categories' key={category.idCategory}>
                                <th>{category.name}</th>
                                <th>{category.description}</th>
                                <th> 
                                    <button type="button" class="btn btn-primary btn-circle" 
                                    onClick={() => editCategory(category)}><i class="fas fa-edit" ></i>
                                    </button>{" "}
                                    <button type="button" class="btn btn-warning btn-circle btn-lg"
                                    onClick={() => deleteCategory(category)}><i class="fa fa-times"></i>
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