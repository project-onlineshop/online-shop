import React from 'react'
import Product from './Product';
import ProductsService from '../../services/ProductsService';
import SearchBar from '../misc/SearchBar';
import queryString from 'query-string';

class ProductsList extends React.Component {
  state = {
    products: [],
    searchProducts: []
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

  handleSearch = (text) => {
    this.setState({
      searchProducts: this.state.products.filter(e => e.name.toLowerCase().includes(text.toLowerCase()))
    })
  }

  deleteProduct = (productId) => {
    ProductsService.deleteProduct(productId).then(
      response => {
        this.fetchProducts()
      }
    )
  }

  render () {

    const querySearch = queryString.parse(this.props.location.search)

    return (
      <div>

        <SearchBar onChange={this.handleSearch} querySearch={querySearch}/>
        <div className="ProductsList">
          {this.state.products.map((product, i) => (
            <Product product={product} key={i} onDeleteProduct={this.deleteProduct}/>
          ))}
        </div>
      </div>
      
    )
  }
}
  
export default ProductsList