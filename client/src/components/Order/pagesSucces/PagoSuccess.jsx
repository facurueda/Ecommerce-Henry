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
        <div className='succesContainer'>
            <div className='headerCont'>
                <div className='textCont'>
                    <h3 className='textThanks'>¡GRACIAS POR TU COMPRA!</h3>
                    <h4 className='textEnjoy'>¡Que lo disfrutes!</h4>
                </div>


                {direcciones.ciudad ? (
                    <div className='shipmentContainer'>
                        <h4 className='shipmentInfo'>Dirección de entrega:</h4>


                        <h4 className='direccionUsuario'>{direcciones.calle + direcciones.numeracion + ',' + direcciones.ciudad + ', ' + direcciones.provincia}</h4>
                    </div>
                ) : (
                        <div className='infoShip'>
                            <div className='noshipmentContainer'>
                            <h4 className='shipmentInfo'>Tu compra esta lista para retirar</h4>
                            <h4 className='shipmentInfo'>¡Te esperamos!</h4>
                            </div>
                            <div className='mapContainer'> 
                                <Iframe className='mapClass'
                                    src="https://www.openstreetmap.org/export/embed.html?bbox=-64.1969668865204%2C-31.424048980081505%2C-64.17904973030092%2C-31.415552514393653&amp;layer=mapnik&amp;marker=-31.41980084344705%2C-64.18800830841064"
                                />
                            </div>
                            <button className="buttonContinueBuying">
              SEGUIR COMPRANDO
              </button>
                        </div>
                    )}

            </div>

            <div className='bodyCont'>
               
                    {productosComprados.map(product => {
                        return (
                            <div className='infoCont'>
                                <div>
                                <img top width="20%" src={product.images} alt="Card image cap" className='imgCard' />
                                </div>
                                <div className='noshipmentInfo'>
                                   
                                        <h3 className='noshipmentInfo'>{product.name}</h3>
                                   
                                   </div>
                                </div>
                            
                        )
                    })}
                


            </div>

        </div>
    )

}

export default PagoSuccess;