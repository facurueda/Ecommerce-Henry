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
            <form action="/users">
                <button className='buttonLoginAndRegister'>Usuarios</button>
            </form>
            <button className='buttonLoginAndRegister' onClick={() => {
                document.getElementById("orden").hidden =true
                modalOrdersTableView()
            }}>Todas las ordenes</button>
            <Modal isOpen={ModalOrdersTable} toggle={ModalOrdersTable}>
                <button className='buttonLoginAndRegister' onClick={() => {
                    modalOrdersTableView()
                    window.location.reload()
                }}>Close</button>
                <AdminOrdersTable />
            </Modal>
        </div>
    )
}
export default AdminNavBar;