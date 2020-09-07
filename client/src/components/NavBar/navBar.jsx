import React from 'react'
import { Button } from 'reactstrap';
import './navBar.css'

const NavBar = () => {
    return (
        <div className='Home' style={{ marginBottom: "30px" }}>
            <div class="fixed-top">
                <div class="collapse" id="navbarToggleExternalContent" style={{ opacity: '0.8' }}>
                    <div class="bg-dark p-4">
                        <div className='buttonsContainer'>
                        <form action="/">
                            <Button className='buttonStyle'>Home</Button>
                        </form>
                        <form action="/catalogue">
                            <Button className='buttonStyle'>Catalogo</Button>
                        </form>
                        <form action="/order">
                            <Button className='buttonStyle'>Carrito</Button>
                        </form>
                        </div>
                    </div>
                </div>
                <nav class="navbar navbar-dark bg-dark">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation" >
                        <span class="navbar-toggler-icon" ></span>
                    </button>
                </nav>
            </div>
        </div >
    )
}
export default NavBar;