import React from 'react'
const stars = (num) => {
    switch (num) {
        case 1:
            return (<div>
                <i class="fas fa-star"></i>
                <span class="far fa-star"></span>
                <span class="far fa-star"></span>
                <span class="far fa-star"></span>
                <span class="far fa-star"></span>
            </div>)
        case 2:
            return (<div>

                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span class="far fa-star"></span>
                <span class="far fa-star"></span>
                <span class="far fa-star"></span>
            </div>)
        case 3:
            return (
                <div>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <span class="far fa-star"></span>
                    <span class="far fa-star"></span>
                </div>)
        case 4:
            return (<div>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <span className="far fa-star"></span>
            </div>)
        case 5:
            return (<div>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>)
        default:
            return (<div>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
                <span class="fa fa-star"></span>
            </div>)
    }
}
export default stars;