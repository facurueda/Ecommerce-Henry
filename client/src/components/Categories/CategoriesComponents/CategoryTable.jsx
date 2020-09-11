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
                    </tr>
                </thead>
                <tbody>

                    {/* ------- SE HACE UN IF PARA VERIFICAR QUE LO QUE LLEGA EN CATEGORIES TIENE ALGO, SINO SE DEVUELVE QUE NO EXISTEN CATEGORIAS ------- */}

                    {categories.length > 0 ? (

                    categories.map(category => (
                        <div className='categories'>
                            <tr key={category.idCategory}>
                                <td>{category.name}</td>
                                <td>{category.description}</td>
                                <td>
                                    <Button color="primary"
                                        onClick={() => editCategory(category)}
                                    >
                                        Edit
                                    </Button>{" "}
                                    <Button color="danger"
                                    onClick={() => deleteCategory(category)}
                                    >Delete</Button>
                                </td>
                            </tr>
                        </div>
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