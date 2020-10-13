import React, { useEffect } from 'react'
import './UserLogged.css'
import { useDispatch, useSelector } from 'react-redux'
import { actionGetMe, actionLogOut } from '../../redux/usersActions';
import { useCookies } from 'react-cookie';
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const UserLogged = () => {


    toast.configure()
    useEffect(() => {
        dispatch(actionGetMe())
    }, [])
    const img = useSelector(state => state.usersReducer.img)
    const dispatch = useDispatch()
    const [cookie, setCookie, removeCookie] = useCookies(['ttkk']);
    const handleChange = () => {
        toast("Te deslogueaste", {
            position: "top-center",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
        removeCookie('idUser')
        removeCookie('level')
        dispatch(actionLogOut());
    }

    return (
        <div class="dropdown">
            <button id="dropdownMenuButton" data-toggle="dropdown"><img src={img} style={{ height: '40px', width: '40px', borderRadius: '50%' }} /></button>
            <div class="dropdown-menu dropdown-menu-left" aria-labelledby="dropdownMenuButton">
                <a class="dropdown-item" href="/MyAccount">My Account</a>
                <a class="dropdown-item" href="/" onClick={e => handleChange()}>Log out</a>
            </div>
        </div>
    )
}

export default UserLogged