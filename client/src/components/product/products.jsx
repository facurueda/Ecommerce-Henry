import React from 'react';
import StarRating from '../starRating/starRating'

import logo from './images/1.jpeg'
import logo1 from './images/2.jpeg'
import logo2 from './images/3.jpeg'
import logo3 from './images/4.jpeg'

function Products(props) {

    const { title, description, price, amount } = props;

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
            </div>
            <div class="col-md-4">
            <div class="card-body">
                <h5 class="card-title">Gold Donut's</h5>
                <h4>$100</h4>

                <hr />

                <p class="card-text">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris et est ac libero rutrum molestie vitae rutrum ex. Nam ut ligula lectus. Sed facilisis aliquet tincidunt. Aenean ultrices rutrum est, a ullamcorper ligula commodo et. Donec iaculis urna quam, ac fermentum massa cursus sit amet. Morbi commodo auctor dictum. Vivamus faucibus, dui ut iaculis mattis, nulla sapien pellentesque urna, scelerisque iaculis turpis est non diam. Pellentesque nulla nulla, hendrerit in est eget, tristique tincidunt nunc. In a sodales nunc. Quisque vitae libero et odio volutpat pulvinar at sit amet felis.
        
                    Aliquam at tristique mauris, ac aliquet est. Sed ipsum ipsum, pulvinar vitae libero id, rutrum eleifend purus. Proin placerat vitae lacus hendrerit pharetra. Proin egestas neque eget auctor sodales. Quisque iaculis nec nibh efficitur molestie. Nulla eu tellus a lorem aliquam hendrerit sit amet at elit. Aliquam id nisi scelerisque, rhoncus mauris ultricies, vulputate erat. Duis elementum arcu fringilla purus pellentesque, at elementum nisi facilisis. Mauris venenatis pretium pulvinar. Aenean sagittis est tellus, ac interdum magna accumsan id. Quisque ornare ipsum hendrerit nibh sagittis lacinia.

                </p>
                <hr />

                <div style={{height:'450px'}}>

                    < StarRating/>

                    {/* Espacio para Rating Stars */}
                
                </div>
                <div >
                    <button type="button" class="btn btn-success" style={{height:'100px', borderRadius:'15px'}}>Anadir al Carrito</button>
                </div>
            </div>
            </div>
        </div>
        </div>
        
        
        </div>
    )

  
  }
   
export default Products;
