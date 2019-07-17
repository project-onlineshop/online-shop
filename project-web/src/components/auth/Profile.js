import React from 'react'
import Product from '../products/Product';
import { Link } from 'react-router-dom';
import ProductsService from '../../services/ProductsService';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/AuthService';
import '../../App.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'

class Profile extends React.Component {
  state = {
    user: {
      email: '',
      password: '',
      avatarURL: 'http://ecuciencia.utc.edu.ec/media/foto/default-user_x5fGYax.png',
      avatar: ''
    },
    errors: {},
    touch: {},
    redirect: false,
    products: []
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
        this.setState({ products: response.data })
      }
    )
  }

  handleLogout = () => {
    authService.logout()
      .then(() => {
        this.props.onUserChange(null)
          this.setState({ redirect: true })
        })
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

  render() {

    return (
      <div>
        <Link to="/editProfile"><i className="fa fa-edit fa-2x"></i></Link>
        <Link onClick={this.handleLogout} to="/logout"><i className="fa fa-sign-out fa-2x"></i></Link>
        <div className="ProductsList">
          {this.state.products.map((product, i) => (
            <Product product={product} key={i} onDeleteProduct={this.deleteProduct} onFavProducts={this.contfavs} />
          ))}
          <div id="new">
            <Link to="/products/new" ><i className="fa fa-plus-circle fa-3x"></i></Link>
          </div>
        </div>
      </div>
      
    )
  }
}

export default withAuthConsumer(Profile)