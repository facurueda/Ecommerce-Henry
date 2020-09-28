import React from 'react'
import './UserLogged.css'
import { useDispatch } from 'react-redux'
import { actionLogOut } from '../../redux/usersActions';
import { useCookies } from 'react-cookie';

const UserLogged = () => {
    const dispatch = useDispatch()
    const [cookie, setCookie, removeCookie] = useCookies(['ttkk']);
    const handleChange = () => {
        removeCookie('idUser')
        removeCookie('level')
        dispatch(actionLogOut());
    }
    return (
        <div class="dropdown">
            <button class="btn btn-secondary dropdown-toggle" type="button"
                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <i class="fa fa-user" aria-hidden="true"></i>
            </button>
            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/MyAccount">My Account</a>
                <a class="dropdown-item" href="/" onClick={e => handleChange()}>Log out</a>
            </div>
        </div>
    )
}

export default UserLogged