import React, { useState } from 'react'
import { Modal } from 'reactstrap';
import AdminOrdersTable from '../adminOrdersTable/adminOrdersTable';
import './AdminNavBar.css'
const AdminNavBar = () => {
    const [ModalOrdersTable, setModalOrdersTable] = useState(false)
    const modalOrdersTableView = () => setModalOrdersTable(!ModalOrdersTable);
    return (
        <div className='admincontainer'>
            <form action="/MenuCrud">
                <button className='buttonLoginAndRegister'>Lista de productos</button>
            </form>
            <form action="/Categories">
                <button className='buttonLoginAndRegister'>Modificar categorias</button>
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