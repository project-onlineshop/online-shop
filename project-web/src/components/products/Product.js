import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthStore';
import { Alert, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class Product extends React.Component {

  state = {
    contadorfavs: 0,
    visible: false,
    modalIsOpen: false,
    color: false
  }

  // setTimeout = (() => {
  //   this.setState({
  //     visible: false
  //   });
  // }, 2000);

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

  handleAlert = (e) => {
    e.preventDefault();
    this.setState({
      visible: true,
      color: !this.state.color
    })
  }


  handleDelete = () => this.props.onDeleteProduct(this.props.onFavProductsproduct.id)
  handleFavs = () => this.contfavs()
  render() {

    const { product } = this.props

    // let btn_class = this.state.black ? 'fa fa-heart' : 'far fa-heart'

    return (
      <AuthContext.Consumer>
        {({ isAuthenticated }) => (

          <div className="card mb-4">
            <Link to={`/products/${product.id}`}><img src={product.image} className="card-img-top" alt="product" /></Link>

            <div className="card-body">
              <h5 className="card-title"><b>Name:</b> {product.name}</h5>
              <p className="card-text"><b>Category:</b> {product.category}</p>
              <p className="card-text"><b>Price:</b> {product.price}&nbsp;€</p>
              <p className="card-text"><b>Description:</b>{product.description}</p>

              {isAuthenticated() && (
                <div>
                  <button className="btn btn-danger btn-sm" onClick={this.toggleModal}>Delete</button>
                  <i className={this.state.color ? 'fa fa-heart-red' : 'fa fa-heart'} onClick={this.handleAlert}></i><h3>{this.state.contadorfavs}</h3>
                </div>

                // <button type="submit"
                //   className={`btn ${hasErrors ? 'btn-danger' : 'btn-success'}`}
                //   disabled={hasErrors}>Submit</button>

              )}
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