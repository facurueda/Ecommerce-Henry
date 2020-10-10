import React from "react";
import { useSelector } from "react-redux";
import { Table } from "reactstrap";
import './CategoryTable.css'

const CategoryTable = (props) => {
    const { editCategory, deleteCategory } = props;
    const categories = useSelector(state => state.categoriesReducer.categories)
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
                                <button type="button" className='buttonEditCat'
                                    onClick={() => editCategory(category)}>Editar
                                    </button>{" "}
                                <button type="button" className='buttonEditCat'
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