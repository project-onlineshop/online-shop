import React from 'react'
import Product from './Product';
import ProductsService from '../../services/ProductsService';

class ProductsList extends React.Component {
  state = {
    products: []
  }

  fetchProducts = () => {
    ProductsService.getProducts().then(
      response => {
        this.setState({ products: response.data })
      }
    )
  }

  componentDidMount() {
    this.fetchProducts()
  }

  deleteProduct = (productId) => {
    ProductsService.deleteProduct(productId).then(
      response => {
        this.fetchProducts()
      }
    )
  }

  render () {
    return (
      <div className="ProductsList">
        {this.state.products.map((product, i) => (
          <Product product={product} key={i} onDeleteProduct={this.deleteProduct}/>
        ))}
      </div>
    )
  }
}
  
export default ProductsList