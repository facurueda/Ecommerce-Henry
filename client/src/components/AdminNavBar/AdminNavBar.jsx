import React from 'react'
import './AdminNavBar.css'
const AdminNavBar = () => {
    return (
        <div className='admincontainer'>
            <form action="/MenuCrud">
                <button className='buttonLoginAndRegister'>Lista de productos</button>
            </form>
            <form action="/Categories">
                <button className='buttonLoginAndRegister'>Lista de categorias</button>
            </form>
            <form action="/Usuarios">
                <button className='buttonLoginAndRegister'>Usuarios</button>
            </form>
            <form action="/adminOrdersTable">
                <button className='buttonLoginAndRegister'>Ordenes</button>
            </form>
        </div>
    )
}
export default AdminNavBar;