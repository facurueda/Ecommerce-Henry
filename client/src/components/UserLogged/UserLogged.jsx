import React from 'react'
import './UserLogged.css'
import { useSelector } from 'react-redux'
import Cart from './Cart';


const UserLogged = () => {
    const user = useSelector(state => state.usersReducer.user);
    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button" 
            id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            <i class="fa fa-user" aria-hidden="true"></i>
            </button>
            <Cart/>
        </div>
    )
}

export default UserLogged