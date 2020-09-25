import React from 'react'
import './UserLogged.css'
import { useDispatch, useSelector } from 'react-redux'
import Cart from './Cart';
import { actionLogOut } from '../../redux/usersActions';


const UserLogged = () => {
    const user = useSelector(state => state.usersReducer.user);
    const dispatch = useDispatch()
    const handleChange = () => {
        dispatch(actionLogOut(user));
    }
    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button"
                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/Admin">My Account</a>
                <a class="dropdown-item" href="/" onClick={e => handleChange()}>Log out</a>
            </div>
        </div>
    )
}

export default UserLogged