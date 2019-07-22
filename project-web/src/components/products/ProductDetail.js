import React, { Component, Fragment } from 'react'
import ProductsService from '../../services/ProductsService';

class ProductDetail extends Component {
  state = {
    products: [],
    product: {
      name: '',
      image: '',
      price: '',
      id: '',
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
          this.setState({ product })
        },
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
      <div className="cards justify-content-md-center">
        <h1 className="product-price"> <b>{name}</b></h1>
        <div className="product-card">
          <div className="photo-column">
            <img src={image} className="product-photo m-3" alt="Foto de producto" />
          </div>
          <div className="product-text">
            <h5><b>{price}</b> €</h5>
            
            <p className="product-long">{description}</p>
          </div>
        </div>
      </div>
    );
  }
}

export default ProductDetail;