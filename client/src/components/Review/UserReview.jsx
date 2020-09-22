import React from 'react';

const UserReview = (props) => {    
    const { bool } = props
    if(bool){
        return (
            <div className = 'UserReview'>

            </div>
        )

    }
    return (
        <div className = 'UserReview'>
            <input type="text"></input>
            <button>Crear review</button>
        </div>
    )
}
export default UserReview