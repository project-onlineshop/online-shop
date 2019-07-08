import React from 'react'
import { Link } from 'react-router-dom'
// import Product from '../products/Product';

const Home = () => (
  <article className="Home">
      <h1 className="display-4">Iron-wallapop</h1>
      <p className="lead"><Link to="/products">products</Link></p>
      {/* <Product/> */}
  </article>
)

export default Home