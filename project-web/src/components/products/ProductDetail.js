import React, { Component, Fragment } from 'react'
import { Link, Redirect } from 'react-router-dom'
import ProductsService from '../../services/ProductsService';

class ProductDetail extends Component {
   state = {
       products: [],
       product: {
         name: '',
         image:'',
         price:'',
         id:'',
         description: ''
       },
       errors: {},
       touch: {},
       isAuthenticated: false
     }

   componentDidMount() {
       const { id } = this.props.match.params;

       ProductsService.getProductsById(id)
           .then(
               product => {
                 this.setState({ product })},
               error => {
                   console.error(error);
                   if (error.response && error.response.status === 404) {
                       this.setState({ shouldRedirect: true })
                   }
               }
           )
   }

 render() {
   const { name, price, image, description } = this.state.product;
   return (
       <div className="cards">
       <div className="product-card">
           <div className="photo-column">
               <img src={image} className="product-photo" alt="Foto de producto" />
           </div>
           <div className="product-text">
             <h5 >{name}</h5>
             <h5 className="product-price">{price}€</h5>
             <p className="product-long">{description}</p>

           </div>

       </div>
       <hr />
   </div>


     );

 }
}

export default ProductDetail;