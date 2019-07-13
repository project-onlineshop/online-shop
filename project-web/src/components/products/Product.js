import React from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../../contexts/AuthStore';

class Product extends React.Component {

  state = {
    contadorfavs: 0
  }

  contfavs = () => {
    console.log(this.state)
    this.setState({
      contadorfavs: this.state.contadorfavs + 1
    })
  }

  handleDelete = () => this.props.onDeleteProduct(this.props.onFavProductsproduct.id)
  handleFavs = () => this.contfavs()
  render() {

    const { product } = this.props

  

    return (
      <AuthContext.Consumer>
        {({ isAuthenticated }) => (

          <div className="card mb-4">
            <Link to={`/products/${product.id}`}><img src={product.image} className="card-img-top" alt="product" /></Link>

            <div className="card-body">
              <h5 className="card-title"><b>Nombre:</b> {product.name}</h5>
              <p className="card-text"><b>Categoria:</b> {product.category}</p>
              <p className="card-text"><b>Precio:</b> {product.price}</p>
              <p className="card-text"><b>Descripcion:</b>{product.description}</p>

              {isAuthenticated() && (
                <div>
                  <button className="btn btn-danger btn-sm" onClick={this.handleDelete}>Delete</button>
                  <i className="fa fa-heart" onClick={this.handleFavs}></i><h3>{this.state.contadorfavs}</h3>
                </div>

              )}
            </div>
          </div>
        )}
      </AuthContext.Consumer>
    )
  }
}


export default Product