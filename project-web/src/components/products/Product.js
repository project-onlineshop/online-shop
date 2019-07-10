import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product, onDeleteProduct }) => {
  const handleDelete = () => onDeleteProduct(product.id)

  return (
    <div className="card mb-4">
      <Link to={`/products/${product.id}`}><img src={product.image} className="card-img-top" alt="product" /></Link>

      <div className="card-body">
        <h5 className="card-title"><b>Nombre:</b> {product.name}</h5>
        <p className="card-text"><b>Categoria:</b> {product.category}</p>
        <p className="card-text"><b>Precio:</b> {product.price}</p>
        <p className="card-text"><b>Descripcion:</b>{product.description}</p>


        {/* <p>
          {product.hastags.map((h, i) => (
            <strong key={i} className="mr-1">{h}</strong>
          ))}
        </p>

        <p>
          {product.mentions.map((m, i) => (
            <strong key={i} className="mr-1">{m}</strong>
          ))}
        </p> */}

        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}

export default Product