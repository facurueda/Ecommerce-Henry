import React from 'react'
import { useSelector } from 'react-redux'
import './MenuUser.css'
const MenuUser = () => {
    const level = useSelector(state => state.usersReducer.level)
    const editPerfil = () => {
        window.location.href = '/MyAccount'
    }
    const misOrdenes = () => {
        window.location.href = '/myOrders'
    }
    const Users = () => {
        window.location.href = '/Usuarios'
    }
    const usersOrders = () => {
        window.location.href = '/adminOrdersTable'
    }
    const editProducts = () => {
        window.location.href = '/MenuCrud'
    }
    const editCategories = () => {
        window.location.href = '/Categories'
    }

    return (
        <div className='menuUserCont'>
            <div class="btn-group-vertical">
                {level === 'user' ? (
                    <div>
                        <button type="button" class="btn btn-secondary" className='buttonMenuUser' onClick={e => editPerfil()}>Editar perfil</button>
                        <button type="button" class="btn btn-secondary" className='buttonMenuUser' onClick={e => misOrdenes()}>Mis Ordenes</button>
                    </div>

                ) : (
                        <div>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser' onClick={e => Users()}>Usuarios</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser' onClick={e => usersOrders()}>Ordenes</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser' onClick={e => editProducts()}>Editar productos</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser' onClick={e => editCategories()}>Editar categorias</button>
                            <button type="button" class="btn btn-secondary" className='buttonMenuUser' onClick={e => editPerfil()}>Editar perfil</button>
                        </div>

                    )}

            </div>
            </div>
    )
}

export default MenuUser