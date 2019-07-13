import React from 'react'
import { Link } from 'react-router-dom'
import { withAuthConsumer, AuthContext } from '../../contexts/AuthStore';


const Product = (props) => {
  const handleDelete = () => onDeleteProduct(product.id)
  const handleFavs = () => onFavProducts(product.id)

  const {product, onDeleteProduct, onFavProducts } = props

  return (
    <AuthContext.Consumer>
      {({isAuthenticated}) => (
    
    <div className="card mb-4">
      <Link to={`/products/${product.id}`}><img src={product.image} className="card-img-top" alt="product" /></Link>

      <div className="card-body">
        <h5 className="card-title"><b>Nombre:</b> {product.name}</h5>
        <p className="card-text"><b>Categoria:</b> {product.category}</p>
        <p className="card-text"><b>Precio:</b> {product.price}</p>
        <p className="card-text"><b>Descripcion:</b>{product.description}</p>

        {isAuthenticated() && (
          <div>
            <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button><i class="fa fa-heart" onclick={handleFavs}><h3>{0}</h3></i>
          </div>

        )}
      </div>
    </div>
    )}
    </AuthContext.Consumer>
  )
}

export default Product