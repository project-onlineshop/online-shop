import React from 'react'
import { Link } from 'react-router-dom'
import ProductsList from './ProductsList';

const ProductsBase = (props) => (
  <article className="ProductsBase">
    <div className="d-flex justify-content-between border-bottom pb-3 mb-3">
      <h3>Products</h3>
      <Link to="/products/new" ><i className="fa fa-plus-circle fa-3x"></i></Link>
    </div>

    <ProductsList location={props.location}/>
  </article>
)

export default ProductsBase