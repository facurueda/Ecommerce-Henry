import React from 'react'
import { Button } from 'reactstrap';
import './AdminNavBar.css'

const AdminNavBar = (props) => {
    return (
        <div className='admincontainer'>
            <form action="/MenuCrud">
                <Button className='buttonStyle'>Lista de productos</Button>
            </form>
            <form action="/Categories">
                <Button className='buttonStyle'>Modificar categorias</Button>
            </form>
            <form action="/adminOrdersTable">
                <Button className='buttonStyle'>Lista de ordenes</Button>
            </form>
        </div>
    )
}
export default AdminNavBar;