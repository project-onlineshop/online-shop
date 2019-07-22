import React from 'react'
import { Link } from 'react-router-dom'
import ProductsList from './ProductsList';



const ProductsBase = (props) => (
  <article className="ProductsBase">
    <div className="d-flex justify-content-center pb-3 mb-3">
      <h1>Products</h1>
      
    </div>

    <ProductsList location={props.location}/>
    
  </article>
)

export default ProductsBase