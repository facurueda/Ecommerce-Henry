import React, { useState } from 'react'
import { Button, Modal } from 'reactstrap';
import AdminOrdersTable from '../adminOrdersTable/adminOrdersTable';
import './AdminNavBar.css'
const AdminNavBar = (props) => {
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
                <button className='buttonLoginAndRegister' onClick={modalOrdersTableView}>Lista de ordenes</button>
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