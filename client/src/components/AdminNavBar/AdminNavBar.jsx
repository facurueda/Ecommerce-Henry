import React from 'react'
import { Button } from 'reactstrap';
import './AdminNavBar.css'
const AdminNavBar = (props) => {
    return (
        <div className='admincontainer'>
            <form action="/MenuCrud">
                <button className='buttonStyle'>Lista de productos</button>
            </form>
            <form action="/Categories">
                <button className='buttonStyle'>Modificar categorias</button>
            </form>
            <form action="/adminOrdersTable">
                <button className='buttonStyle'>Lista de ordenes</button>
            </form>
        </div>
    )
}
export default AdminNavBar;