import React from 'react'
import './AboutUs.css'
import img from './recycle.jpeg'
const AboutUs = () => {

    return (
        <div className='aboutUsContainer'>

            <div className='aboutUsText'>
                La cosería surge como un emprendimiento de amigos pensado como una forma de reciclaje,
                para que puedas invertir en cosas que ya no usas, o nunca lo hiciste
                y así darles una segunda oportunidad. Ganas vos, gana el ambiente.
            </div>
 <div className='aboutUsImg'>
     <img src={img} alt=""/>
 </div>

        </div>
    )

}

export default AboutUs