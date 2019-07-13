import React from 'react'
import Product from './Product';
import ProductsService from '../../services/ProductsService';
import SearchBar from '../misc/SearchBar';
import queryString from 'query-string';
import '../../App.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
// import FavoriteIcon from '@material-ui/icons/Favorite';

class ProductsList extends React.Component {
  state = {
    products: [],
    searchProducts: [],
    favouriteProducts: []
  }

  addToFavourite = (product) => {
    this.setState({
      favouriteProducts: [product, ...this.state.favouriteProducts]
    })
  }


  fetchProducts = () => {
    ProductsService.getProducts().then(
      response => {

        this.setState({ products: response.data, searchProducts:response.data })
      }
    )
  }



  componentDidMount() {
    this.fetchProducts()
  }

  handleSearch = (text) => {
    console.log('In')
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
        <SearchBar onSearch={this.handleSearch} querySearch={querySearch}/>
        <div className="ProductsList">
          {this.state.searchProducts.map((product, i) => (
            <Product product={product} key={i} onDeleteProduct={this.deleteProduct} onFavProducts={this.contfavs}/>
          ))}
        </div>
      </div>
      
    )
  }
}
  
export default ProductsList