// import React from 'react'
// import '../ColorStyles.css'
// import {
//     Card, CardImg, CardText, CardBody,
//   } from 'reactstrap';

// const ProductCard = (props) => {

//     const {image, name, price, description} = props;

//     const cutDescription = (description) => {
//         if (description.length > 80){
//             return (description.substring(0,80)+'...')
//         }
//         return description;
//     }

//     return (
//         <div>
//             <Card style={{width:'250px', height:'450px', border:'5px solid #DFA06E'}}>
//                 <CardImg top width="100%" src={image} alt="Card image cap" style={{margin:'3px', width:'95%', alignSelf:'center', marginTop:'5px'}}/>
//                 <CardBody>
//                 <h3 style={{display:'flex', justifyContent:'center'}}>{name}</h3>
//                 <CardText style={{fontStyle:'italic'}}>{cutDescription(description)}</CardText>
//                 <h5 style={{fontWeight:'bold', float:'right'}}>$ {price}</h5>
//                 </CardBody>
//             </Card>
//         </div>
//     )
// }

// export default ProductCard;