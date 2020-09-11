import React from 'react';
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
                            <button class="cart noselect"><span>
                                Add to Cart</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                                     <path d="M19.029 13h2.971l-.266 1h-2.992l.287-1zm.863-3h2.812l.296-1h-2.821l-.287 1zm-.576 2h4.387l.297-1h-4.396l-.288 1zm2.684-9l-.743 2h-1.929l-3.474 12h-11.239l-4.615-11h14.812l-.564 2h-11.24l2.938 7h8.428l3.432-12h4.194zm-14.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm5.9-7-.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg></button>
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
