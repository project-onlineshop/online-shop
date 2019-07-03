import React from 'react'

const Product = ({ product, onDeleteProduct }) => {
  const handleDelete = () => onDeleteProduct(product.id)

  return (
    <div className="card mb-4">
      <img src={product.attachment} className="card-img-top" alt="product" />

      <div className="card-body">
        <h5 className="card-title">{product.title}</h5>
        <p className="card-text">{product.message}</p>

        <p>
          {product.hastags.map((h, i) => (
            <strong key={i} className="mr-1">{h}</strong>
          ))}
        </p>

        <p>
          {product.mentions.map((m, i) => (
            <strong key={i} className="mr-1">{m}</strong>
          ))}
        </p>

        <button className="btn btn-danger btn-sm" onClick={handleDelete}>Delete</button>
      </div>

    </div>
  )
}

export default Product