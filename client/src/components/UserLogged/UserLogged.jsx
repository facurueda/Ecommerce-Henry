import React, { useEffect } from 'react'
import './UserLogged.css'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetMe, actionLogOut } from '../../redux/usersActions';
import { useCookies } from 'react-cookie';

const UserLogged = () => {

    useEffect(() => {
        dispatch(actionGetMe())
      }, [])

    const dispatch = useDispatch()
    const [cookie, setCookie, removeCookie] = useCookies(['ttkk']);
    const handleChange = () => {
        removeCookie('idUser')
        removeCookie('level')
        dispatch(actionLogOut());
    }

    const img = useSelector(store => store.usersReducer.img)

    return (
        <div class="dropdown">
            <button id="dropdownMenuButton" data-toggle="dropdown"><img src={img} style={{height:'40px', width:'40px', borderRadius:'50%'}}/></button>
            {/* <button class="btn btn-secondary dropdown-toggle" type="button"
                id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <img src={img} style={{height:'40px', width:'40px', borderRadius:'50%'}}/>
            </button> */}
            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/MyAccount">My Account</a>
                <a class="dropdown-item" href="/" onClick={e => handleChange()}>Log out</a>
            </div>
        </div>
    )
}

export default UserLogged