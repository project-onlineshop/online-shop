import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => (
  <article className="Home">
    <div className="jumbotron container">
      <h1 className="display-4">insta-web</h1>
      <p className="lead">Go to <Link to="/posts">posts</Link></p>
    </div>
  </article>
)

export default Home