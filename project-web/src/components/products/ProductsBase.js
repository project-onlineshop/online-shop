import React from 'react'
import { Link } from 'react-router-dom'
import ProductsList from './ProductsList';

const ProductsBase = () => (
  <article className="PostsBase">
    <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
      <h3>Products</h3>
      <Link to="/posts/new" className="btn btn-primary">New Product</Link>
    </div>

    <ProductsList/>
  </article>
)

export default ProductsBase