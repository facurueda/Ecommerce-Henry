import React from "react";
import {
    Table,
    Button,
} from "reactstrap";

const CategoryTable = (props) => {

    // Destructuring props
    const {categories, editCategory, deleteCategory} = props;

    return (

            <Table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>

                    {/* ------- SE HACE UN IF PARA VERIFICAR QUE LO QUE LLEGA EN CATEGORIES TIENE ALGO, SINO SE DEVUELVE QUE NO EXISTEN CATEGORIAS ------- */}

                    {categories.length > 0 ? (

                    categories.map(category => (
                        <tr key={category.id}>
                            <td>{category.name}</td>
                            <td>{category.description}</td>
                            <td>
                                <Button color="primary"
                                    onClick={() => editCategory(category)}
                                >
                                    Edit
                                </Button>{" "}
                                <Button color="danger"
                                   onClick={() => deleteCategory(category.id)}
                                >Delete</Button>
                            </td>
                        </tr>
                    ))

                    )
                        : 
                                // SI NO HAY DATOS EN PROPS.CATEGORIES DEVUELVE "NO HAY CATEGORIAS"
                    (
                        <tr>
                        <td colSpan={3}>No Hay Categorias</td>
                        </tr>
                    )}


                </tbody>
            </Table>

    )

}

export default CategoryTable;