import React from 'react'
import { Button } from 'reactstrap';

const NavBar = () => {
    return (
        <div className='Home' style={{ marginBottom: "30px" }}>
            <div class="fixed-top">
                <div class="collapse" id="navbarToggleExternalContent" style={{ opacity: '0.8' }}>
                    <div class="bg-dark p-4">
                        <form action="/">
                            <Button>Home</Button>
                        </form>
                        <form action="/catalogue">
                            <Button>Catalogo</Button>
                        </form>
                        <form action="/order">
                            <Button>Carrito</Button>
                        </form>

                        <span class="text-muted">Toggleable via the navbar brand.</span>
                    </div>
                </div>
                <nav class="navbar navbar-dark bg-dark">
                    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarToggleExternalContent" aria-controls="navbarToggleExternalContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                </nav>
            </div>
        </div >
    )
}
export default NavBar;