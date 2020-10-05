import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardBody, CardText, CardImg } from 'reactstrap';
import { actionGetDirection, actionSetOrderCerradaToView } from '../../../redux/ordersActions';
import './pagoSuccess.css'
import Iframe from 'react-iframe'


const PagoSuccess = (props) => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actionSetOrderCerradaToView())
        dispatch(actionGetDirection())
    }, [])

    const direcciones = useSelector((state) => state.ordersReducer.direccion)
    const productosComprados = useSelector((state) => state.ordersReducer.orderCerrada);


    //////////////////// GOOGLE MAPS

    const mapStyles = {
        width: '100%',
        height: '100%'
    };

    return (
        <div className='Container'>

            <h3>¡Muchas gracias por tu compra!</h3>

            {/* ///////////// -- Tarjetas de productos comprados (Foto y nombre) -- ///////////// */}
            <div className='cardsContainer'>
                {productosComprados.map(product => {
                    return (
                        <Card>
                            <CardImg top width="20%" src={product.images} alt="Card image cap" className='imgCard' />
                            <CardBody>
                                <CardText>
                                    <small className="text-muted">{product.name}</small>
                                </CardText>
                            </CardBody>
                        </Card>
                    )
                })}
            </div>

            <h4>¡Que lo disfrutes!</h4>

            {direcciones.ciudad ? (
                <div>
                    <h4>Tu compra sera enviada a:</h4>


                    <h4>{direcciones.ciudad + ', ' + direcciones.barrio + ', calle ' + direcciones.calle + ' al ' + direcciones.numeracion}</h4>
                </div>
            ) : (
                    <div>
                        <h4>¡Tu compra esta lista para retirar!</h4>


                        <Iframe
                            width="450"
                            height="450"
                            frameborder="0"
                            scrolling="no"
                            marginheight="0"
                            marginwidth="0"
                            src="https://www.openstreetmap.org/export/embed.html?bbox=-64.1969668865204%2C-31.424048980081505%2C-64.17904973030092%2C-31.415552514393653&amp;layer=mapnik&amp;marker=-31.41980084344705%2C-64.18800830841064"
                            style="border: 1px solid black"
                        />

                        <h4>¡Te esperamos!</h4>
                    </div>
                )}

        </div>
    )

}

export default PagoSuccess;