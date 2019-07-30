import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthStore';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import '../../App.css';
import ProductsService from '../../services/ProductsService';


class Product extends React.Component {

  state = {
    contadorfavs: 0,
    visible: false,
    modalIsOpen: false,
    color: false,
    readMore: false,
    favourites: []
    // products: []
  }

  onClickReadMore = (e) => {
    e.preventDefault()
    this.setState({ readMore: !this.state.readMore })
  }

  // se muestra la alerta durante 10 segundos
  componentDidMount() {
    this.timer = setInterval(() => {
      this.setState({
        visible: false
      });
    }, 10000);
  }



  componentWillMount() {
    clearInterval(this.timer);
  }

  toggleModal = () => {
    this.setState({
      modalIsOpen: !this.state.modalIsOpen
    })
  }

  contfavs = () => {
    this.setState({
      contadorfavs: this.state.contadorfavs + 1
    })
  }

  handleAlert = (product) => {
    ProductsService.createFavourite(this.props.product.id).then(
      response => {
        this.setState({
          favourites: [product, ...this.state.favourites],
          visible: true,
          color: !this.state.color
        })
      }
    )
  }


  handleDelete = () => this.props.onDeleteProduct(this.props.product.id)
  handleFavs = () => this.contfavs()
  render() {
    const { product } = this.props

    // const summaryLong = product.summary.replace(/<p>/g, '').replace(/<\/p>/g, '')
    // const summaryShort = summaryLong.slice(0, 50)

    // const summary = this.state.readMore
    //   ? summaryLong
    //   : summaryShort

    // const readText = this.state.readMore
    //   ? 'Read Less'
    //   : 'Read More' 
    

    return (
     

      <AuthContext.Consumer>
        {({ isAuthenticated }) => (

          <div className="card mb-4">
            <Link to={`/products/${product.id}`}><img src={product.image} className="card-img-top" alt="product" /></Link>

            <div className="card-body">
              <h3 className="card-title"><b> {product.price}&nbsp;€</b></h3>
              {/* <p className="card-text"><b>Category:</b> {product.category}</p> */}
              <p className="card-title"><b> {product.name}</b></p>
              <p className="card-text"> {product.description}</p>
              {/* <p className="card-text">
              {summary}</p> */}

              {isAuthenticated() && (
                <div className="fav-del-icons">
                  {this.props.showDelete ? <button className="btn btn-danger btn-sm mb-3" onClick={this.toggleModal}>Delete</button> : ''}
                  <i className="fa fa-heart fa-2x m-3" style={{ color: this.state.color ? 'red' : 'gray' }} onClick={this.handleAlert}></i>
                  {/* <i className="fa fa-heart fa-2x m-3" style={{ color: this.state.color ? 'red' : 'gray' }} 
                  onClick={() => { this.props.addToFavourite(product) }}></i> */}
                </div>


                // <button type="submit"
                //   className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
                //   disabled={hasErrors}>Submit</button>

              )}
              {/* <div><a href="#"
                  className="card-link"
                  onClick={this.onClickReadMore}>
                  {readText}</a></div> */}
             
              <div><p className="card-footer">{product.user.email} <i class="fa fa-user"></i>  </p></div>
            </div>
            <Alert isOpen={this.state.visible}>Favourite Saved!</Alert>
            <Modal isOpen={this.state.modalIsOpen}>
              <ModalHeader toggle={this.toggleModal}></ModalHeader>
              <ModalBody>Delete this product?</ModalBody>
              <ModalFooter>
                <Button color="success" onClick={this.handleDelete}>Yes</Button>
                <Button color="danger">No</Button>
              </ModalFooter>
            </Modal>
          </div>

        )}
      </AuthContext.Consumer>
    )
  }
}


export default Product