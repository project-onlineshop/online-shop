import React from 'react'
import Product from './Product';
import { Link } from 'react-router-dom';
import ProductsService from '../../services/ProductsService';
import SearchBar from '../misc/SearchBar';
import queryString from 'query-string';
import '../../App.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import FilterCategory from './FilterCategory';


class ProductsList extends React.Component {
  state = {
    products: [],
    searchProducts: [],
    favouriteProducts: [],
    category: null,
    opacity: 0
  }

  addToFavourite = (product) => {
    this.setState({
      favouriteProducts: [product, ...this.state.favouriteProducts]
    })
  }

  filterCategory = (category) => {
    this.setState({ category })
  }

  fetchProducts = () => {
    ProductsService.getProducts().then(
      response => {
        this.setState({ products: response.data, searchProducts: response.data })
      }
    )
  }

  // onShow = () => {
  //   const scrolled = window.scrollY;
  //   if (scrolled >= 600) {
  //     this.setState({
  //       opacity: 1
  //     })
  //   }
  // }

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

  render() {

    //  const categoryproducts = this.state.searchProducts.filter(e => {
    //   return this.state.category === null || this.state.category === e.category
    // }) 

    const querySearch = queryString.parse(this.props.location.search)

    return (
      <div>
        <SearchBar onSearch={this.handleSearch} querySearch={querySearch} />
        {/* <FilterCategory onFilterCategory={this.filterCategory} /> */}
        <div className="ProductsList">
          {this.state.searchProducts.map((product, i) => (
            <Product product={product} key={i} onDeleteProduct={this.deleteProduct} addToFavourite={this.addToFavourite} />
          ))}
          
        </div>
        <div className="new">
            {/* <Link to="/products/new" ><i onScroll={this.onShow()} className={this.state.opacity ? 'hide' :'fa fa-plus-circle fa-3x buttons-profile'}></i></Link> */}
            <Link to="/products/new"><i className={this.state.opacity ? 'hide' :'fa fa-plus-circle fa-3x buttons-profile'}></i></Link>
          </div>
      </div>

    )
  }
}

export default ProductsList