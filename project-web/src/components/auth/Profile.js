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

  //boton logout
  handleLogout = () => {
    authService.logout()
      .then(() => {
        this.props.onUserChange(null)
        this.setState({ redirect: true })
      })
  }

  componentDidMount() {
    this.fetchProducts()
    window.addEventListener('scroll', this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }

  handleScroll = () => {
    const scrolled = window.scrollY;
    if (scrolled >= 600) {
      this.setState({
        opacity: 1
      })
    }
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
        <div className="row justify-content-center ">
          <div className="d-inline mr-2">
            <Link to="/editProfile"><i className="fa fa-edit fa-2x"></i></Link>
          </div>
          <div className="d-inline ml-2">
            <p onClick={this.toggleModal}><i className="fa fa-sign-out fa-2x"></i></p>
          </div>
        </div>

        <h3>Tus productos en venta</h3>
        <div className="ProductsList">

          {this.state.products.map((product, i) => this.props.user.id === product.user.id && (
            <Product showDelete={true} product={product} key={i} onDeleteProduct={this.deleteProduct} onFavProducts={this.contfavs} />
          ))}

        </div>

        <Favourites products={this.state.favourites} />
        <div className="new">
          <Link to="/products/new" ><i className="fa fa-plus-circle fa-3x" onScroll={this.handleScroll()}></i></Link>
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