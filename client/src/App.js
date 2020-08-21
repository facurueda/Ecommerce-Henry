import React from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
    return (
      <div className="App">
        <header className="App-header">
          
        <div style={{display: 'flex', borderBlockColor:'green'}}>
  
          <div style={{marginRight:'30px'}}>
              <div class="card mb-1">
                  <img src={logo} class="card-img-top" alt="..." style={{width:'500px', height:'500px'}}/>
              </div>
  
              <div id="carouselExampleIndicators" class="carousel slide" data-ride="carousel">
                  <ol class="carousel-indicators">
                      <li data-target="#carouselExampleIndicators" data-slide-to="0" class="active"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                      <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                  </ol>
                  <div class="carousel-inner">
                      <div class="carousel-item active">
                          <img src={logo} class="d-block w-65" alt="..." />
                      </div>
                      <div class="carousel-item">
                          <img src={logo} class="d-block w-65" alt="..." />
                      </div>
                      <div class="carousel-item">
                          <img src={logo} class="d-block w-65" alt="..." />
                      </div>
                  </div>
                  <a class="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span class="sr-only">Previous</span>
                  </a>
                  <a class="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                      <span class="carousel-control-next-icon" aria-hidden="true"></span>
                      <span class="sr-only">Next</span>
                  </a>
              </div>
  
            </div>
  
            <div style={{display:'flex', flexDirection:'column', alignItems:'flex-start'}}>
                    <p>title</p>
                    <p>amount</p>
                    <p>price</p>
                    <p>description</p>
                  <div>
                      <p>
                          <input id="radio1" type="radio" name="estrellas" value="5"/>
                          <label for="radio1">★</label>
                          <input id="radio2" type="radio" name="estrellas" value="4"/>
                          <label for="radio2">★</label>
                          <input id="radio3" type="radio" name="estrellas" value="3"/>
                          <label for="radio3">★</label>
                          <input id="radio4" type="radio" name="estrellas" value="2"/>
                          <label for="radio4">★</label>
                          <input id="radio5" type="radio" name="estrellas" value="1"/>
                          <label for="radio5">★</label>
                      </p>
                  </div>
                  <button type="button" class="btn btn-primary">Primary</button>
            </div>
  
          </div>
  
        </header>

        <div class="card" style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..."/>
  <div class="card-body">
    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
  </div>
</div>


      </div>
    );
  }
  
  export default App;
  
