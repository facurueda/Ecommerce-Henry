import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Table } from "reactstrap";
import { actionGetAllUsers } from "../../redux/usersActions";
import './Users.css'

const Users = () => {

    const dispatch = useDispatch()

    const users = useSelector(state => state.usersReducer.users)
    useEffect(() => {
        dispatch(actionGetAllUsers())
    },[])

    return (
        <Table className='categoryTable'>
            <thead>
                <tr className='NameAndDesc'>
                    <th className='Name'>Nombre</th>
                    <th className='Desc'>Email</th>
                    <th className='Desc'>Level</th>
                    <th className='buttons' />
                </tr>
            </thead>
            <tbody>
                {users.length > 0 ? (
                    users.map(users => (
                        <tr className='categories' key={users.idUser}>
                            <th className='categoryInfo'>{users.name}</th>
                            <th className='categoryInfo'>{users.email}</th>
                            <th className='categoryInfo'>{users.level}</th>
                            <th className='buttonContainer'>
                                <button type="button" className='buttonEdit'
                                    // onClick={() => editCategory(category)}
                                    >Edit
                                    </button>{" "}
                                <button type="button" className='buttonEdit'
                                    // onClick={() => deleteCategory(category)}
                                    >Delete
                                    </button>
                            </th>
                        </tr>
                    ))
                ) : (
                        <tr>
                            <td>No Categories</td>
                        </tr>
                    )}
            </tbody>
        </Table>
    )
}
export default Users;