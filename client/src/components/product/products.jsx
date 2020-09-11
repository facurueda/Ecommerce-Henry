import React from 'react';
import ButtonAddToCart from '../ButtonAddToCart';
import './products.css'

function Products(props) {

    const { name, description, precio, stock, image } = props;


    return (
        <div>
            <body>
                <div className='prodCard'>
                    <div id='hover-img'>
                        <div className= 'card overflow-hidde'>
                        <img className= "img-fluid"  src={image} alt="..." />
                        </div>
                    </div>
                    <div className= 'prodComp1'>
                        <div className= 'prodComp2'>
                        <h1 className='prodName'>
                            {name}
                        </h1>
                        <span className='prodDescription'>{description}</span>
                        </div>
                        <div className= 'prodComp3'>
                            <span className='prodPrice'>{precio} </span>
                            <div className= 'buttons'>
                            <ButtonAddToCart/>
                                <button className='buyProd'>Comprar</button>
                            </div>
                        {/* <span className='prodStock'>45</span> */}
                        </div>
                    </div>
                </div>
            </body>
        </div>
    )
}


export default Products;
