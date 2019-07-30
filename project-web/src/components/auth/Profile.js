import React from 'react'
import Product from '../products/Product';
import { Link } from 'react-router-dom';
import ProductsService from '../../services/ProductsService';
import { withAuthConsumer } from '../../contexts/AuthStore';
import authService from '../../services/AuthService';
import '../../App.css'
import '../../../node_modules/font-awesome/css/font-awesome.min.css'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Favourites from '../products/Favourites';

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
    products: [],
    modalIsOpen: false,
    favourites: [],
    opacity: 0
  }

  addToFavourite = (product) => {
    this.setState({
      favourites: [product, ...this.state.favourites]
    })
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
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

  fetchProfile = () => {
    
    authService.getProfile()
    .then(user => {
      
      this.props.onUserChange(user)
    }
    )
  }

  //boton logout
  handleLogout = () => {
    authService.logout()
      .then(() => {
        this.props.onUserChange(null)
        this.setState({ redirect: true })
      })
  }

  componentDidMount() {

    this.fetchProfile()
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
        <div className="row justify-content-center mb-3">
          <div className="d-inline mr-2 ">
            <Link to="/editProfile"><i className="fa fa-edit fa-3x buttons-profile"></i></Link>
          </div>
          <div className="d-inline ml-2">
            <p onClick={this.toggleModal}><i className="fa fa-sign-out fa-3x buttons-profile"></i></p>
          </div>
        </div>

        <h3>Selling Products</h3>
        <div className="ProductsList">

          {this.state.products.map((product, i) => this.props.user.id === product.user.id && (
            <Product showDelete={true} product={product} key={i} onDeleteProduct={this.deleteProduct} addToFavourite={this.addToFavourite} />
          ))}

        </div>

        <Favourites products={this.state.favourites}/>
        <div className="new">
          <Link to="/products/new" ><i className="fa fa-plus-circle fa-3x buttons-profile" onScroll={this.handleScroll}></i></Link>
        </div>
        <Modal isOpen={this.state.modalIsOpen}>
          <ModalHeader toggle={this.toggleModal}></ModalHeader>
          <ModalBody>Do you want to logout?</ModalBody>
          <ModalFooter>
            <Button color="success" onClick={this.handleLogout}>Yes</Button>
            <Button color="danger">No</Button>
          </ModalFooter>
        </Modal>
      </div>

    )
  }
}

export default withAuthConsumer(Profile)