import React from "react";
import { Table } from "reactstrap";
import './CategoryTable.css'

const CategoryTable = (props) => {
    const { categories, editCategory, deleteCategory } = props;
    return (
        <Table className='categoryTable'>
            <thead>
                <tr className='NameAndDesc'>
                    <th className='Name'>Nombre</th>
                    <th className='Desc'>Descripción</th>
                    <th className='buttons' />
                </tr>
            </thead>
            <tbody>
                {categories.length > 0 ? (
                    categories.map(category => (
                        <tr className='categories' key={category.idCategory}>
                            <th className='categoryInfo'>{category.name}</th>
                            <th className='categoryInfo'>{category.description}</th>
                            <th className='buttonContainer'>
                                <button type="button" className='buttonEdit'
                                    onClick={() => editCategory(category)}>Editar
                                    </button>{" "}
                                <button type="button" className='buttonEdit'
                                    onClick={() => deleteCategory(category)}>Eliminar
                                    </button>
                            </th>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td>No existen categorias</td>
                        </tr>
                    )}
            </tbody>
        </Table>
    )
}
export default CategoryTable;