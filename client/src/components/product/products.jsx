import React from 'react';
import StarRating from '../starRating/starRating'

import logo from './images/1.jpeg'
import logo1 from './images/2.jpeg'
import logo2 from './images/3.jpeg'
import logo3 from './images/4.jpeg'

function Products(props) {

    const { title, description, price, stock } = props;
    
    const setStock = 0

    return (

            <div style={{display:'flex', justifyContent:'center', marginTop:'15px'}}>

            <div class="card mb-3" style={{display:'flex', alignContent:'center', width: "1500px", height:'auto'}}>
            <div class="row no-gutters">
            <div class="col-md-8">
            <img src={logo} class="card-img" alt="..."  style={{marginBottom:'5px'}}/>
            
            <div id="carouselExampleFade" class="carousel slide carousel-fade" data-ride="carousel" >
                <div class="carousel-inner" >
                    <div class="carousel-item active">
                    <img src={logo1} class="d-block w-100" alt="..." style={{height:'400px'}}/>
                    </div>
                    <div class="carousel-item">
                    <img src={logo2} class="d-block w-100" alt="..." style={{height:'400px'}}/>
                    </div>
                    <div class="carousel-item">
                    <img src={logo3} class="d-block w-100" alt="..." style={{height:'400px'}}/>
                    </div>
                </div>
                <a class="carousel-control-prev" href="#carouselExampleFade" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#carouselExampleFade" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
                </div>
<<<<<<< HEAD
                </div>
                <div class="col-md-4">
                <div class="card-body">
                <h5 class="card-title">Gold Donut's</h5>
                <h4>$100</h4>

=======
            </div>
            <div class="col-md-4">
            <div class="card-body">
                <h5 class="card-title">{title}</h5>
                <h4>{price}</h4>
                <h4>{stock}</h4>
>>>>>>> modificacionesFront
                <hr />

                <p class="card-text">
                    {description}
                </p>
                <hr />

                <div style={{height:'450px'}}>

                    < StarRating/>

                    {/* Espacio para Rating Stars */}
                
                </div>
                <div >
                    <button type="button" class="btn btn-success" style={{height:'100px', borderRadius:'15px'}}  onClick={setStock}>Anadir al Carrito</button>
                    {/* Setea el stock */}
                </div>
                </div>
                </div>
        </div>
        </div>
        
        
        </div>
    )

  
  }
   
export default Products;
